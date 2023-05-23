import React, { useState, ChangeEvent, useEffect } from "react";
import { JustifiedContainer } from "../JustifiedContainer";
import styles from "../../styles/CreateRoom.module.css";
import axios from "axios";
import { useRouter } from "next/router";

interface JoinRoomProps {
  endpoint: string;
}

export const JoinRoom = ({ endpoint }: JoinRoomProps) => {
  const [playerName, setPlayerName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false); // Add new state variable
  const [showValidation, setShowValidation] = useState(false);
  const [gameRoomName, setGameRoomName] = useState("");
  const [gameRoomId, setGameRoomId] = useState("");

  const router = useRouter();

  const isPlayerNameValid = playerName !== "" && playerName.length <= 20;

  useEffect(() => {
    const roomName = router.query.room_name !== undefined ? router.query.room_name.toString() : "";
    setGameRoomName(roomName);

    const fetchGameData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/game/get-room-info/${roomName}`
        );
        const data = response.data;
  
        setGameRoomId(data.room_data.room_id);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGameData();
  }, [router.query.room_name]);

  const handlePlayerNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlayerName(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !loading && isFocused) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setShowValidation(true);

    try {
      router.push(
        {
          pathname: `/game/play/${gameRoomName}`,
          query: { 
            roomName: gameRoomName,               
            roomId: gameRoomId,            
            playerName: playerName,
            password: password, 
          },
        },
        `/game/play/${gameRoomName}`
      );
    } catch (error: any) {
      if (
        error.response &&
        error.response.data.detail === "room_does_not_exist"
      ) {
        router.push("/error/room-not-found");
      } else {
        router.push("/error/unknown-error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Join an Existing Game!</h1>
      <h2>Game Room: {gameRoomName}</h2>
      <h2>Enter a Player Name</h2>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={playerName}
          onChange={handlePlayerNameChange}
          placeholder={"Enter your name..."}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <h2>Enter the Game Room Password</h2>
      <div className={styles.inputContainer}>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder={"Enter the game room password..."}
        />
      </div>

      <h2>Join Room!</h2>
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Loading..." : "Submit"}
      </button>
      {showValidation && !isPlayerNameValid && (
        <div className={styles.error}>
          Please enter a player name between 1-20 characters long
        </div>
      )}
    </div>
  );
};

export const JoinGame = () => {
  const joinRoomEndpoint = "http://127.0.0.1:8000/game/join-room/";

  return (
    <JustifiedContainer alignment={"left"}>
      <JoinRoom endpoint={joinRoomEndpoint} />
    </JustifiedContainer>
  );
};
