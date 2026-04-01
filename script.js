import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA1Q7sgx9B155mCyzpIlHV8OUGVPriUNVo",
  authDomain: "kurd-arena.firebaseapp.com",
  projectId: "kurd-arena",
  storageBucket: "kurd-arena.firebasestorage.app",
  messagingSenderId: "462287271115",
  appId: "1:462287271115:web:4a8911c2acf7a513ee974e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", userCredential.user.uid), {
            username: username,
            email: email,
            createdAt: new Date()
        });
        message.style.color = "#d4af37";
        message.innerText = "هەژمارەکە بە سەرکەوتوویی دروستکرا!";
    } catch (error) {
        message.style.color = "red";
        message.innerText = "هەڵە: " + error.message;
    }
});
