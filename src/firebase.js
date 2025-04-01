import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // This is where 'auth' comes from
import { getFirestore } from "firebase/firestore"; // Firestore for your database

// Your Firebase config object
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Exporting the auth instance
const db = getFirestore(app); // Exporting Firestore if you need it

// Export the necessary services
export { auth, db, app };  // Make sure you export auth here