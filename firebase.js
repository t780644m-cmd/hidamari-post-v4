import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "ここにあなたのAPIキー",
  authDomain: "ここにあなたのauthDomain",
  projectId: "ここにあなたのprojectId",
  storageBucket: "ここにあなたのstorageBucket",
  messagingSenderId: "ここにあなたのmessagingSenderId",
  appId: "ここにあなたのappId"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
