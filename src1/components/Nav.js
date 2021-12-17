import React from "react";
import { FiLogOut } from "react-icons/fi";

import { CgProfile, CgSmileNone } from "react-icons/cg";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Nav = ({ user }) => {
  const isAuthenticated = Boolean(user);
  //console.log(isAuthenticated);

  return (
    <NavWrapper>
      <UlList>
        {isAuthenticated && (
          <li>
            <Link to="/auth/profile">Welcome {user.email}</Link>
          </li>
        )}

        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/all-items">All items</Link>
        </li>
        {isAuthenticated && (
          <li>
            <Link to="/add-item">Add item</Link>
          </li>
        )}
        <li>
          <Link to="/about-us">About us</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        {!isAuthenticated && (
          <li>
            <Link to="/auth/login">Login</Link>
          </li>
        )}
        {!isAuthenticated && (
          <li>
            <Link to="/auth/register">Register</Link>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <Link to="/auth/profile">
              <CgProfile style={styleIcon} />
            </Link>
          </li>
        )}

        {isAuthenticated && (
          <li>
            <Link to="/auth/signOut">
              <FiLogOut style={styleIcon} />
            </Link>
          </li>
        )}
      </UlList>
    </NavWrapper>
  );
};

const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  justify-content: center;
  background-color: #39393f;
  width: 100%;
  -webkit-box-shadow: 1px 4px 6px -3px rgba(0, 0, 0, 0.65);
  box-shadow: 1px 4px 6px -3px rgba(0, 0, 0, 0.65);
  display: column;
  height: 50px;

  @media (max-width: 768px) {
    height: 50px;
    &:hover {
      height: auto;
    }
  }
`;
const styleIcon = {
  fontSize: "18px",
  marginTop: "5px",
};

const UlList = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  color: #ffffff;

  @media (max-width: 768px) {
    flex-direction: column;
    li {
      padding: 10px;
    }
  }

  li {
    &:hover {
      opacity: 0.7;
      transition: 50ms;
      cursor: pointer;
    }
  }
  a {
    text-decoration: none;
    color: #ffffff;
    padding: 15px;
  }
`;

export default Nav;
