import React from "react";
import styled from "styled-components";

const SquareStyle = styled.div`
  display: block;
  width: 90%;
  height: 90%;
  border: 1px solid black;
  margin: auto;
`;

const Square = () => {
  return <SquareStyle />;
};

export default Square;
