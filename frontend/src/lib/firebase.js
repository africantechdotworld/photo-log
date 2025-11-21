// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Validate Firebase configuration
if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId) {
  console.error("Firebase configuration is missing required fields:", {
    apiKey: firebaseConfig.apiKey ? "✓" : "✗",
    authDomain: firebaseConfig.authDomain ? "✓" : "✗",
    projectId: firebaseConfig.projectId ? "✓" : "✗",
  });
  throw new Error("Firebase configuration is incomplete. Please check your environment variables.");
}

// Validate authDomain format (should include .firebaseapp.com or .web.app)
if (firebaseConfig.authDomain && !firebaseConfig.authDomain.includes('.') && !firebaseConfig.authDomain.includes('localhost')) {
  console.error("Firebase authDomain appears to be incomplete:", firebaseConfig.authDomain);
  console.error("Expected format: 'your-project.firebaseapp.com' or 'your-project.web.app'");
  throw new Error(`Invalid Firebase authDomain: ${firebaseConfig.authDomain}. It should be in the format 'your-project.firebaseapp.com' or 'your-project.web.app'`);
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Persist authentication state in localStorage
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Failed to set persistence:", error);
});

export { auth, app };
