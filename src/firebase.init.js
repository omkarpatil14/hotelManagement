// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCk5UIH9Esj9_ugE36B0b0zWK7Z50fkfNQ",
  authDomain: "royalerelaxo-db.firebaseapp.com",
  projectId: "royalerelaxo-db",
  storageBucket: "royalerelaxo-db.appspot.com",
  messagingSenderId: "528689140113",
  appId: "1:528689140113:web:898a1122d55212d312ca30",
  measurementId: "G-EN7SWFNS1E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const analytics = getAnalytics(app);

export default auth;
