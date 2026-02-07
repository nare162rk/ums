import express from 'express';
import admin from 'firebase-admin';
import cors from 'cors';
import { readFile } from 'fs/promises';

const app = express();
const isProduction = process.env.NODE_ENV === 'production';

// Initialize Firebase safely
if (isProduction) {
  // On Render: Use the secret environment variable you just created
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
} else {
  // On Localhost: Use your local file (which is ignored by Git)
  const serviceAccount = JSON.parse(
    await readFile(new URL('./serviceAccountKey.json', import.meta.url))
  );
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

app.use(cors());
app.use(express.json());

app.post('/api/auth/verify', async (req, res) => {
    const { token, secureKey } = req.body;
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        res.json({ success: true, user: decodedToken.email });
    } catch (e) {
        res.status(401).json({ success: false });
    }
});

// Render automatically assigns a PORT; Localhost will use 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
});