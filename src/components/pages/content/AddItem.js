import React from "react";
import styled from "styled-components";
import { collection, addDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { Navigate } from "react-router-dom";
import Error from "../errorHandling/Error";

const vh = window.innerHeight;
const AddItem = () => {
  const [error, setError] = useState("");
  const [errorRedirect, setErrorRedirect] = useState("");
  const [redirectNow, setRedirectNow] = useState(false);
  const [imgText, setImgText] = useState("Uplaod image!");
  const itemId = uuidv4();
  const id = localStorage.uid;
  const storage = getStorage();
  const [user, setuser] = useState({});
  const docRef = doc(db, "users", id);

  useEffect(() => {
    const getUser = async () => {
      const getUser = await getDoc(docRef);
      setuser(getUser.data());
      console.log(user.userId);
    };
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!user.userName) {
      setError(
        `To add a new item you have to set your "User name". You can do that `
      );
      setErrorRedirect("/auth/profile");
    } else {
      let item_img_url = e.target.item_img_url.files[0];
      console.log(item_img_url);
      const imageRef = ref(storage, `itemImages/${itemId}.jpg`);

      uploadBytes(imageRef, item_img_url).then(() => {
        console.log("Uploaded a blob or file!");

        item_img_url = `itemImages/${itemId}.jpg`;
        let item_title = e.target.item_title.value;
        let item_author = user.userName;
        let item_authorId = user.userId;
        let item_description = e.target.item_description.value;
        let item_price = e.target.item_price.value;
        let item_rating = 0;

        AddData(
          item_img_url,
          item_authorId,
          item_title,
          item_author,
          item_description,
          item_price,
          item_rating
        );
      });
    }

    async function AddData(
      item_img_url,
      item_authorId,
      item_title,
      item_author,
      item_description,
      item_price,
      item_rating
    ) {
      try {
        const docRef = await addDoc(collection(db, "items"), {
          item_authorId,
          item_img_url: item_img_url,
          item_title: item_title,
          item_author: item_author,
          item_description: item_description,
          item_price: item_price,
          item_rating: item_rating,
          item_rating_usersIds: ["empty"],
        });
        console.log("Document written with ID: ", docRef.id);
        setRedirectNow(true);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  return redirectNow ? (
    <Navigate to="/all-items" />
  ) : (
    <Container variants={subTitle} initial="hidden" animate="show">
      <SubContainer1>
        <form onSubmit={onSubmitHandler}>
          <Input
            id="item_author"
            type="hidden"
            name="item_author"
            value={user.item_author}
            defaultValue=""
          />
          <InputContainer>
            <InputContainer>
              <NavTitle>
                <NavTitle>
                  <p alt="noImage" id="myimg" name="userProfilePic">
                    {imgText}
                  </p>
                </NavTitle>

                <Input
                  type="file"
                  name="item_img_url"
                  className="custom-file-input"
                  id="inputButton"
                  onChange={() => setImgText("Image is loaded")}
                  required
                />
              </NavTitle>

              <SubmitButton
                onClick={() => {
                  document.getElementById("inputButton").click();
                }}
                type="button"
                value="Upload image"
              ></SubmitButton>
            </InputContainer>
          </InputContainer>
          <InputContainer>
            <NavTitle>
              <label htmlFor="item_title">Item title: </label>
            </NavTitle>
            <Input
              id="item_title"
              type="text"
              defaultValue=""
              name="item_title"
              required
            />
          </InputContainer>
          <InputContainer>
            <NavTitle>
              <label htmlFor="item_description">Item description:</label>
            </NavTitle>
            <TextArea
              required
              id="item_description"
              type="text"
              name="item_description"
              defaultValue=""
            ></TextArea>
          </InputContainer>
          <InputContainer>
            <NavTitle>
              <label htmlFor="Price">Price:</label>
            </NavTitle>
            <Input
              id="Price"
              type="number"
              name="item_price"
              defaultValue=""
              required
            />
          </InputContainer>
          <InputContainer>
            <NavTitle>
              <label htmlFor=""></label>
            </NavTitle>
            <SubmitButton type="submit" value="Add item" />
          </InputContainer>
          <Error error={error} errorRedirect={errorRedirect} />
        </form>
      </SubContainer1>
      <SubContainer2>
        <Heading>ADD ITEM</Heading>
      </SubContainer2>
    </Container>
  );
};
const Image = styled.p`
  width: 100px;
  height: 100px;
  border-radius: 50%; ;
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
const TextArea = styled.textarea`
  display: flex;
  justify-content: center;
  padding: 5px;
  width: 200px;
  height: 150px;
`;

const SubContainer1 = styled.div`
  width: 50%;
  background-color: #ffffff;
  flex-grow: 1;
  margin-top: 10px;
`;
const SubContainer2 = styled.div`
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
  margin-top: 30%;
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

export default AddItem;
