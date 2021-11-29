import React from "react";

import styled from "styled-components";
import { motion } from "framer-motion";

const vh = window.innerHeight;

const AboutUs = () => {
  return (
    <Container variants={subTitle} initial="hidden" animate="show">
      <SubContainer1>
        <NavTitle>What is Lorem Ipsum?</NavTitle>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </SubContainer1>
      <SubContainer2>
        <Heading>About us</Heading>
      </SubContainer2>
    </Container>
  );
};
const NavTitle = styled.span`
  color: #39393f;
  display: flex;
  font-size: 22px;
  padding-bottom: 10px;
  margin-right: 5px;
  align-items: center;
`;

const Container = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: stretch;

  height: ${vh - 40}px;
  border-top: 1px solid white;
`;

const SubContainer1 = styled.div`
  width: 50%;
  background-color: #ffffff;
  flex-grow: 1;
  margin-top: 10px;
  padding: 20px;
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

const subTitle = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 2, ease: "easeIn" },
  },
};

export default AboutUs;
