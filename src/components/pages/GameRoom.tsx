import React, { useState, useEffect } from "react";
import { PlayerList } from "../PlayerList";
import { PlayingField } from "../PlayingField";
import { Accordion } from "../Accordion";
import { InviteLink } from "../InviteLink";
import { JustifiedContainer } from "../JustifiedContainer";
import { InstructionText } from "./Instructions";
import styles from "../../styles/GameRoom.module.css";
import { useRouter } from "next/router";
import axios from "axios";

const GameRoom = () => {
  const [players, setPlayers] = useState({});
  const [gameData, setGameData] = useState(null);
  const [gameRoomURL, setGameRoomURL] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const router = useRouter();

  const roomName = router.query.roomName;
  const roomId = router.query.roomId;
  const playerName = router.query.playerName;
  const roomPassword = router.query.password;

  let ws = null;

  const connectToWebSocket = () => {
    const wsProtocol = window.location.protocol === "https:" ? "wss://" : "ws://";
    const wsUrl = `${wsProtocol}127.0.0.1:8000/ws/game/${roomId}/${playerName}${roomPassword ? `/${roomPassword}` : ''}/`;
    
    ws = new WebSocket(wsUrl);
  
    ws.onopen = () => {
      console.log("Connected to WebSocket");
      setIsConnected(true);
    };
  
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      if (error && error.target && error.target.readyState === WebSocket.CLOSED) {
        // WebSocket connection closed, handle error here
        console.log("WebSocket handshake error");
        //router.push("/error/unable-to-connect");
      }
    };
  
    ws.onclose = (event) => {
      console.log("Disconnected from WebSocket");
      setIsConnected(false);
    };
  
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "player_connect") {
        // Re-request game room data and update player list
        fetchGameData();
      }
      if (data.type === "player_disconnect") {
        // Re-request game room data and update player list
        fetchGameData();
      }
    };
  };
  

  const handleConnect = () => {
    connectToWebSocket();
  };

  const handleDisconnect = () => {
    if (ws) {
      ws.close();
    }
  };

  const handleSend = (message) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    }
  };

  const fetchGameData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/game/get-room-info/${roomName}`
      );
      const data = response.data;

      setGameData(data.room_data);
      setPlayers(data.player_data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGameData();
    handleConnect();
  }, []);

  useEffect(() => {
    const updateGameRoomURL = () => {
      setGameRoomURL(window.location.href);
    };
    updateGameRoomURL();
  }, [roomName]);

  useEffect(() => {
    return () => {
      handleDisconnect(); // Clean up WebSocket connection on component unmount
    };
  }, []);

  if (!isConnected) {
    return <div>Connecting to WebSocket...</div>;
  }

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
      <InviteLink link={gameRoomURL.replace("play", "join")} />
    </JustifiedContainer>
  );
};

export default GameRoom;
