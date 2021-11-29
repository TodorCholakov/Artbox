import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [redirectNow, setRedirectNow] = useState(false);
  setTimeout(() => setRedirectNow(true), 3000);

  const subTitle = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: 1, ease: "easeIn" },
    },
  };

  const moveLeft = {
    hidden: { opacity: 0, x: 500 },
    show: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
  };
  const moveRight = {
    hidden: { opacity: 0, x: -500 },
    show: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  return redirectNow ? (
    <Navigate to="/all-items" />
  ) : (
    <SubContainer>
      <motion.h1 variants={moveLeft} initial="hidden" animate="show">
        ART
      </motion.h1>
      <motion.h1 variants={moveRight} initial="hidden" animate="show">
        BOX
      </motion.h1>
      <motion.h3 variants={subTitle} initial="hidden" animate="show">
        Reveal your passion
      </motion.h3>
    </SubContainer>
  );
};

const SubContainer = styled(motion.div)`
  margin-top: 50px;
  overflow: hidden; /* Hide scrollbars */
`;

export default Home;
