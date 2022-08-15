import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase,ref } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyDP0ytp_Ux4MDgGfpiFZrANkHgQyVADm2Y",
  authDomain: "vue-course-64d51.firebaseapp.com",
  databaseURL: "https://vue-course-64d51-default-rtdb.firebaseio.com",
  projectId: "vue-course-64d51",
  storageBucket: "vue-course-64d51.appspot.com",
  messagingSenderId: "354389688291",
  appId: "1:354389688291:web:3e9a6371e184abb2f8ead6"
};

const app = initializeApp(firebaseConfig);

// ***
export const auth = getAuth(app);

const db = getDatabase(app);
// const dbRef = ref(db);
export const chatsRef = ref(db, "chats");

export default app;