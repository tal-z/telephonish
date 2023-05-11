import React from "react";
import styles from "../styles/PlayerList.module.css";

import { PlayerListItem } from "./PlayerListItem";

export type Player = {
  id: string;
  name: string;
};

type PlayerListProps = {
  players: Player[];
};

export const PlayerList = ({ players }: PlayerListProps) => {
  return (
    <div className={styles.playerList}>
            <h2>Players</h2>
      <div className={styles.playerListInner}>
        {players.map((player) => (
          <PlayerListItem
            key={player.id}
            id={player.id}
            name={player.name}
          />
        ))}
      </div>
    </div>
  );
};
