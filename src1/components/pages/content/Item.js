import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import styled from "styled-components";
import { useState } from "react";

const Item = (props) => {
  const [url, setUrl] = useState();
  const storage = getStorage();
  const [item, setItem] = useState();

  getDownloadURL(ref(storage, `${props.item_img_url}`))
    .then((url) => {
      setItem(url);
      //console.log(props.item_img_url);
      const img = document.getElementById(props.id);
      img.setAttribute("src", item);
    })
    .catch((error) => {
      // Handle any errors
    });

  //console.log(url);
  const description = props.item_description.substring(0, 120) + "...";
  return (
    <Link to={`/items/item-detailed/${props.id}`} state={{ url: url }}>
      <ItemContainer>
        <SectionItemImg id={props.id} />
        <SubContainer>
          <SectionItemTitle>
            <b>{props.item_title}</b>
          </SectionItemTitle>
          <SectionItemRating>
            <Rating item_rating={props.item_rating} />
          </SectionItemRating>
        </SubContainer>
        <SubContainer>
          <SectionItemAuthor>
            <i>by: {props.item_author}</i>
          </SectionItemAuthor>
          <SectionitemPrice>
            Price: <b>{props.item_price}</b> lv.
          </SectionitemPrice>
        </SubContainer>
        <HR />
        <SectionItemDescription>{description}</SectionItemDescription>
      </ItemContainer>
    </Link>
  );
};

const ItemContainer = styled.div`
  background-color: #f5f5f5;
  resize: auto;
  border-radius: 10px;
  width: 280px;
  height: 300px;
  margin: 4px;
  cursor: pointer;
  &:hover {
    transition: 0.4s;
    transition-timing-function: ease-out;
    -webkit-box-shadow: -6px 7px 19px -4px #000000;
    box-shadow: -6px 7px 19px -4px #000000;
  }
`;
const HR = styled.div`
  border-bottom: 1px solid gray;
  margin: 3px;
  opacity: 0.7;
`;
const SectionItemImg = styled.img`
  width: 280px;
  margin-bottom: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: 150px;

  object-fit: cover;
`;
const SectionItemTitle = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  padding-bottom: 5px;
  font-size: 14px;
`;
const SubContainer = styled.div`
  display: flex;

  justify-content: space-between;
`;

const SectionItemAuthor = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  font-size: 14px;
  padding-top: 5px;
`;
const SectionItemDescription = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  font-size: 14px;
  padding-top: 5px;
`;
const SectionitemPrice = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  font-size: 14px;
`;
const SectionItemRating = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  font-size: 14px;
`;

export default Item;
