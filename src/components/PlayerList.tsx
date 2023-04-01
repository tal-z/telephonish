import React from 'react';
import styles from "../styles/PlayerList.module.css";

export type Player = {
  id: string;
  name: string;
  score: number;
  isReady: boolean;
};

type PlayerListProps = {
  players: Player[];
};

export const PlayerList = ({ players }: PlayerListProps) => {
  return (
    <div className={styles.playerList}>
      <h3>Players:</h3>
      <ul>
        {players.map((player) => (
          <li key={player.id} className={player.isReady ? styles.ready : ''}>
            {player.name}
            <span className={styles.score}>{player.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
