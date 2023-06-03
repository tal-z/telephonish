import React, { useEffect, useState } from "react";
import styles from "../../styles/Lobby.module.css";

export const Lobby = ({ gameData, onReadyToStart }) => {

  const [submitted, setSubmitted] = useState(false);
  const handleReadyToStart = () => {
    onReadyToStart();
    setSubmitted(true);
  };

  const submitButtonText = submitted ? "Waiting for Other Players" : "Ready to Start!";

  return (
    <div className={styles.gameInfo}>
      {gameData && (
        <div>
          <h2>Game Play Types Selected</h2>
          <ul>
            {Object.entries(gameData)
              .filter(
                ([key, value]) => key.endsWith("_round") && value === true
              )
              .map(([key, _]) => (
                <li className={styles.gameplayType} key={key}>
                  {key.replaceAll("_", " ").replace("round", "")}
                </li>
              ))}
          </ul>
        </div>
      )}
      <button
        className={styles.startGameButton}
        onClick={handleReadyToStart}
      >
        {submitButtonText}
      </button>
    </div>
  );
};
