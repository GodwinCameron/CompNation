// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGaZP5OIO3gaXhuvh3pIH_Fk05UNrNfLM",
  authDomain: "comp-nation.firebaseapp.com",
  projectId: "comp-nation",
  storageBucket: "comp-nation.appspot.com",
  messagingSenderId: "1066293636857",
  appId: "1:1066293636857:web:613229028d65c48cb53c28",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app); // <-- exported so that it can be used in other files.

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
