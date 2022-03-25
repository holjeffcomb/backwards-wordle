import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { words } from "../words";
import Square from "./Square";

let checkIfWord = require("check-if-word");
let word = checkIfWord("en");

const GameGridStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
  width: 500px;
  height: 600px;
  min-width: 200px;
  min-height: 200px;
  margin: auto;
`;

const Game = () => {
  const [wordle, setWordle] = useState();
  const [guess, setGuess] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const attempts = [];

  // page load
  useEffect(() => {
    setWordle(words[Math.floor(Math.random() * words.length)]);
    word.check("warmup");
    setIsLoading(false);
  }, []);

  // when guess is updated
  useEffect(() => {
    if (guess) {
      checkWord(guess);
    }
  }, [guess]);

  // logic to check guess against the wordle
  const checkWord = (guess) => {
    // 1. validate word exists
    if (word.check(guess)) {
      // push to attempt array
      attempts.push(guess);

      // 2. iterate through each letter and determine matches
      let result = [];

      for (let ltr in guess) {
        let guessLetter = guess.charAt(ltr);
        let solutionLetter = wordle.charAt(ltr);
        if (guessLetter === solutionLetter) {
          result.push("Green");
        } else if (wordle.indexOf(guessLetter) !== -1) {
          result.push("Yellow");
        } else {
          result.push("Grey");
        }
      }

      console.log(result);

      // 3. if correctly guessed, end game

      // 4. apply colors to squares
    } else {
      throw new Error(`${guess.toUpperCase()} is not a word backwards.`);
    }
  };

  // submit handler
  const handleSubmit = (event) => {
    event.preventDefault();
    setGuess(event.target[0].value);
  };

  return (
    <div className="App">
      <h1 className="App">{wordle}</h1>

      {/*
        5 x 5 grid
      */}
      <GameGridStyle>
        {Array.from(Array(30)).map((x, index) => (
          <Square key={index} />
        ))}
      </GameGridStyle>

      <div className="main-container"></div>

      <form onSubmit={handleSubmit}>
        <input type="text" name="guess"></input>
        <button type="submit">Check</button>
      </form>
    </div>
  );
};

export default Game;
