import React from 'react';
import { Player } from './PlayerList'
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

export const PlayingField = ({ currentPrompt, currentFormat, timeRemaining, playerResponses }: PlayingFieldProps) => {
  return (
    <div className={styles.playingFieldContainer}>
      <h2>Current Prompt:</h2>
      <p>{currentPrompt}</p>
      <h2>Current Format:</h2>
      <p>{currentFormat}</p>
      <h2>Time Remaining:</h2>
      <p>{timeRemaining} seconds</p>
      <h2>Player Responses:</h2>
      <ul>
        {playerResponses.map((response, index) => (
          <li key={index}>
            <h3>{response.player.name}:</h3>
            <p>{response.response}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
