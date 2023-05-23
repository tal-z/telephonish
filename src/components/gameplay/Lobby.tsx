import React, { useEffect, useState } from "react";
import styles from "../../styles/Lobby.module.css";

export const Lobby = ({ gameData }) => {
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
      <button className={styles.startGameButton}>Ready to Start!</button>
    </div>
  );
};
