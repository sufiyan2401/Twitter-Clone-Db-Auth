
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth";


import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyDFXNQToGs6Pewz8qdFZgZBzVn2ipdRNS8",
  authDomain: "twitter-bitrupt.firebaseapp.com",
  projectId: "twitter-bitrupt",
  storageBucket: "twitter-bitrupt.appspot.com",
  messagingSenderId: "625047201241",
  appId: "1:625047201241:web:3b0a379c2230031be7a5c8"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase();
export const auth = getAuth();
export const storage = getStorage(app)
