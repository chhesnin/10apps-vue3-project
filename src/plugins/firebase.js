// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7TAfFOBQlazdd0nubfWDNawz68bO283k",
  authDomain: "vue3-10apps-project.firebaseapp.com",
  databaseURL: "https://vue3-10apps-project-default-rtdb.firebaseio.com",
  projectId: "vue3-10apps-project",
  storageBucket: "vue3-10apps-project.appspot.com",
  messagingSenderId: "502391045005",
  appId: "1:502391045005:web:ce81090ab40f245b94dbc4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// *
export const auth = getAuth(app);

const db = getDatabase(app);
// const dbRef = ref(db);
export const chatsRef = ref(db, "chats");

export default app;
