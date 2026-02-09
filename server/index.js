import express from "express";
import admin from "firebase-admin";
import cors from "cors";
import { readFile } from "fs/promises";
import dotenv from "dotenv";
import multer from "multer";

// Initialize environment variables for sensitive config
dotenv.config();
const app = express();

// --- 1. FIREBASE ADMIN SDK INITIALIZATION ---
let serviceAccount;
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  // Use environment variable for cloud deployment (e.g., Vercel)
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
  // Use local JSON file for local development
  serviceAccount = JSON.parse(
    await readFile(new URL("./serviceAccountKey.json", import.meta.url))
  );
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Middleware to parse JSON and handle Cross-Origin requests
app.use(cors());
app.use(express.json());

// --- 2. HELPER: UNIVERSITY ID GENERATOR ---
// Generates a unique ID (YYYYMMDD + 4-digit counter)
async function generateUniversityId() {
  const today = new Date();
  const dateStr = today.getFullYear().toString() +
    (today.getMonth() + 1).toString().padStart(2, '0') +
    today.getDate().toString().padStart(2, '0');

  const counterRef = db.collection('metadata').doc('universityCounter');

  return await db.runTransaction(async (transaction) => {
    const doc = await transaction.get(counterRef);
    let count = 1;
    if (doc.exists && doc.data().lastDate === dateStr) {
      count = doc.data().count + 1;
    }
    transaction.set(counterRef, { lastDate: dateStr, count: count });
    return `${dateStr}${count.toString().padStart(4, '0')}`;
  });
}

// --- 3. UNIVERSITY ONBOARDING ---
// Called by RegistrationPage.jsx when a new institution signs up
app.post("/universities/onboard", async (req, res) => {
  try {
    const { officialEmail, password, name } = req.body;

    // STEP A: Create user in Firebase Auth using the Admin SDK
    // disabled: true ensures they cannot log in until you approve them manually
    const userRecord = await admin.auth().createUser({
      email: officialEmail,
      password: password,
      displayName: name,
      disabled: true, 
    });

    const universityId = await generateUniversityId();
    
    // STEP B: Prepare the Firestore document data
    const universityData = {
      ...req.body,
      uid: userRecord.uid, // Linking Auth account to the Firestore profile
      universityId,
      status: "pending",   // Default status
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    // SECURITY: Do not save the password in the Firestore database
    delete universityData.password;
    delete universityData.confirmPassword;

    // Save university profile to Firestore
    await db.collection("universities").doc(universityId).set(universityData);
    
    res.status(201).json({ 
      success: true, 
      universityId, 
      message: "Registration successful. Pending admin approval." 
    });
  } catch (error) {
    console.error("Onboarding Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// --- 4. ADMIN: UPDATE STATUS (APPROVE/REJECT) ---
// This route is used by your system admin to toggle the 'approved' status
app.patch("/admin/status/:id", async (req, res) => {
  try {
    const { status } = req.body; // e.g., { "status": "approved" }
    const universityRef = db.collection("universities").doc(req.params.id);
    const docSnap = await universityRef.get();

    if (docSnap.exists) {
      const { uid } = docSnap.data();
      
      // STEP C: Enable/Disable the Firebase Auth account based on approval
      if (uid) {
        await admin.auth().updateUser(uid, { 
          disabled: status !== "approved" 
        });
      }
    }

    // Update status in Firestore
    await universityRef.update({
      status,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.json({ success: true, message: `Institution status updated to ${status}` });
  } catch (error) {
    console.error("Status Update Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// --- 5. AUTH: LOGIN VERIFICATION ---
// Secondary check to ensure only approved institutions can fetch their profile
app.post("/auth/verify", async (req, res) => {
  try {
    const { token } = req.body;
    const decodedToken = await admin.auth().verifyIdToken(token);
    const email = decodedToken.email;

    // Double-check approval status in Firestore
    const uniSnapshot = await db.collection("universities")
      .where("admin.officialEmail", "==", email).limit(1).get();

    if (uniSnapshot.empty) {
      return res.status(403).json({ success: false, message: "Record not found." });
    }

    const uniData = uniSnapshot.docs[0].data();

    if (uniData.status !== "approved") {
      return res.status(403).json({ success: false, message: "Account pending approval." });
    }

    res.json({ 
      success: true, 
      role: "uni-admin", 
      university: uniData 
    });
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid session." });
  }
});

// --- 6. STUDENT & ACADEMIC DATA ---
app.post("/students/add", async (req, res) => {
  const { universityId, enrollmentNumber, studentDetails } = req.body;
  try {
    // Stores students in sub-collections organized by University ID
    await db.collection("students").doc(universityId)
      .collection("students").doc(enrollmentNumber)
      .set({
        ...studentDetails,
        universityId,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// --- 7. SERVER BOOT ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 UMS Backend active on port ${PORT}`);
});

const upload = multer({ storage: multer.memoryStorage() });

// --- NEW HELPER: STUDENT ERP GENERATOR ---
async function generateStudentErp(universityId, degreeType) {
  const year = new Date().getFullYear().toString().slice(-2);
  const degreeCode = degreeType.toUpperCase().substring(0, 2);
  
  const counterRef = db.collection('metadata').doc(`${universityId}_student_counter`);

  return await db.runTransaction(async (transaction) => {
    const doc = await transaction.get(counterRef);
    
    let lastSerial = 0;
    if (doc.exists) {
      lastSerial = doc.data().lastSerial || 0;
    }
    
    const newSerial = lastSerial + 1;
    transaction.set(counterRef, { lastSerial: newSerial }, { merge: true });
    
    const serialStr = newSerial.toString().padStart(6, '0');
    return `${year}${degreeCode}${serialStr}`;
  });
}

// --- UPDATED STUDENT ADMISSION ROUTE ---
// Added 'upload.single('photo')' here to fix the "universityId undefined" error
app.post("/students/admission", upload.single('photo'), async (req, res) => {
  try {
    // Multer now makes universityId and studentData visible in req.body
    const { universityId } = req.body;
    
    // Since studentData was stringified on the frontend, we parse it back to an object
    const studentData = JSON.parse(req.body.studentData);

    if (!universityId || !studentData) {
      return res.status(400).json({ success: false, message: "Missing required data" });
    }

    // 1. Generate the Custom ERP Number
    const erpNo = await generateStudentErp(universityId, studentData.degreeType || "UG");

    // 2. Prepare Production Data Object
    const finalStudentData = {
      ...studentData,
      erpNo: erpNo,
      universityId: universityId,
      status: "active",
      admissionDate: admin.firestore.FieldValue.serverTimestamp(),
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    // 3. Save to Firestore
    await db.collection("students").doc(erpNo).set(finalStudentData);

    // 4. Update the University's Student Count
    const uniRef = db.collection("universities").doc(universityId);
    await uniRef.update({
      studentCount: admin.firestore.FieldValue.increment(1)
    });

    res.status(201).json({ 
      success: true, 
      erpNo, 
      message: "Student admitted successfully" 
    });

  } catch (error) {
    console.error("Admission Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});