import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD9NAr9sQXp2dCWrEU8ncsbvF2heexl4c0",
  authDomain: "vue-course-d5bf0.firebaseapp.com",
  projectId: "vue-course-d5bf0",
  storageBucket: "vue-course-d5bf0.appspot.com",
  messagingSenderId: "50599250199",
  appId: "1:50599250199:web:cf66172feecedb99be0f52"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;