import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: "cyber-frog-b3768.firebaseapp.com",
  projectId: "cyber-frog-b3768",
  storageBucket: "cyber-frog-b3768.appspot.com",
  messagingSenderId: "591419529644",
  appId: "1:591419529644:web:3ee710848d1c0916ec8209",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
