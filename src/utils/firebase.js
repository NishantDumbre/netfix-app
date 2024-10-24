// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOP0_Y493oj5QvKbHZ1lYXQRZL4bd9OEs",
  authDomain: "netflix-app-f4212.firebaseapp.com",
  projectId: "netflix-app-f4212",
  storageBucket: "netflix-app-f4212.appspot.com",
  messagingSenderId: "995977576073",
  appId: "1:995977576073:web:d9d7c25e80024e05afd058"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
