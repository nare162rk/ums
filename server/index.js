import express from "express";
import admin from "firebase-admin";
import cors from "cors";
import { readFile } from "fs/promises";

const app = express();

// Firebase initialization
let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  // Render / Production
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
  // Local development
  serviceAccount = JSON.parse(
    await readFile(new URL("./serviceAccountKey.json", import.meta.url))
  );
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(cors());
app.use(express.json());

app.post("/api/auth/verify", async (req, res) => {
  const { token } = req.body;
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    res.json({ success: true, user: decodedToken.email });
  } catch {
    res.status(401).json({ success: false });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
