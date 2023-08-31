import React from "react";
import styles from "../styles/PlayerList.module.css";

export const PlayerListItem = ({ id, name, isClient }) => {
  const listItemClassName = isClient
    ? `${styles.playerListItem} ${styles.client}` // Add client class
    : styles.playerListItem;

  return (
    <li key={id} className={listItemClassName}>
      <div className={styles.player}>
        <span className={styles.name}>{name}</span>
      </div>
    </li>
  );
};
