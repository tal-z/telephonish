import React from "react";
import { JustifiedContainer } from "../JustifiedContainer";

export const CreateGame = () => {
  return (
    <JustifiedContainer alignment={"left"}>
      <input placeholder="Enter room name..." />
      <button>Start Game</button>
    </JustifiedContainer>
  );
};
