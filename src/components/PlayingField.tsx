import React from "react";
import { Player } from "./PlayerList";
import DrawPad from "./DrawPad";
import WrittenPrompt from "./WrittenPrompt";

import styles from "../styles/PlayingField.module.css";

type PlayingFieldProps = {
  currentPrompt: string;
  currentFormat: string;
  timeRemaining: number;
  playerResponses: {
    player: Player;
    response: string;
  }[];
};

export const PlayingField = ({
  currentPrompt,
  currentFormat,
  timeRemaining,
  playerResponses,
}: PlayingFieldProps) => {
  return (
    <div className={styles.playingFieldContainer}>
      <WrittenPrompt prompt={"Eat a banana"} />
      <DrawPad />
    </div>
  );
};
