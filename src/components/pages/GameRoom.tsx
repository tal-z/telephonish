import React, { useState, useEffect, useRef } from "react";
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
  const [playingFieldVariant, setPlayingFieldVariant] = useState("lobby");
  const [gameData, setGameData] = useState(null);
  const [gameRoomURL, setGameRoomURL] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [playerToken, setPlayerToken] = useState(null);
  const router = useRouter();

  const roomName = router.query.roomName;
  const roomId = router.query.roomId;
  const playerName = router.query.playerName;
  const roomPassword = router.query.password;

  const ws = useRef(null);

  const connectToWebSocket = () => {
    const wsProtocol = window.location.protocol === "https:" ? "wss://" : "ws://";
    const wsUrl = `${wsProtocol}127.0.0.1:8000/ws/game/${roomId}/${playerName}${roomPassword ? `/${roomPassword}` : ''}/`;
    
    ws.current = new WebSocket(wsUrl);
  
    ws.current.onopen = () => {
      console.log("Connected to WebSocket");
      setIsConnected(true);
    };
  
    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      if (error && error.target && error.target.readyState === WebSocket.CLOSED) {
        // WebSocket connection closed
        console.log("WebSocket handshake error");
      }
    };
  
    ws.current.onclose = (event) => {
      console.log("Disconnected from WebSocket");
      setIsConnected(false);
    };
  
    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "player_connect") {
        // Re-request game room data and update player list
        fetchGameData();
      }
      if (data.type === "player_disconnect") {
        // Re-request game room data and update player list
        fetchGameData();
      }
      if (data.type === 'player_token') {
        setPlayerToken(data.token);
      }
      if (data.type === 'connection_closed') {
        if (data.message === 'invalid_room_password') {
          router.push('/error/unable-to-connect')
        } else {
          router.push("/error/unknown-error");
        }
      }
      if (data.type === 'ready_to_start') {
        console.log(data);
        setPlayingFieldVariant('drawing');
      }
    };
  };
  

  const handleConnect = () => {
    connectToWebSocket();
  };

  const handleDisconnect = () => {
    if (ws) {
      ws.current.close();
    }
  };

  const handleSend = (message) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({...message, player_token: playerToken}));
    }
  };
  
  const handleReadyToStart = () => {
    const message = {
      type: 'ready_to_start',
      message: 'ready_to_start',
      // Add any additional data you want to send with the message
    };
    handleSend(message);
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
        <PlayingField 
          gameData={gameData} 
          variant={playingFieldVariant}   
          onReadyToStart={handleReadyToStart}
 />
      </div>
      <Accordion title={"How To Play"}>
        <InstructionText />
      </Accordion>
      <InviteLink link={gameRoomURL.replace("play", "join")} />
    </JustifiedContainer>
  );
};

export default GameRoom;
