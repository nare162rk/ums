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

// --- NO '/api' PREFIX ROUTES ---

// 1. Onboard Route (Matches RegistrationPage.jsx:41)
app.post("/universities/onboard", async (req, res) => {
  try {
    const universityId = await generateUniversityId();
    const universityData = {
      ...req.body,
      universityId,
      status: "pending",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    await db.collection("universities").doc(universityId).set(universityData);
    res.status(201).json({ success: true, universityId });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2. Admin Get Route (Matches AdminDashboard fetch)
app.get("/admin/universities", async (req, res) => {
  try {
    const snapshot = await db.collection("universities").orderBy("createdAt", "desc").get();
    const universities = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(universities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Admin Status Update (Matches handleStatusUpdate)
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

// 4. Login Verify (Your existing logic)
app.post("/auth/verify", async (req, res) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(req.body.token);
    const uniSnapshot = await db.collection("universities").where("admin.officialEmail", "==", decodedToken.email).limit(1).get();
    if (uniSnapshot.empty) return res.status(403).json({ success: false });
    const uniData = uniSnapshot.docs[0].data();
    if (uniData.status !== "approved") return res.status(403).json({ success: false });
    res.json({ success: true, user: decodedToken.email, university: uniData });
  } catch (error) {
    res.status(401).json({ success: false });
  }
});

const PORT = 5000; // Fixed to 5000 as per your error log
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});