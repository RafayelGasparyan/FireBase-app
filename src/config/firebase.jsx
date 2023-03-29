import React from 'react'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth ,GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBUFH8aZUorI62NZ70WRCi0AmNfigWSHko",
  authDomain: "fir-test1-f1ab6.firebaseapp.com",
  projectId: "fir-test1-f1ab6",
  storageBucket: "fir-test1-f1ab6.appspot.com",
  messagingSenderId: "615515956662",
  appId: "1:615515956662:web:2143bca3c66bef4c9d0d17",
  measurementId: "G-YG33K3NZL9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app)
export const storage = getStorage(app)

