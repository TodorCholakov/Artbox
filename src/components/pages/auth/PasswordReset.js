import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { motion } from "framer-motion";
import Error from "../errorHandling/Error";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const auth = getAuth();
const vh = window.innerHeight;
const PasswordReset = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const onLoginFormSubmitHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    console.log(email);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        navigate("/auth/login");
      })
      .catch((error) => {
        setError(error.code.slice(5).toUpperCase());
      });
  };

  return (
    <Container variants={subTitle} initial="hidden" animate="show">
      <SubContainer1>
        <form onSubmit={onLoginFormSubmitHandler}>
          <InputContainer>
            <NavTitle>
              <label htmlFor="email">Email:</label>
            </NavTitle>
            <Input id="email" type="text" name="userName" />
          </InputContainer>

          <InputContainer>
            <NavTitle>
              <label htmlFor="password"></label>
            </NavTitle>
            <SubmitButton type="submit" value="Password reset" />
          </InputContainer>
          <Error error={error} />
        </form>
      </SubContainer1>
      <SubContainer2>
        <Heading>
          PASSWORD <br />
          RESET
        </Heading>
      </SubContainer2>
    </Container>
  );
};

const subTitle = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 2, ease: "easeIn" },
  },
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
  font-size: 18px;
  min-width: 200px;
  margin-right: 5px;
  padding-bottom: 5px;
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

const Input = styled(motion.input)`
  display: flex;
  justify-content: center;
  padding: 5px;
  min-width: 200px;
  height: 40px;
`;
const SubContainer1 = styled.div`
  padding: 50px;
  width: 50%;
  background-color: #ffffff;
  flex-grow: 1;
  margin-top: 25vh;
`;
const SubContainer2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  background-color: #39393f;
  color: #ffffff;
  @media (max-width: 1000px) {
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

export default PasswordReset;
