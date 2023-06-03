import React, { useState, useEffect, ChangeEvent } from "react";
import { JustifiedContainer } from "../JustifiedContainer";
import styles from "../../styles/CreateRoom.module.css";
import axios from "axios";
import { useRouter } from "next/router";

interface CheckboxState {
  oneSentenceStory: boolean;
  drawing: boolean;
  poem: boolean;
  dramaticReading: boolean;
}

export const RoomSubmit = () => {
  const [roomName, setRoomName] = useState("");
  const [playerName, setPlayerName] = useState("");

  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false); // Add new state variable
  const router = useRouter();
  const [checkboxState, setCheckboxState] = useState<CheckboxState>({
    oneSentenceStory: true,
    drawing: true,
    poem: false,
    dramaticReading: false,
  });
  const [password, setPassword] = useState("");
  const [showValidation, setShowValidation] = useState(false);

  const isCheckboxValid = Object.values(checkboxState).some(Boolean);
  const isRoomNameValid = roomName !== "";
  const isPlayerNameValid = playerName !== "" && playerName.length <= 20;

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleRoomNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomName(event.target.value);
  };

  const handlePlayerNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlayerName(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !loading && isFocused) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const createRoomEndpoint = "http://127.0.0.1:8000/game/create-room/";

    setLoading(true);
    try {
      if (!isCheckboxValid || !isRoomNameValid || !isPlayerNameValid) {
        setShowValidation(true);
        return;
      }
      const createRoomResponse = await axios.post(createRoomEndpoint, {
        room_name: roomName,
        player_name: playerName,
        selected_values: checkboxState,
        password: password,
      });

      if (createRoomResponse.status === 201) {
        const roomId = createRoomResponse.data.id;
        router.push(
          {
            pathname: `/game/play/${roomName}`,
            query: {
              roomName: roomName,
              roomId: roomId,
              playerName: playerName,
              password: password,
            },
          },
          `/game/play/${roomName}`
        );
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.data.detail === "room_already_exists"
      ) {
        router.push("/error/room-already-exists");
      } else {
        router.push("/error/unknown-error");
      }
    } finally {
      setLoading(false);
    }
  };

  function CheckboxComponent() {
    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
      // Disable changing the value for "One-Sentence Story", "Drawing", and "Dramatic Reading" checkboxes
      if (
        event.target.name === "oneSentenceStory" ||
        event.target.name === "drawing" ||
        event.target.name === "dramaticReading"
      ) {
        return;
      }
      setCheckboxState({
        ...checkboxState,
        [event.target.name]: event.target.checked,
      });
    };

    return (
      <div className={styles.checkboxContainer}>
        <h2>Choose Gameplay Types</h2>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="oneSentenceStory"
            disabled
            checked={checkboxState.oneSentenceStory}
            onChange={handleCheckboxChange}
            className={styles.checkboxInput}
          />
          <span className={styles.checkboxText}>📇 One-Sentence Story (Always Selected)</span>
        </label>
        <br />
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="drawing"
            disabled
            checked={checkboxState.drawing}
            onChange={handleCheckboxChange}
            className={styles.checkboxInput}
          />
          <span className={styles.checkboxText}>✏️ Drawing (Always Selected)</span>
        </label>
        <br />
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="poem"
            checked={checkboxState.poem}
            onChange={handleCheckboxChange}
            className={styles.checkboxInput}
          />
          <span className={styles.checkboxText}>📜 Poem</span>
        </label>
        <br />
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="dramaticReading"
            checked={checkboxState.dramaticReading}
            onChange={handleCheckboxChange}
            className={styles.checkboxInput}
          />
          <span className={styles.checkboxText}>🎤 Dramatic Reading (Coming Soon!)</span>
        </label>
      </div>
    );
  }

  const getRandomRoomName = async () => {
    try {
      await axios.get('http://127.0.0.1:8000/game/generate-room-name')
      .then((request) => {
        setRoomName(request.data.random_room_name);
      })
    } catch (error) {
      console.error(error);
    }
  };


  const getRandomPlayerName = async () => {
    try {
      await axios.get('http://127.0.0.1:8000/game/generate-player-name')
      .then((request) => {
        setPlayerName(request.data.random_player_name);
      })
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRandomRoomName();
    getRandomPlayerName();
  }, []);

  return (
    <div>
      <h1>Start a New Game!</h1>
      <CheckboxComponent />
      <h2>Game Room Name</h2>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={roomName}
          onChange={handleRoomNameChange}
          placeholder={"Enter game room name..."}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <h2>Player Name</h2>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={playerName}
          onChange={handlePlayerNameChange}
          placeholder={"Enter player name..."}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
        />
      </div>
      
      <h2>Game Room Password (optional)</h2>
      <div className={styles.inputContainer}>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder={"Enter game room password (if you wish)..."}
        />
      </div>


      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Loading..." : "Create Room!"}
      </button>
      {showValidation && !isCheckboxValid && (
        <div className={styles.error}>Please select at least one checkbox</div>
      )}
      {showValidation && !isRoomNameValid && (
        <div className={styles.error}>Please enter a room name</div>
      )}
      {showValidation && !isPlayerNameValid && (
        <div className={styles.error}>
          Please enter a player name between 1-20 characters long
        </div>
      )}
    </div>
  );
};

export const NewGame = () => {
  return (
    <JustifiedContainer alignment={"left"}>
      <RoomSubmit />
    </JustifiedContainer>
  );
};
