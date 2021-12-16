import { createContext } from "react";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../utils/firebase";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const auth = getAuth();

  const [userDetailed, setUserDetailed] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const id = localStorage.uid;
      if (id) {
        const docRef = doc(db, "users", id);
        const getUser = await getDoc(docRef);
        setUserDetailed(getUser.data());
      }
    };
    getUser();
  }, [auth]);

  return (
    <UserContext.Provider value={{ userDetailed }}>
      {children}
    </UserContext.Provider>
  );
};
