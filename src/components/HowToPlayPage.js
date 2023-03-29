import React from 'react';
import {Header} from './Header';

export const HowToPlayPage = () => {
  return (
    <div>
      <Header />
      <h1>How to Play</h1>
      <p>
        Welcome to the game! Here's how to play:
      </p>
      <ol>
        <li>The game requires a minimum of 3 players and a maximum of 10 players.</li>
        <li>The server will generate a prompt for each round of the game.</li>
        <li>Players will have 60 seconds to submit their responses to the prompt.</li>
        <li>After all responses have been submitted, players will vote on the best response.</li>
        <li>Points will be awarded to players based on the number of votes their response received.</li>
        <li>The player with the most points at the end of the game is the winner!</li>
      </ol>
      <p>
        Have fun playing!
      </p>
    </div>
  );
};
