import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
const vh = window.innerHeight;

const Contact = ({ email }) => {
  const id = localStorage.uid;
  const docRef = doc(db, "users", id);
  const [user, setUser] = useState({});
  useEffect(() => {
    async function Fetch() {
      try {
        const getUser = await getDoc(docRef);
        setUser(getUser.data());
      } catch (e) {
        console.error(e);
      }
    }
    Fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmitHandler = async (e) => {};
  return (
    <Container variants={subTitle} initial="hidden" animate="show">
      <SubContainer1>
        <form onSubmit={onSubmitHandler}>
          <InputContainer>
            <NavTitle>
              <label htmlFor="email">Author Email:</label>
            </NavTitle>
            <NavTitle>{email}</NavTitle>
          </InputContainer>
          <HR />
          <InputContainer>
            <NavTitle>
              <label htmlFor="firstName">First name:</label>
            </NavTitle>
            <Input
              id="firstName"
              type="text"
              name="firstName"
              placeholder="Your first name..."
            />
          </InputContainer>
          <InputContainer>
            <NavTitle>
              <label htmlFor="lastName">Last name:</label>
            </NavTitle>
            <Input
              id="lastName"
              type="text"
              name="lastName"
              placeholder="Your last name..."
            />
          </InputContainer>
          <InputContainer>
            <NavTitle>
              <label htmlFor="phoneNumber">Phone number:</label>
            </NavTitle>
            <Input
              id="phoneNumber"
              type="number"
              name="phoneNumber"
              placeholder="+359..."
            />
          </InputContainer>
          <InputContainer>
            <NavTitle>
              <label htmlFor="adress">Message: </label>
            </NavTitle>
            <TextArea
              id="item_description"
              type="text"
              name="item_description"
              defaultValue=""
              placeholder="Your message..."
            ></TextArea>
          </InputContainer>

          <InputContainer>
            <NavTitle>
              <label htmlFor="password"></label>
            </NavTitle>
            <SubmitButton type="submit" value="Send message" />
          </InputContainer>
          <InputContainer></InputContainer>
        </form>
      </SubContainer1>
      <SubContainer2>
        <Heading>CONTACT</Heading>
      </SubContainer2>
    </Container>
  );
};
const HR = styled.div`
  border-bottom: 1px solid gray;
  margin: 3px;
  opacity: 0.7;
`;
const TextArea = styled.textarea`
  display: flex;
  justify-content: center;
  padding: 5px;
  width: 200px;
  height: 200px;
`;
const Container = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: stretch;

  height: ${vh - 40}px;
  border-top: 1px solid white;
`;

const NavTitle = styled.span`
  display: flex;
  font-size: 18px;
  width: 200px;
  margin-right: 5px;
  align-items: center;
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
  width: 50%;
  background-color: #ffffff;
  flex-grow: 1;
  margin-top: 10px;
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
  font-size: 90px;
`;

const SubmitButton = styled.input`
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

export default Contact;
