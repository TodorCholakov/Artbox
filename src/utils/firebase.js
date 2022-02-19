import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
 
  databaseURL:
    "https://artbox-a890e-default-rtdb.europe-west1.firebasedatabase.app",


  apiKey: "AIzaSyBh_SukxbDm4DGMA0hnELQ8MgHv_YCE19s",
  authDomain: "artbox-a890e.firebaseapp.com",
  projectId: "artbox-a890e",
  storageBucket: "artbox-a890e.appspot.com",
  messagingSenderId: "964559651999",
  appId: "1:964559651999:web:3b325a0eddd9ed0fe64eaa",
  measurementId: "G-4ZNVG78JBL"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
//export const storage = getStorage(app);
export const db = getFirestore(app);
