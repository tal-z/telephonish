import React, { useState, useEffect } from "react";
import { PlayerList, Player } from "../PlayerList";
import { PlayingField } from "../PlayingField";
import { Accordion } from "../Accordion";
import { InviteLink } from "../InviteLink";
import { JustifiedContainer } from "../JustifiedContainer";
import { InstructionText } from "./Instructions";
import styles from "../../styles/GameRoom.module.css";
import { useRouter } from 'next/router'



const GameRoom = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameData, setGameData] = useState(null);
  const [gameRoomURL, setGameRoomURL] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const router = useRouter();

  const roomName = router.query.roomName;
  const playerName = router.query.playerName;

  const connectToWebSocket = () => {
    const wsProtocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
    const wsUrl = `${wsProtocol}127.0.0.1:8000/ws/game/${roomName}/${playerName}/`;
    console.log(wsUrl);
    const ws = new WebSocket(wsUrl);
    console.log(ws);
    ws.onopen = () => {
      console.log('Connected to WebSocket');
      setIsConnected(true);
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket');
      setIsConnected(false);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "player_connect") {
        addPlayer(data.player);
      }
    };
  };

  const handleConnect = () => {
    connectToWebSocket();
  };

  const handleDisconnect = () => {
    // Disconnect from WebSocket
  };

  const handleSend = (message) => {
    // Send message to WebSocket
  };

  
  const addPlayer = (player: Player) => {
    console.log(player);
    setPlayers([...players, player]);
  };

  
  
  useEffect(() => {
    const roomName = window.location.href.split("/").at(-1);
    const fetchGameData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/game/get-room-info/${roomName}`);
        const data = await response.json();
        setGameData(data);
      } catch (error) {
        console.error(error);
      }
    };

    const updateGameRoomURL = () => {
      setGameRoomURL(window.location.href);
    };

    fetchGameData();
    updateGameRoomURL();
    handleConnect();
  }, []);

  return (
    <JustifiedContainer alignment="left">
      <h2>Now Playing: {roomName}</h2>
      <div className={styles.row}>
        <PlayerList players={players} />
        <PlayingField gameData={gameData} variant="lobby" />
      </div>
      <Accordion title={"How To Play"}>
        <InstructionText />
      </Accordion>
      <InviteLink link={gameRoomURL} />
    </JustifiedContainer>
  );
};

export default GameRoom;
