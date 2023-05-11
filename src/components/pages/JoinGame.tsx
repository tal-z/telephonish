import React, { useState } from 'react';
import { w3cwebsocket as WebSocket } from 'websocket';
import { useRouter } from "next/router";

const JoinGame = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');
  const router = useRouter();


  const connectToWebSocket = () => {
    const wsProtocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
    const wsUrl = `${wsProtocol}127.0.0.1:8000/ws/game/${roomName}/${username}/`;
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
      console.log('Received message:', data);
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


  return (
    <div>
      <label>
        Room name:
        <input type="text" value={roomName} onChange={(event) => setRoomName(event.target.value)} />
      </label>
      <br />
      <label>
        Username:
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
      </label>
      <br />
      <button onClick={handleConnect} disabled={isConnected}>Connect</button>
      <button onClick={handleDisconnect} disabled={!isConnected}>Disconnect</button>
      <br />
      <input type="text" placeholder="Type a message..." onKeyDown={(event) => {
        if (event.key === 'Enter') {
          handleSend(event.target.value);
          event.target.value = '';
        }
      }} />
    </div>
  );
};

export default JoinGame;
