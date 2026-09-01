import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyB5qU5Jnku7Himus0mKYhv0NPq1SOz2lIY",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "draalessandrakerkhoff.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "draalessandrakerkhoff",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "draalessandrakerkhoff.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "24867343377",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:24867343377:web:988af8706f6480c6c435b0",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-GZ2G0JYD7F"
};

// Initialize Firebase safely for SSR/Client
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

// Authorized admin emails
export const AUTHORIZED_EMAILS = [
  "alekerkhoff@gmail.com",
  "nfgbrentano@gmail.com"
];

export function isUserAuthorized(email) {
  if (!email) return false;
  return AUTHORIZED_EMAILS.includes(email.toLowerCase().trim());
}

export { app, auth, db };
