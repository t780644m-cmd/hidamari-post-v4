import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB0kyn1IVAPBLNP-uGxpjllPyiPCJunGII",
  authDomain: "hidamari-post-22d4e.firebaseapp.com",
  projectId: "hidamari-post-22d4e",
  storageBucket: "hidamari-post-22d4e.firebasestorage.app",
  messagingSenderId: "960419389881",
  appId: "1:960419389881:web:be2f7f3cb068ad75b2d668"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
