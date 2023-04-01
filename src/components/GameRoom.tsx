import React, { useState } from "react";
import { PlayerList, Player } from "./PlayerList";
import { PlayingField } from "./PlayingField";
import { Accordion } from "./Accordion";
import { InviteLink } from "./InviteLink";
import { JustifiedContainer } from "./JustifiedContainer";

import styles from "../styles/GameRoom.module.css";

const GameRoom = () => {
  const placeholderPlayer = {
    id: "1",
    name: "test_player_name",
    isReady: true,
  };
  const placeholderPlayer2 = {
    id: "2",
    name: "test_player_name_2",
    isReady: true,
  };
  const placeholderPlayer3 = {
    id: "3",
    name: "test_player_name_3",
    isReady: true,
  };
  const [players, setPlayers] = useState<Player[]>([
    placeholderPlayer,
    placeholderPlayer2,
    placeholderPlayer3,
  ]);
  const addPlayer = (player: Player) => {
    setPlayers([...players, player]);
  };

  const currentPrompt = "placeholder prompt";
  const currentFormat = "placeholder Format";
  const timeRemaining = 60;
  const playerResponses = [
    {
      player: placeholderPlayer,
      response: "placeholder",
    },
  ];

  return (
    <JustifiedContainer alignment="left">
      <div className={styles.row}>
        <PlayerList players={players} />
        <PlayingField
          currentPrompt={currentPrompt}
          currentFormat={currentFormat}
          timeRemaining={timeRemaining}
          playerResponses={playerResponses}
        />
      </div>

      <Accordion title={"How To Play"} message={"sample instructions"} />
      <InviteLink link={"http://sample.link"} />
    </JustifiedContainer>
  );
};

export default GameRoom;
