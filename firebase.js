// import * as firebase from "firebase";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCV97eVk48NPc4p45dDLHNPiov6n1sFqR4",
  authDomain: "react-native-chat-app-ab51d.firebaseapp.com",
  projectId: "react-native-chat-app-ab51d",
  storageBucket: "react-native-chat-app-ab51d.appspot.com",
  messagingSenderId: "869069779444",
  appId: "1:869069779444:web:0283ba3c0ce719713d89a1",
};
const appfirebase = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
