import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import serviceAccount from "./serviceAccountKey.json" with { type: "json" };



const app = express();
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

// Test route: save user message
app.post("/message", async (req, res) => {
  try {
    const { name, message } = req.body;
    await db.collection("messages").add({ name, message, createdAt: new Date() });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch all messages
app.get("/messages", async (req, res) => {
  const snapshot = await db.collection("messages").orderBy("createdAt", "desc").get();
  const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(data);
});

app.listen(4000, () => console.log("Backend running on 4000"));


