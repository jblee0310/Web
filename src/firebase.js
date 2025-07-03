// In src/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbkPYKs3thlVJ9aSAD459EJq1jq3pHANQ",
  authDomain: "preference-data.firebaseapp.com",
  projectId: "preference-data",
  storageBucket: "preference-data.firebasestorage.app",
  messagingSenderId: "986475496808",
  appId: "1:986475496808:web:7dd7e594a277c2d49f42dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the Firestore database service
export const db = getFirestore(app);