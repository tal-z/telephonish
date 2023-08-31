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
          <h2>Get Ready to Play!</h2>
          <h4>Here's what you'll be doing:</h4>
          <ul>
              <li className={styles.gameplayType} key="story">
                1. Writing a really short story
              </li>
              <li className={styles.gameplayType} key="drawing">
                2. Drawing somebody else's short story
              </li>
              <li className={styles.gameplayType} key="describing">
                3. Describing somebody else's drawing
              </li>
              <li className={styles.gameplayType} key="repeat">
                t. Rinse and repeat!
              </li>
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
