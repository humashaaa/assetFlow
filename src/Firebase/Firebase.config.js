import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyARduPUSBBc58MtWLdScXQM3MxvmbH0FxY",
  authDomain: "assignment-12-ef2db.firebaseapp.com",
  projectId: "assignment-12-ef2db",
  storageBucket: "assignment-12-ef2db.firebasestorage.app",
  messagingSenderId: "312576295260",
  appId: "1:312576295260:web:43b52908440949224fc199"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth;