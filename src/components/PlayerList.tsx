import React from "react";
import styles from "../styles/PlayerList.module.css";

import { PlayerListItem } from "./PlayerListItem";

export const PlayerList = ({ players }) => {
  const playerEntries = Object.entries(players);

  return (
    <div className={styles.playerList}>
      <h2>Players</h2>
      <div className={styles.playerListInner}>
        {playerEntries.map(([id, player]) => (
          <PlayerListItem key={id} id={id} name={player.name} />
        ))}
      </div>
    </div>
  );
};
