import React, { useState } from "react";
import Square from "./Square";

const SquareRow = (props) => {
  const [word, setWord] = useState("");
  return <Square />;
};

export default SquareRow;
