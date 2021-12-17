import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Error = (props) => {
  return (
    <Container>
      <Text>{props.error} </Text>
      {props.errorRedirect ? (
        <Link to={props.errorRedirect}>
          <Text>
            <b> here </b>
          </Text>
        </Link>
      ) : (
        ""
      )}
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  padding-top: 10px;
  justify-content: center;
  align-items: stretch;
  overflow: hidden; /* Hide scrollbars */
  color: red;

  border-top: 1px solid white;
`;

const Text = styled.p`
  color: red;
  margin-right: 5px;
`;

export default Error;
