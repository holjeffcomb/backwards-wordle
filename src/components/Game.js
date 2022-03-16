import React, { useState, useEffect } from "react";
import { words } from "../words";

const Game = () => {
  const [wordle, setWordle] = useState("");
  const [guess, setGuess] = useState("");

  // page load
  useEffect(() => {
    const word = words[Math.floor(Math.random() * words.length)];
    setWordle(word);
  }, []);

  // when guess is updated
  useEffect(() => {
    checkWord();
  }, [guess]);

  // logic to check guess against the wordle
  const checkWord = () => {
    console.log(`Your word is ${guess}`);
  };

  // submit handler
  const handleSubmit = (event) => {
    event.preventDefault();
    setGuess(event.target[0].value);
  };

  return (
    <div>
      <h1>{wordle}</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="guess"></input>
        <button type="submit">Check</button>
      </form>
    </div>
  );
};

export default Game;
