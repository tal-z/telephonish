import React from "react";
import { Player } from "./PlayerList";
import DrawPad from "./DrawPad";
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
      <DrawPad />
    </div>
  );
};
