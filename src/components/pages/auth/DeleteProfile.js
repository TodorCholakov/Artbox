import React from "react";
import { getAuth, deleteUser } from "firebase/auth";
import Error from "../errorHandling/Error";
import { Navigate } from "react-router-dom";
import { getStorage, ref, deleteObject } from "firebase/storage";
import {
  doc,
  deleteDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../utils/firebase";
import { useState } from "react";

import styled from "styled-components";
import { motion } from "framer-motion";

const vh = window.innerHeight;
const DeleteProfile = () => {
  const [redirectNow, setRedirectNow] = useState(false);
  const [error, setError] = useState("");
  const storage = getStorage();
  const id = localStorage.uid;

  const [user, setUser] = useState([]);

  const onLoginFormSubmitHandler = async (e) => {
    e.preventDefault();

    //delete items
    const auth = getAuth();
    const user = auth.currentUser;
    const q = query(
      collection(db, "items"),
      where("item_authorId", "==", user.uid)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc1) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc1.id, " => ", doc1.data());
      const imageRef = ref(storage, doc1.data().item_img_url);
      // Delete the file
      deleteObject(imageRef);
      deleteDoc(doc(db, "items", doc1.id));
    });

    deleteDoc(doc(db, "users", user.uid));
    console.log(user.uid);
    const deleteProfilePic = ref(storage, `profileImages/${user.uid}.jpg`);
    // Delete the file
    deleteObject(deleteProfilePic);

    //const profilePic = ref(storage, doc1.data().item_img_url);
    //deleteObject(imageRef);

    deleteUser(user)
      .then(() => {
        console.log("Successfully deleted user");
        localStorage.clear();
        setRedirectNow(true);
      })
      .catch((error) => {
        console.log("Error deleting user:", error);
      });
  };

  return redirectNow ? (
    <Navigate to="/all-items" />
  ) : (
    <Container variants={subTitle} initial="hidden" animate="show">
      <SubContainer1>
        <form onSubmit={onLoginFormSubmitHandler}>
          <InputContainer>
            <NavTitle>
              Dear <b>{user.userName ? user.userName : localStorage.email}</b>,{" "}
              <br />
              <br />
              by clicking on the button <b>Delete profile</b> all information
              will be deleted including
              <br /> - profile infonrmation /user name, e-mail address, user
              info...etc/ .
              <br /> - all prodcuts that you've aploaded
              <br /> - all user history /orders, messags...etc/
            </NavTitle>
          </InputContainer>

          <InputContainer>
            <NavTitle>
              <SubmitButton type="submit" value="Delete profile" />
            </NavTitle>
          </InputContainer>
          <InputContainer>
            <Error error={error} />
          </InputContainer>
        </form>
      </SubContainer1>
      <SubContainer2>
        <Heading>DELETE PROFILE</Heading>
      </SubContainer2>
    </Container>
  );
};

const Container = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: stretch;
  overflow: hidden; /* Hide scrollbars */
  height: ${vh - 40}px;
  border-top: 1px solid white;
`;

const NavTitle = styled.span`
  font-size: 16px;
  width: 500px;
  margin-right: 5px;
`;
const InputContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

const Input = styled(motion.input)`
  display: flex;
  justify-content: center;
  padding: 5px;
  width: 200px;
  height: 40px;
`;
const SubContainer1 = styled.div`
  padding: 50px;
  width: 50%;
  background-color: #ffffff;

  flex-grow: 1;
  margin-top: 25px;
`;
const SubContainer2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;

  background-color: #39393f;
  color: #ffffff;
`;

const Heading = styled.div`
  display: block;
  font-size: 90px;
  text-align: center;
`;

const SubmitButton = styled(motion.input)`
  background-color: #ffffff;
  border: 1px solid #000000;
  display: inline-block;
  cursor: pointer;
  color: #39393f;
  width: 200px;
  height: 40px;
  font-size: 16px;
  padding: 5px;
  width: 200px;
  height: 40px;

  transition: 0.5s;
  &:hover {
    transition: 0.5s;
    color: #ffffff;
    background-color: lightblue;
    background-color: #39393f;
  }
`;
const subTitle = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 2, ease: "easeIn" },
  },
};

export default DeleteProfile;
