import React from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import Error from "../errorHandling/Error";

const auth = getAuth();
const vh = window.innerHeight;

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const onLoginFormSubmitHandler = (e) => {
    e.preventDefault();

    const userName = e.target.userName.value;
    const password = e.target.password.value;

    console.log(userName, password);

    signInWithEmailAndPassword(auth, userName, password)
      .then((userCredential) => {
        console.log("User successfully logged in");
        localStorage.setItem("uid", userCredential.user.uid);
        localStorage.setItem("email", userCredential.user.email);
        navigate("/all-items");
      })
      .catch((error) => {
        console.log(error);
        setError(error.code.slice(5).toUpperCase());
      });
  };

  const subTitle = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: 2, ease: "easeIn" },
    },
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
              <label htmlFor="password">Password:</label>
            </NavTitle>
            <Input id="password" type="text" name="password" />
          </InputContainer>
          <InputContainer>
            <NavTitle>
              <label htmlFor="password"></label>
            </NavTitle>
            <SubmitButton type="submit" value="Login" />
          </InputContainer>
          <InputContainer>
            <NavTitle>
              <label htmlFor="password"></label>
            </NavTitle>
            <p>
              or register{" "}
              <Link to="/auth/register">
                <b>here</b>
              </Link>
            </p>
          </InputContainer>
          <InputContainer>
            <NavTitle>
              <label htmlFor="password"></label>
            </NavTitle>
            <p>
              <Link to="/auth/passwordReset">
                <b>Forgotten password</b>
              </Link>
              <Error error={error} />
            </p>
          </InputContainer>
        </form>
      </SubContainer1>
      <SubContainer2>
        <Heading>LOGIN</Heading>
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
  @media (max-width: 768px) {
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
  @media (max-width: 768px) {
    margin-top: 10px;
  }
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

export default Login;
