import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { db } from "../../../utils/firebase";
import styled from "styled-components";
import { motion } from "framer-motion";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { useState, useEffect } from "react";

const vh = window.innerHeight;
const DeleteItem = () => {
  const [redirectNow, setRedirectNow] = useState(false);
  const { id } = useParams();

  console.log(id);
  const [item, setItem] = useState({});
  const storage = getStorage();
  const [docRef, setDocRef] = useState(doc(db, "items", id));
  console.log(item);
  useEffect(() => {
    const getItem = async () => {
      const data = await getDoc(docRef);
      setItem(data.data());
    };
    getItem();
  }, [docRef]);

  const onLoginFormSubmitHandler = async (e) => {
    e.preventDefault();
    const desertRef = ref(storage, item.item_img_url);

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        console.log("file deleted");
        setRedirectNow(true);
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
    await deleteDoc(doc(db, "items", id));
  };
  return redirectNow ? (
    <Navigate to="/all-items" />
  ) : (
    <Container variants={subTitle} initial="hidden" animate="show">
      <SubContainer1>
        <form onSubmit={onLoginFormSubmitHandler}>
          <InputContainer>
            <NavTitle>
              Do you really want to delete <b></b>
            </NavTitle>
          </InputContainer>

          <InputContainer>
            <NavTitle>
              <SubmitButton type="submit" value="Yes" />
            </NavTitle>
            <NavTitle>
              <Link to="/all-items">
                <SubmitButton type="submit" value="Go back" />
              </Link>
            </NavTitle>
          </InputContainer>
          <InputContainer></InputContainer>
        </form>
      </SubContainer1>
      <SubContainer2>
        <Heading>DELETE ITEM</Heading>
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
  min-width: 200px;
  margin-right: 5px;
  padding-top: 10px;
`;
const InputContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  @media (max-width: 600px) {
    flex-direction: column;
  }
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
  @media (max-width: 900px) {
    display: none;
  }
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
  min-width: 200px;
  height: 40px;
  font-size: 16px;
  padding: 5px;
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

export default DeleteItem;
