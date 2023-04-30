import React, {useEffect, useState} from "react";
import { JustifiedContainer } from "../JustifiedContainer";
import { PlayerList } from "../PlayerList";
import { InviteLink } from "../InviteLink";

const players = [
  {
    id: "1",
    name: "test_player_name",
    isReady: true,
  },
  {
    id: "2",
    name: "test_player_name_2",
    isReady: true,
  },
  {
    id: "3",
    name: "test_player_name_3",
    isReady: true,
  },
]


export const Lobby = () => {

  const [gameRoomURL, setGameRoomURL] = useState("");
  useEffect(() => {
    const updateGameRoomURL = () => {
      const url = window.location.href.replace("/lobby", "")
      setGameRoomURL(url);
    };

    updateGameRoomURL();
  }, []);

  return (
    <JustifiedContainer alignment={"left"}>
      <h1>Telephonish Lobby</h1>
      <p>Waiting for players to join...</p>
      <PlayerList players={players} />
      <button>Start Game</button>
      <InviteLink link={gameRoomURL} />
    </JustifiedContainer>
  );
};
