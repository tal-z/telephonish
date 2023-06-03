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
  const [gameRoomData, setGameRoomData] = useState(null);
  const [gameplayData, setGameplayData] = useState(null);
  const [gameRoomURL, setGameRoomURL] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [playerToken, setPlayerToken] = useState(null);
  const [playerId, setPlayerId] = useState(null);  
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
        fetchGameRoomData();
      }
      if (data.type === "player_disconnect") {
        // Re-request game room data and update player list
        fetchGameRoomData();
      }
      if (data.type === 'player_token') {
        setPlayerToken(data.token);
        setPlayerId(data.player_id);
      }
      if (data.type === 'connection_closed') {
        if (data.message === 'invalid_room_password') {
          router.push('/error/unable-to-connect')
        } else {
          router.push("/error/unknown-error");
        }
      }
      if (data.type === 'ready_to_start') {
        setPlayingFieldVariant('one-sentence-story');
      }
      if (data.type === 'done_writing_story') {
        setPlayingFieldVariant('drawing');
      }
      if (data.type === 'done_drawing') {
        setPlayingFieldVariant('poem');
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
    };
    handleSend(message);
  };

  const handleDoneStory = () => {
    const message = {
      type: 'done_writing_story',
      message: 'done_writing_story',
    };
    handleSend(message);
  };


  const handleDoneDrawing = () => {
    const message = {
      type: 'done_drawing',
      message: 'done_drawing',
    };
    handleSend(message);
  };

  const fetchGameRoomData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/game/get-room-info/${roomName}`
      );
      const data = response.data;

      setGameRoomData(data.room_data);
      setPlayers(data.player_data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchGameplayData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/game/get-gameplay-info/${roomName}`
      );
      const data = response.data;
      console.log(data);

      setGameplayData(data);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    fetchGameRoomData();
    fetchGameplayData();
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
          gameData={{ ...gameRoomData, playerId: playerId }} 
          variant={playingFieldVariant}   
          onReadyToStart={handleReadyToStart}
          onDoneStory={handleDoneStory}
          onDoneDrawing={handleDoneDrawing}
          className={playingFieldVariant === 'lobby' ? styles.lobbyVariant : styles.drawingVariant}
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
