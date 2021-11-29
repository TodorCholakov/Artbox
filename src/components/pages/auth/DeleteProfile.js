import React from "react";
import { getAuth, deleteUser } from "firebase/auth";

import {
  doc,
  deleteDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../utils/firebase";
import { useState, useEffect } from "react";

import styled from "styled-components";
import { motion } from "framer-motion";

const vh = window.innerHeight;
const Profile = () => {
  const id = localStorage.uid;
  console.log(id);
  const q = query(collection(db, "users"), where("userId", "==", id));

  const [user, setUser] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        setUser(doc.data());
      });
    };
    getUser();
  }, []);

  const onLoginFormSubmitHandler = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;
    await deleteDoc(doc(db, "users", id));
    deleteUser(user)
      .then(() => {
        // User deleted.
        localStorage.clear();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
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
          <InputContainer></InputContainer>
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

export default Profile;
