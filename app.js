// ======================================
// ひだまりポスト v4
// app.js 第1回
// ======================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    addDoc,
    getDocs,
    updateDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";



// ======================================
// Firebase
// ======================================

const firebaseConfig = {

    apiKey: "あなたのAPIキー",

    authDomain: "あなたのauthDomain",

    projectId: "あなたのprojectId",

    storageBucket: "あなたのstorageBucket",

    messagingSenderId: "あなたのSenderID",

    appId: "あなたのAppID"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);



// ======================================
// 初期データ
// ======================================

const defaultStudents = [

{ id:"student1",name:"あいき",avatar:"🐱" },

{ id:"student2",name:"さくら",avatar:"🌸" },

{ id:"student3",name:"ゆうと",avatar:"🦖" },

{ id:"student4",name:"ひなた",avatar:"☀️" },

{ id:"student5",name:"たくみ",avatar:"⚽" },

{ id:"student6",name:"みお",avatar:"🎀" },

{ id:"student7",name:"りく",avatar:"🐻" },

{ id:"student8",name:"あおい",avatar:"🐬" },

{ id:"student9",name:"こはる",avatar:"🍀" }

];



let students=[...defaultStudents];

let adminPassword="1234";

let messages=[];



// ======================================
// Firestore読込
// ======================================

async function loadSettings(){

    const ref=doc(db,"settings","class");

    const snap=await getDoc(ref);

    if(snap.exists()){

        const data=snap.data();

        students=data.students || defaultStudents;

        adminPassword=data.password || "1234";

    }

    else{

        await setDoc(ref,{

            password:"1234",

            students:defaultStudents

        });

    }

}



async function loadMessages(){

    messages=[];

    const snap=await getDocs(collection(db,"messages"));

    snap.forEach(d=>{

        messages.push({

            id:d.id,

            ...d.data()

        });

    });

}



// ======================================
// 起動
// ======================================

window.addEventListener("DOMContentLoaded",async()=>{

    await loadSettings();

    await loadMessages();

    console.log("設定",students);

    console.log("投稿",messages);

});
