
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth";


import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyCUbXYzXr3ldaVL-rJR4sWJdSd6BBXT3wU",
  authDomain: "twitter-clone-bitrupt.firebaseapp.com",
  projectId: "twitter-clone-bitrupt",
  storageBucket: "twitter-clone-bitrupt.appspot.com",
  messagingSenderId: "714476589849",
  appId: "1:714476589849:web:c8fc3c8b8847b394e92b88"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase();
export const auth = getAuth();
export const storage = getStorage(app)
