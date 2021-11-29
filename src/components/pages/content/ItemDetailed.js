import React from "react";
import { db } from "../../../utils/firebase";
import { getDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Rating from "./Rating";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Link } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { getAuth } from "firebase/auth";
let display = "block";
const ItemDetailed = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  console.log(user);
  const [item, setItem] = useState({});
  const [imgUrl, setImgUrl] = useState("");
  const { id } = useParams();
  const [docRef, setDocRef] = useState(doc(db, "items", id));
  const storage = getStorage();
  const [rated, setRated] = useState(false);
  const userId = localStorage.uid;

  useEffect(() => {
    const getItem = async () => {
      const data = await getDoc(docRef);
      const aa = data.data().item_rating_usersIds.includes(userId);
      setRated(aa);
      setItem(data.data());
    };
    getItem();
  }, [rated]);

  console.log(item);
  getDownloadURL(ref(storage, `${item.item_img_url}`))
    .then((url) => {
      setImgUrl(url);
    })
    .catch((error) => {
      // Handle any errors
    });

  const rate = async () => {
    const idUser = localStorage.uid;
    const itemRef = doc(db, "items", id);
    await updateDoc(itemRef, {
      item_rating_usersIds: arrayUnion(idUser),
      item_rating: (item.item_rating += 1),
    });
    setRated(true);
  };

  return (
    <ItemContainer
      variants={itemContainerAnimation}
      initial="hidden"
      animate="visible"
    >
      {user ? (
        <Heart onClick={rate}>{!rated ? <AiFillHeart /> : ""}</Heart>
      ) : (
        <span></span>
      )}
      <SectionItemImg alt="item-image" src={imgUrl} id="myImg" />
      <SubContainer>
        <Title>{item.item_title}</Title>
        <Rating item_rating={item.item_rating} />
      </SubContainer>
      <SubContainer>
        <SubTitle>by:{item.item_author}</SubTitle>
        <Price>
          Price: <b>{item.item_price}</b> lv.
        </Price>
      </SubContainer>
      <HR />
      <SubContainer>
        <Description>{item.item_description}</Description>
      </SubContainer>
      <HR />
      <SubContainer>
        <Link to={`/items/author-contact/${id}`}>
          <SubmitButton type="button">Contact the author</SubmitButton>
        </Link>
        {user ? (
          <Link to={`/items/item-edit/${id}`}>
            <SubmitButton type="button">Edit item</SubmitButton>
          </Link>
        ) : (
          <span></span>
        )}
        {user ? (
          <Link to={`/items/delete-item/${id}`}>
            <SubmitButton type="button">Delete item </SubmitButton>
          </Link>
        ) : (
          <span></span>
        )}
      </SubContainer>
    </ItemContainer>
  );
};
const itemContainerAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.4,
      staggerDirection: 2,
    },
  },
};
const Heart = styled.div`
  font-size: 36px;
  color: #ffffff;
  position: absolute;
  margin-left: 557px;
  margin-top: 2px;
  display: ${display};
  &:hover {
    color: red;
    transition: 200ms;
    transition-timing-function: ease-out;
    cursor: pointer;
  }
`;
const ItemContainer = styled(motion.div)`
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  width: 600px;
  padding-bottom: 15px;
  margin: 0 auto;
  margin-top: 5px;
  -webkit-box-shadow: -6px 7px 19px -4px #000000;
  box-shadow: -6px 7px 19px -4px #000000;
`;
const SectionItemImg = styled.img`
  width: 600px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  height: 400px;
  margin-bottom: 20px;

  object-fit: cover;
`;
const SubContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 10px;
  padding-left: 10px;
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: bold;
`;
const Price = styled.span`
  font-size: 20px;
`;
const SubTitle = styled.span`
  font-size: 14px;
  font-style: italic;

  margin-top: 5px;
`;
const HR = styled.div`
  border-bottom: 1px solid gray;
  margin: 3px;
  opacity: 0.7;
  margin-top: 10px;
  margin-bottom: 15px;
`;
const Description = styled.span`
  font-size: 14px;
  font-style: italic;
`;

const SubmitButton = styled.button`
  background-color: #ffffff;
  border: 1px solid #000000;
  display: inline-block;
  width: 150px;
  cursor: pointer;
  color: #39393f;
  height: 40px;
  font-size: 16px;
  padding: 5px;
  height: 40px;
  transition: 0.5s;
  &:hover {
    transition: 0.5s;
    color: #ffffff;
    background-color: lightblue;
    background-color: #39393f;
  }
`;
export default ItemDetailed;
