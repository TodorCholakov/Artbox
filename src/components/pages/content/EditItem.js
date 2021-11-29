import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useParams, Navigate } from "react-router-dom";

const vh = window.innerHeight;

const EditItem = () => {
  const [redirectNow, setRedirectNow] = useState(false);
  const storage = getStorage();
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [imgText, setImgText] = useState("");
  const [docRef, setDocRef] = useState(doc(db, "items", id));

  useEffect(() => {
    const getItem = async () => {
      const data = await getDoc(docRef);
      setItem(data.data());
    };
    getItem();
  }, [docRef]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    let item_img_url = e.target.item_img_url.files[0];
    console.log(item.item_img_url);
    if (item_img_url) {
      const imageRef = ref(storage, `itemImages/${id}.jpg`);
      uploadBytes(imageRef, item_img_url).then(() => {
        // console.log("Uploaded a blob or file!");
        setDoc(doc(db, "items", id), {
          userId: id,
          item_author: item.item_author,
          item_img_url: `itemImages/${id}.jpg`,
          item_title: e.target.item_title.value,
          item_rating: item.item_rating,
          item_description: e.target.item_description.value,
          item_price: e.target.item_price.value,
          item_rating_usersIds: item.item_rating_usersIds,
        }).then(setRedirectNow(true));
      });
    } else {
      setDoc(doc(db, "items", id), {
        userId: id,
        item_author: item.item_author,
        item_img_url: item.item_img_url,
        item_title: e.target.item_title.value,
        item_rating: item.item_rating,
        item_description: e.target.item_description.value,
        item_price: e.target.item_price.value,
        item_rating_usersIds: item.item_rating_usersIds,
      }).then(setRedirectNow(true));
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
                  onChange={() => setImgText("New image is loaded...")}
                />
              </NavTitle>

              <SubmitButton
                onClick={() => {
                  document.getElementById("inputButton").click();
                }}
                type="button"
                value="Upload new image"
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
              defaultValue={item.item_title}
              name="item_title"
            />
          </InputContainer>

          <InputContainer>
            <NavTitle>
              <label htmlFor="item_description">Item description:</label>
            </NavTitle>
            <TextArea
              id="item_description"
              type="text"
              name="item_description"
              defaultValue={item.item_description}
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
              defaultValue={item.item_price}
            />
          </InputContainer>
          <InputContainer>
            <NavTitle>
              <label htmlFor=""></label>
            </NavTitle>
            <SubmitButton type="submit" value="Edit item" />
          </InputContainer>
        </form>
      </SubContainer1>
      <SubContainer2>
        <Heading>EDIT ITEM</Heading>
      </SubContainer2>
    </Container>
  );
};

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

export default EditItem;
