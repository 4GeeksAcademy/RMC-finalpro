import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBR1hlTGid-g2emKsrcKevfDAEv8XGXM0E",
    authDomain: "chat-app-d57a7.firebaseapp.com",
    projectId: "chat-app-d57a7",
    storageBucket: "chat-app-d57a7.firebasestorage.app",
    messagingSenderId: "283613776576",
    appId: "1:283613776576:web:b328481c94a0b0c641fb25",
    measurementId: "G-CJBHM6NSZP"
  };

  const app = initializeApp(firebaseConfig);  
  
  export const auth = getAuth(app);
  export const db = getFirestore(app);