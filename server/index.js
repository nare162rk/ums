import express from "express";
import admin from "firebase-admin";
import cors from "cors";
import { readFile } from "fs/promises";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// --- Firebase Initialization ---
let serviceAccount;
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
  serviceAccount = JSON.parse(
    await readFile(new URL("./serviceAccountKey.json", import.meta.url))
  );
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

app.use(cors());
app.use(express.json());

// --- Helper: ID Generator ---
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

// --- UNIVERSITY & AUTH ROUTES ---

// 1. Onboard Route (Updated with GST, PAN, and Document fields)
app.post("/universities/onboard", async (req, res) => {
  try {
    const universityId = await generateUniversityId();
    const universityData = {
      ...req.body, // Receives all fields: GST, PAN, Address, etc.
      universityId,
      status: "pending", // Default inactive until approved
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    await db.collection("universities").doc(universityId).set(universityData);
    res.status(201).json({ success: true, universityId });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2. Login Verify (Updated with Domain and Approval Logic)
app.post("/auth/verify", async (req, res) => {
  try {
    const { token, originDomain } = req.body; // Expects domain from frontend
    const decodedToken = await admin.auth().verifyIdToken(token);
    const email = decodedToken.email;

    // Check if University exists with this official admin email
    const uniSnapshot = await db.collection("universities")
      .where("admin.officialEmail", "==", email).limit(1).get();

    if (uniSnapshot.empty) {
      return res.status(403).json({ success: false, message: "No institution found for this email." });
    }

    const uniData = uniSnapshot.docs[0].data();

    // Block if account is not approved by system admin
    if (uniData.status !== "approved") {
      return res.status(403).json({ success: false, message: "Institution pending approval." });
    }

    // Domain matching: Allow 'localhost' for development, else check registered misUrl
    if (originDomain !== "localhost" && uniData.misUrl !== originDomain) {
      return res.status(403).json({ success: false, message: "Unauthorized login origin." });
    }

    res.json({ 
      success: true, 
      role: "uni-admin", 
      user: email, 
      university: uniData 
    });
  } catch (error) {
    res.status(401).json({ success: false });
  }
});

// 3. Multi-Tenant Student Addition (Stored university-wise)
app.post("/students/add", async (req, res) => {
  const { universityId, enrollmentNumber, studentDetails } = req.body;
  try {
    // Nested storage: students/{uniId}/students/{enrollment}
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

// --- ADMIN CONTROL ROUTES ---

app.get("/admin/universities", async (req, res) => {
  try {
    const snapshot = await db.collection("universities").orderBy("createdAt", "desc").get();
    const universities = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(universities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch("/admin/status/:id", async (req, res) => {
  try {
    await db.collection("universities").doc(req.params.id).update({
      status: req.body.status,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

// --- ACADEMIC & FINANCIAL ROUTES ---

app.get("/attendance/stats/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const doc = await db.collection("attendance").doc(studentId).get();
    if (!doc.exists) return res.status(404).json({ error: "No records found" });
    res.status(200).json(doc.data());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/fees/summary/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const feeDoc = await db.collection("fees").doc(studentId).get();
    if (!feeDoc.exists) {
      return res.status(200).json({
        stats: { total: 0, paid: 0, balance: 0, outstanding: 0 },
        academicFees: [], hostelFees: []
      });
    }
    res.status(200).json(feeDoc.data());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});