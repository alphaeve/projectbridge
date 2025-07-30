

// const firebaseConfig = {
//     apiKey: "AIzaSyCzxti_UBKAAQcSVlbIiG_FZoFaCdNbzdw",
//     authDomain: "acadup-exam.firebaseapp.com",
//     projectId: "acadup-exam",
//     storageBucket: "acadup-exam.firebasestorage.app",
//     messagingSenderId: "589249091287",
//     appId: "1:589249091287:web:e251212cb911f628568292",
//     measurementId: "G-FM1MHH6CLV"
//   };


// File: /exam/firebaseExam.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ Define this first
const examFirebaseConfig = {
    apiKey: "AIzaSyCzxti_UBKAAQcSVlbIiG_FZoFaCdNbzdw",
        authDomain: "acadup-exam.firebaseapp.com",
        projectId: "acadup-exam",
        storageBucket: "acadup-exam.firebasestorage.app",
        messagingSenderId: "589249091287",
        appId: "1:589249091287:web:e251212cb911f628568292",
        measurementId: "G-FM1MHH6CLV"
};

// ✅ Then use it here
const examApp = initializeApp(examFirebaseConfig, "examApp");
const examAuth = getAuth(examApp);
const examDb = getFirestore(examApp);

export { examAuth, examDb };
