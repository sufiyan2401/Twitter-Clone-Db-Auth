// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getDatabase} from "firebase/database"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

function StartFirebase(){
// const firebaseConfig = {
//   apiKey: "AIzaSyDH6WWPhTZR7j_UlKsFyUPbYt6_BCNNh3Y",
//   authDomain: "react-auth-b4590.firebaseapp.com",
//   projectId: "react-auth-b4590",
//   storageBucket: "react-auth-b4590.appspot.com",
//   messagingSenderId: "116630106814",
//   appId: "1:116630106814:web:70af91c63ce6ec9250a4ef"
// };
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
return getDatabase(app)
}
export default StartFirebase