
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
import { getAuth } from "firebase/auth";


import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyBN4nEWJFjFgaAwvfxF5zlLsI_vmDd4l7w",
  authDomain: "twitter-clone-e9ad5.firebaseapp.com",
  projectId: "twitter-clone-e9ad5",
  storageBucket: "twitter-clone-e9ad5.appspot.com",
  messagingSenderId: "897099938471",
  appId: "1:897099938471:web:8264812874ed02f623f982"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase();
export const auth = getAuth();
export const storage = getStorage(app)
