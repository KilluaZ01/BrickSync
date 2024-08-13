// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "bricksync-5c400.firebaseapp.com",
  projectId: "bricksync-5c400",
  storageBucket: "bricksync-5c400.appspot.com",
  messagingSenderId: "944777880317",
  appId: "1:944777880317:web:083fd7b4f382409c2ed494",
  measurementId: "G-NW8LYL6LDC",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
