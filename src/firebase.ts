// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoNhiHhllef_rQXW1WUk-FAUS-pxxJuLk",
  authDomain: "skilllens-ff5c6.firebaseapp.com",
  projectId: "skilllens-ff5c6",
  storageBucket: "skilllens-ff5c6.firebasestorage.app",
  messagingSenderId: "1023196978316",
  appId: "1:1023196978316:web:f4ddcaa5d0bdf5f2b7efa9",
  measurementId: "G-36FP1TF3ME"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and get a reference to the service
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Configure Google Provider
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Initialize Analytics (optional)
export const analytics = getAnalytics(app);

export default app;