import React from "react";

import styled from "styled-components";

const Error = (props) => {
  return (
    <Container>
      <Text>{props.error}</Text>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  padding-top: 10px;
  justify-content: center;
  align-items: stretch;
  overflow: hidden; /* Hide scrollbars */

  border-top: 1px solid white;
`;

const Text = styled.p`
  color: red;
`;
export default Error;
