import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACzSVDCNWq3e-AnRrzAYwNX8dKKIWmtmg",
  appId: "1:312168591197:web:6d24aeccb5db281ecd82b4",
  authDomain: "catch-of-money.firebaseapp.com",
  databaseURL: "https://catch-of-money.firebaseio.com",
  messagingSenderId: "312168591197",
  projectId: "catch-of-money",
  storageBucket: "catch-of-money.appspot.com",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db: typeof firebase.firestore = firebase.firestore;
const auth: typeof firebase.auth = firebase.auth;

auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

export { db, auth };

export default firebase;
