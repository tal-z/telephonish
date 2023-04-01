import React from "react";
import styles from "../styles/PlayerList.module.css";
import { Player } from "./PlayerList";

export const PlayerListItem = ({ id, name, isReady }: Player) => {
  return (
    <li key={id} className={styles.playerListItem}>
      <div className={styles.player}>
        <span className={styles.name}>{name}</span>
      </div>
    </li>
  );
};
