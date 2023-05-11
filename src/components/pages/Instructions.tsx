import React from "react";
import { JustifiedContainer } from "../JustifiedContainer";

export const InstructionText = () => {

  return (
    <div>
      <h1>How to Play</h1>
      <p>Welcome to Telephonish! Here's how to play:</p>
      <ol>
        <li>
          At the start of the game, each player writes a short message in
          response to a prompt.
        </li>
        <li>
          At the start of each round, a multimedia format will be randomly
          selected (drawing/sketch, audio recording, emojis, or text
          description) for that round.
        </li>
        <li>
          For the first round, each player will be shown a message written by
          another player, and be asked to "re-encode" it in the multimedia
          format selected for that round.
        </li>
        <li>
          In subsequent rounds, each player will then be given a re-encoded
          message that another player made during the previous round.
        </li>
        <li>Each round has a time limit of 1 minute.</li>
        <li>
          The game continues until all prompts have been re-encoded in every
          assigned format.
        </li>
        <li>
          At the end of the game, players will be shown multi-media "slideshows"
          comparing each player's original prompt with the final output to see
          how it evolved through the game.
        </li>
      </ol>
      <p>Have fun playing Telephonish!</p>
    </div>
  )
};


export const Instructions = () => {
  return (
    <JustifiedContainer alignment={"left"}>
      <InstructionText />
    </JustifiedContainer>
  );
};
