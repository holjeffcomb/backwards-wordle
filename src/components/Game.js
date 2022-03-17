import React, { useState, useEffect } from "react";
import { words } from "../words";

let checkIfWord = require("check-if-word");
let word = checkIfWord("en");

const Game = () => {
  const [wordle, setWordle] = useState();
  const [guess, setGuess] = useState();

  // page load
  useEffect(() => {
    setWordle(words[Math.floor(Math.random() * words.length)]);
    word.check("warmup");
  }, []);

  // when guess is updated
  useEffect(() => {
    if (guess) {
      checkWord();
    }
  }, [guess]);

  // logic to check guess against the wordle
  const checkWord = () => {
    // 1. validate word exists
    if (word.check(guess)) {
      let result = [];
      // 2. iterate through each letter and determine matches
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

      <div className="main-container"></div>

      <form onSubmit={handleSubmit}>
        <input type="text" name="guess"></input>
        <button type="submit">Check</button>
      </form>
    </div>
  );
};

export default Game;
