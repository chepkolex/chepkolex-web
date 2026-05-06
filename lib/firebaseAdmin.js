import admin from "firebase-admin";

if (!admin.apps.length) {
  try {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;

    if (projectId && clientEmail && privateKey) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey: privateKey.replace(/\\n/g, '\n'),
        }),
      });
      console.log("🔥 Firebase Admin Initialized with Individual Keys");
    } else {
      console.warn("⚠️ Firebase credentials missing in environment. Skipping initialization.");
    }
  } catch (error) {
    console.error("❌ Firebase Initialization Error:", error.message);
  }
}

export const db = admin.apps.length ? admin.firestore() : null;
