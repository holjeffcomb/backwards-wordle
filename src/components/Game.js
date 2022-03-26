import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { words } from "../words";
import Square from "./Square";

let checkIfWord = require("check-if-word");
let word = checkIfWord("en");
let numGuesses = 0;
let attempts = [];
let squareArr = [];

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
  const [inputValue, setInputValue] = useState("");

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
      console.log(attempts);
      renderSquares();
    }
  }, [guess]);

  const renderSquares = () => {
    for (const attempt in attempts) {
      // add attempt array to square objects
    }
  };

  // logic to check guess against the wordle
  const checkWord = (guess) => {
    // 1. validate word exists
    if (word.check(guess)) {
      if (guess.length === 5) {
        // construct square array
        squareArr[numGuesses] = [
          <Square letter={guess.charAt(0)} key={0 + attempts.length * 5} />,
          <Square letter={guess.charAt(1)} key={1 + attempts.length * 5} />,
          <Square letter={guess.charAt(2)} key={2 + attempts.length * 5} />,
          <Square letter={guess.charAt(3)} key={3 + attempts.length * 5} />,
          <Square letter={guess.charAt(4)} key={4 + attempts.length * 5} />,
        ];

        // push to attempt array
        attempts.push(guess);

        numGuesses++;

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
        throw new Error("You must guess a 5 letter word");
      }
    } else {
      throw new Error(`${guess.toUpperCase()} is not a word backwards.`);
    }
  };

  // submit handler
  const handleSubmit = (event) => {
    event.preventDefault();
    setGuess(inputValue);
    setInputValue("");
  };

  const handleUserInput = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="App">
      <h1 className="App">{wordle}</h1>

      {/*
        5 x 5 grid
      */}
      <GameGridStyle>
        {Array.from(Array(30)).map((x, index) => (
          <Square key={index} letter={"a"} />
        ))}
      </GameGridStyle>

      <div className="main-container"></div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleUserInput}
          name="guess"
        ></input>
        <button type="submit">Check</button>
      </form>
    </div>
  );
};

export default Game;
