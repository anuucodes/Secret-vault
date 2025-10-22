// src/firebase.js
// 🔥 Firebase setup file

//import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js'
//import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js'

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_TZsnC9fabDtpRVQkHTJJnK_j7_VhaMo",
  authDomain: "secret-notes-7f78a.firebaseapp.com",
  projectId: "secret-notes-7f78a",
  storageBucket: "secret-notes-7f78a.firebasestorage.app",
  messagingSenderId: "327677743603",
  appId: "1:327677743603:web:493efee807ed87994b4286"
};


// Initialize Firebase + Firestore
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
