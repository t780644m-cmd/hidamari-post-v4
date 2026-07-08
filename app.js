// ======================================
// ひだまりポスト v4
// app.js
// Firebase接続版
// ======================================

import { db } from "./firebase.js";

import {
    doc,
    getDoc,
    setDoc,
    collection,
    addDoc,
    getDocs,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


// ======================================
// 初期データ
// ======================================

const defaultStudents = [

    { id:"student1", name:"あいき", avatar:"🐱" },
    { id:"student2", name:"さくら", avatar:"🌸" },
    { id:"student3", name:"ゆうと", avatar:"🦖" },
    { id:"student4", name:"ひなた", avatar:"☀️" },
    { id:"student5", name:"たくみ", avatar:"⚽" },
    { id:"student6", name:"みお", avatar:"🎀" },
    { id:"student7", name:"りく", avatar:"🐻" },
    { id:"student8", name:"あおい", avatar:"🐬" },
    { id:"student9", name:"こはる", avatar:"🍀" }

];


let students = [...defaultStudents];

let messages = [];


// ======================================
// 設定読み込み
// ======================================

async function loadSettings(){

    const ref = doc(db,"settings","class");

    const snap = await getDoc(ref);


    if(snap.exists()){

        const data = snap.data();

        students = data.students || defaultStudents;

    }
    else{

        await setDoc(ref,{

            students:defaultStudents,
            password:"1234"

        });

    }

}



// ======================================
// 投稿読み込み
// ======================================

async function loadMessages(){

    messages=[];


    const snap = await getDocs(
        collection(db,"messages")
    );


    snap.forEach((doc)=>{

        messages.push({

            id:doc.id,
            ...doc.data()

        });

    });


}



// ======================================
// 児童ボタン作成
// ======================================

function createStudents(){

    const area =
    document.getElementById("studentGrid");


    area.innerHTML="";


    students.forEach(student=>{


        const button=document.createElement("button");


        button.type="button";

        button.className="studentButton";


        button.innerHTML=

        `${student.avatar}<br>${student.name}`;


        button.onclick=()=>{

            document
            .querySelectorAll(".studentButton")
            .forEach(b=>b.classList.remove("selected"));


            button.classList.add("selected");


            area.dataset.id=student.id;

            area.dataset.name=student.name;

        };


        area.appendChild(button);


    });


}



// ======================================
// カテゴリー
// ======================================

function createCategories(){


    const area =
    document.getElementById("categoryGrid");


    const categories=[

        "やさしい",
        "がんばった",
        "すごい",
        "ありがとう"

    ];


    area.innerHTML="";


    categories.forEach(cat=>{


        const button=document.createElement("button");


        button.type="button";

        button.textContent=cat;


        button.onclick=()=>{


            document
            .querySelectorAll("#categoryGrid button")
            .forEach(b=>b.classList.remove("selected"));


            button.classList.add("selected");


            area.dataset.category=cat;


        };


        area.appendChild(button);


    });


}



// ======================================
// 投稿保存
// ======================================

document
.addEventListener("submit",async(e)=>{


    if(e.target.id !== "postForm")
    return;



    const studentGrid =
    document.getElementById("studentGrid");


    const categoryGrid =
    document.getElementById("categoryGrid");



    if(!studentGrid.dataset.id){

        alert("送る相手を選んでね");

        return;

    }



    await addDoc(

        collection(db,"messages"),

        {

            toId:studentGrid.dataset.id,

            toName:studentGrid.dataset.name,

            category:categoryGrid.dataset.category || "",

            message:
            document.getElementById("message").value,

            sender:
            document.getElementById("sender").value,

            createdAt:serverTimestamp()

        }

    );


    alert("キラリを届けました✨");


    e.target.reset();


});



// ======================================
// 画面切替
// ======================================

window.addEventListener("DOMContentLoaded",async()=>{


    await loadSettings();

    await loadMessages();


    createStudents();

    createCategories();


    console.log("児童",students);

    console.log("投稿",messages);



});
