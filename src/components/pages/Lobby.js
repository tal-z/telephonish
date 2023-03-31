import React from "react";
import { JustifiedContainer } from "../JustifiedContainer";

export const Lobby = () => {
  return (
    <JustifiedContainer alignment={"left"}>
      <h1>Telephonish Lobby</h1>
      <p>Waiting for players to join...</p>
      <ul>
        <li>Player 1</li>
        <li>Player 2</li>
        <li>Player 3</li>
      </ul>
      <button>Start Game</button>
    </JustifiedContainer>
  );
};
