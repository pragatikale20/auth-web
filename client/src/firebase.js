// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "auth-web-b2de0.firebaseapp.com",
  projectId: "auth-web-b2de0",
  storageBucket: "auth-web-b2de0.firebasestorage.app",
  messagingSenderId: "866091347337",
  appId: "1:866091347337:web:027a10cd158d3308638558"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);