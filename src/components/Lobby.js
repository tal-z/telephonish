import React from 'react';
import {Header} from './Header';

export const Lobby = () => {
  return (
    <div>
      <Header />
      <h1>Telephonish Lobby</h1>
      <p>Waiting for players to join...</p>
      <ul>
        <li>Player 1</li>
        <li>Player 2</li>
        <li>Player 3</li>
      </ul>
      <button>Start Game</button>
    </div>
  );
};