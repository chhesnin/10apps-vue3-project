// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPfp6N1a14AFkG5W64UKNoL7r1ein1jWs",
  authDomain: "vue3-apps-project.firebaseapp.com",
  databaseURL: "https://vue3-apps-project-default-rtdb.firebaseio.com",
  projectId: "vue3-apps-project",
  storageBucket: "vue3-apps-project.appspot.com",
  messagingSenderId: "1044945584328",
  appId: "1:1044945584328:web:28423a859d3eeeb7c0a5fd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// *
export const auth = getAuth(app);

const db = getDatabase(app);
// const dbRef = ref(db);
export const chatsRef = ref(db, "chats");

export default app;
