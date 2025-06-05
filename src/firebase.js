import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "auth-web-b2de0.firebaseapp.com",
  projectId: "auth-web-b2de0",
  storageBucket: "auth-web-b2de0.appspot.com",
  messagingSenderId: "866091347337",
  appId: "1:866091347337:web:027a10cd158d3308638558"
};



// Initialize Firebase only if it hasn't been initialized already
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { auth, app };
