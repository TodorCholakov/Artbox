import React from "react";
import noImage from "../../../sampleImages/noImage.jpg";

import { setDoc, doc, getDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { db } from "../../../utils/firebase";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, Navigate } from "react-router-dom";

const vh = window.innerHeight;

const Profile = () => {
  const [redirectNow, setRedirectNow] = useState(false);
  const [profileImage, setProfileImage] = useState();
  const id = localStorage.uid;
  const storage = getStorage();
  const storageRef = ref(storage, `profileImages/${id}.jpg`);

  const docRef = doc(db, "users", id);
  const [user, setUser] = useState({});

  useEffect(() => {
    async function Fetch() {
      try {
        const getUser = await getDoc(docRef);
        setUser(getUser.data());
      } catch (e) {
        console.error(e);
      }
    }
    Fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileImage]);
  const imgRef = `profileImages/${id}.jpg`;
  getDownloadURL(ref(storage, imgRef))
    .then((url) => {
      setProfileImage(url);
      console.log(url);
      const img = document.getElementById("myimg");
      img.setAttribute("src", profileImage);
    })
    .catch((error) => {
      // Handle any errors
    });
  console.log(user);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    await setDoc(doc(db, "users", id), {
      userId: id,
      userProfilePic: `profileImages/${id}.jpg`,
      userName: e.target.userName.value,
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      phoneNumber: e.target.phoneNumber.value,
      address: e.target.address.value,
    });
    setRedirectNow(true);
  };
  const changeHandler = (e) => {
    if (e.target.files) {
      let selected = e.target.files[0];
      uploadBytes(storageRef, selected).then(() => {
        console.log("Uploaded a blob or file!");
        const imgRef = `profileImages/${id}.jpg`;
        getDownloadURL(ref(storage, imgRef))
          .then((url) => {
            setProfileImage(url);
            console.log(url);
            const img = document.getElementById("myimg");
            img.setAttribute("src", profileImage);
          })
          .catch((error) => {
            // Handle any errors
          });
      });
    }
  };
  return redirectNow ? (
    <Navigate to="/all-items" />
  ) : (
    <Container variants={subTitle} initial="hidden" animate="show">
      <SubContainer1>
        <form onSubmit={onSubmitHandler}>
          <InputContainer>
            <NavTitle>
              <Image
                alt="noImage"
                id="myimg"
                name="userProfilePic"
                src={user.userProfilePic ? user.userProfilePic : noImage}
              />
              <input
                type="file"
                className="custom-file-input"
                onChange={changeHandler}
                id="inputButton"
              />
            </NavTitle>

            <SubmitButton
              onClick={() => {
                document.getElementById("inputButton").click();
              }}
              type="button"
              value="Edit profile image"
            ></SubmitButton>
          </InputContainer>
          <InputContainer>
            <NavTitle>
              <label htmlFor="email">Email: {localStorage.email} </label>
            </NavTitle>
            <Link to="/auth/change-email">
              <SubmitButton type="button" value="Edit email"></SubmitButton>
            </Link>
          </InputContainer>

          <InputContainer>
            <NavTitle>
              <label htmlFor="userName">User name:</label>
            </NavTitle>
            <Input
              id="userName"
              type="text"
              defaultValue={user.userName}
              name="userName"
            />
          </InputContainer>
          <InputContainer>
            <NavTitle>
              <label htmlFor="firstName">First name:</label>
            </NavTitle>
            <Input
              id="firstName"
              type="text"
              name="firstName"
              defaultValue={user.firstName}
            />
          </InputContainer>
          <InputContainer>
            <NavTitle>
              <label htmlFor="lastName">Last name:</label>
            </NavTitle>
            <Input
              id="lastName"
              type="text"
              name="lastName"
              defaultValue={user.lastName}
            />
          </InputContainer>
          <InputContainer>
            <NavTitle>
              <label htmlFor="phoneNumber">Phone number:</label>
            </NavTitle>
            <Input
              id="phoneNumber"
              type="number"
              name="phoneNumber"
              defaultValue={user.phoneNumber}
            />
          </InputContainer>
          <InputContainer>
            <NavTitle>
              <label htmlFor="adress">Address: </label>
            </NavTitle>
            <Input
              id="address"
              type="text"
              name="address"
              defaultValue={user.address}
            />
          </InputContainer>

          <InputContainer>
            <NavTitle>
              <label htmlFor="password"></label>
            </NavTitle>
            <SubmitButton type="submit" value="Update changes" />
          </InputContainer>
          <InputContainer></InputContainer>
          <InputContainer>
            <p>
              In case you want to leave us you can delete your profile &nbsp;
            </p>
            <Link to="/auth/delete-profile">
              <b> here</b>
            </Link>
          </InputContainer>
        </form>
      </SubContainer1>
      <SubContainer2>
        <Heading>PROFILE DETAILS</Heading>
      </SubContainer2>
    </Container>
  );
};

const Image = styled.img`
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
  min-width: 200px;
  margin-right: 5px;
  align-items: center;
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
  @media (max-width: 900px) {
    display: none;
  }
`;

const Heading = styled.div`
  display: block;
  font-size: 90px;
  text-align: center;
  margin-top: 20%;
`;

const SubmitButton = styled.input`
  background-color: #ffffff;
  border: 1px solid #000000;
  display: inline-block;
  cursor: pointer;
  color: #39393f;
  min-width: 200px;
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
const subTitle = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 2, ease: "easeIn" },
  },
};

export default Profile;
