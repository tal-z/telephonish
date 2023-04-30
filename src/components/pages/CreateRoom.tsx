import React, { useState, ChangeEvent } from "react";
import { JustifiedContainer } from "../JustifiedContainer";
import styles from "../../styles/CreateRoom.module.css";
import axios from "axios";
import "text-encoding";
import { useRouter } from "next/router";

interface RoomSubmitProps {
  endpoint: string;
}

interface CheckboxState {
  oneSentenceStory: boolean;
  drawing: boolean;
  poem: boolean;
  dramaticReading: boolean;
}

export const RoomSubmit = ({ endpoint }: RoomSubmitProps) => {
  const [roomName, setRoomName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false); // Add new state variable
  const router = useRouter();
  const [checkboxState, setCheckboxState] = useState<CheckboxState>({
    oneSentenceStory: false,
    drawing: false,
    poem: false,
    dramaticReading: false,
  });

  function CheckboxComponent() {
    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
      console.log(event.target);
      setCheckboxState({
        ...checkboxState,
        [event.target.name]: event.target.checked,
      });
    };

    return (
      <div>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="oneSentenceStory"
            checked={checkboxState.oneSentenceStory}
            onChange={handleCheckboxChange}
            className={styles.checkboxInput}
          />
          <span className={styles.checkboxText}>📇One-Sentence Story</span>
        </label>
        <br />
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="drawing"
            checked={checkboxState.drawing}
            onChange={handleCheckboxChange}
            className={styles.checkboxInput}
          />
          <span className={styles.checkboxText}>✏️ Drawing</span>
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
          <span className={styles.checkboxText}>🎤 Dramatic Reading</span>
        </label>
      </div>
    );
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !loading && isFocused) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(endpoint, {
        room_name: roomName,
        selected_values: checkboxState,
      });

      if (response.status === 201) {
        router.push(`/room/${roomName}`);
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

  return (
    <div>
      <h2>Choose Gameplay Types</h2>
      <CheckboxComponent />
      <h2>Select a Room Name!</h2>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder={"Enter room name..."}
          onFocus={() => setIsFocused(true)} // Add onFocus event listener
          onBlur={() => setIsFocused(false)} // Add onBlur event listener
          onKeyDown={handleKeyDown} // Add event listener for key press
        />
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export const CreateRoom = () => {
  const createRoomEndpoint = "http://127.0.0.1:8000/game/create-room/";

  return (
    <JustifiedContainer alignment={"left"}>
      <RoomSubmit endpoint={createRoomEndpoint} />
    </JustifiedContainer>
  );
};
