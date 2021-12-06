import { createContext } from "react";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../utils/firebase";
const auth = getAuth();
const id = localStorage.uid;

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setuser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const docRef = doc(db, "users", id);
      const getUser = await getDoc(docRef);
      setuser(getUser.data());
    };
    getUser();
  }, [auth]);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
