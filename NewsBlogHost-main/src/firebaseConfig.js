import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB4moRif8yIXlzGcLtx-fFjiBPItPSNdng",
  authDomain: "news-12c55.firebaseapp.com",
  databaseURL: "https://news-12c55-default-rtdb.firebaseio.com",
  projectId: "news-12c55",
  storageBucket: "news-12c55.appspot.com",
  messagingSenderId: "585001995813",
  appId: "1:585001995813:web:26c3aeb220bdce443cf9cc",
  measurementId: "G-TYQ6XWN8JQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

