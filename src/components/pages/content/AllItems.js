import React from "react";

import { useState, useEffect } from "react";
import { db } from "../../../utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import Item from "./Item";
import styled from "styled-components";
import { motion } from "framer-motion";
import { pageAnimation } from "../../../animation";

const AllItems = () => {
  const itemsCollectionRef = collection(db, "items");
  const [items, setItems] = useState([]);
  const [item, setItem] = useState();
  useEffect(() => {
    const getItems = async () => {
      const setDataAll = await getDocs(itemsCollectionRef);
      setItems(setDataAll.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getItems();
  }, []);

  return (
    <ItemsContainer variants={pageAnimation} initial="hidden" animate="show">
      {items.map((item) => {
        return <Item key={item.id} {...item} />;
      })}
    </ItemsContainer>
  );
};

const ItemsContainer = styled(motion.div)`
  padding-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
export default AllItems;
