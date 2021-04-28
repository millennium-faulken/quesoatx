import firebase from "firebase/app";
import "firebase/firestore"
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyASxXSs01gMKct7vm56x_oOgj-x1RU-yGs",
  authDomain: "queso-app-e70dd.firebaseapp.com",
  projectId: "queso-app-e70dd",
  storageBucket: "queso-app-e70dd.appspot.com",
  messagingSenderId: "638921279230",
  appId: "1:638921279230:web:8dabb50c716cd83e3ac7af",
  measurementId: "G-LQ93R5PP7E"
};

firebase.initializeApp(firebaseConfig);

export default firebase;