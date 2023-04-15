import React, { useState, useEffect } from "react";
import { PlayerList, Player } from "./PlayerList";
import { PlayingField } from "./PlayingField";
import { Accordion } from "./Accordion";
import { InviteLink } from "./InviteLink";
import { JustifiedContainer } from "./JustifiedContainer";
import { Instructions } from "./pages/HowToPlay";
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

  const [gameRoomURL, setGameRoomURL] = useState("");
  useEffect(() => {
    const updateGameRoomURL = () => {
      setGameRoomURL(window.location.href);
    };

    updateGameRoomURL();
  }, []);

  return (
    <JustifiedContainer alignment="center">
      <div className={styles.row}>
        <PlayerList players={players} />
        <PlayingField variant="writing"/>
      </div>
      <Accordion title={"How To Play"}>
        <Instructions />
      </Accordion>
      <InviteLink link={gameRoomURL} />
    </JustifiedContainer>
  );
};

export default GameRoom;
