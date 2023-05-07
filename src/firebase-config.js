import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCOnxyi6etkeQT1rExvIR1_fc4LPcJFxYY",
  authDomain: "fir-tut-6fa08.firebaseapp.com",
  projectId: "fir-tut-6fa08",
  storageBucket: "fir-tut-6fa08.appspot.com",
  messagingSenderId: "852473750102",
  appId: "1:852473750102:web:74baa0615c08f1fa9c11f7",
  measurementId: "G-9NBET26D11",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
