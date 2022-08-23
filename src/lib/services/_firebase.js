import { initializeApp } from "firebase/app";

export const firebaseService = {
  initialize() {
    const firebaseConfig = {
      apiKey: "AIzaSyBGZ3W4Kg67RWJ3-Ot4vdDLegsYx-x4bj0",
      authDomain: "weatherapp-9fe6e.firebaseapp.com",
      projectId: "weatherapp-9fe6e",
      storageBucket: "weatherapp-9fe6e.appspot.com",
      messagingSenderId: "1061920221511",
      appId: "1:1061920221511:web:0b067ef12549ad71c68462"
    };
  
    initializeApp(firebaseConfig);
  }
} 