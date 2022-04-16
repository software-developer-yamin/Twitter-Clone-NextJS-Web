// Import the functions you need from the SDKs you need
import {
     getApp,
     getApps,
     initializeApp
} from "firebase/app";
import {
     getFirestore
} from "firebase/firestore";
import {
     getStorage
} from "firebase/storage";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
     apiKey: "AIzaSyCJNV80QZFdiGlbbZ9JUxPDcmeiW0s1800",
     authDomain: "twitter-clone-nextjs-challenge.firebaseapp.com",
     projectId: "twitter-clone-nextjs-challenge",
     storageBucket: "twitter-clone-nextjs-challenge.appspot.com",
     messagingSenderId: "864346289111",
     appId: "1:864346289111:web:5381059bfaf221f5aa9192",
     measurementId: "G-C8PV8P43N9"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export {
     db,
     storage
};

