import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDrbq-ab6o9jHfYoqPnaWH2IfTVFwq9X40",
  authDomain: "artbox-8fff2.firebaseapp.com",
  databaseURL:
    "https://artbox-8fff2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "artbox-8fff2",
  storageBucket: "artbox-8fff2.appspot.com",
  messagingSenderId: "356774878463",
  appId: "1:356774878463:web:7b83538226555e5c9240ca",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
//export const storage = getStorage(app);
export const db = getFirestore(app);
