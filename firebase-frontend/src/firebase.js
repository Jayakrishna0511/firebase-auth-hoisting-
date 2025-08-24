// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,GoogleAuthProvider  } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqDqZfoEMfOg3iSPBXCkIQyznnrIhdwpA",
  authDomain: "test-fb49f.firebaseapp.com",
  projectId: "test-fb49f",
  storageBucket: "test-fb49f.firebasestorage.app",
  messagingSenderId: "456316167726",
  appId: "1:456316167726:web:efb7fafc84759771c761bf",
  measurementId: "G-QEERWRFGF5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();