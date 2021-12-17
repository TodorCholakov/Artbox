import { createContext } from "react";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../utils/firebase";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const auth = getAuth();

  const [user, setuser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const id = localStorage.uid;
      if (id) {
        const docRef = doc(db, "users", id);
        const getUser = await getDoc(docRef);
        setuser(getUser.data());
      }
    };
    getUser();
  }, [auth]);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
