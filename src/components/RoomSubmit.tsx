import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/RoomSubmit.module.css";
import "text-encoding";
import { useRouter } from "next/router";

interface RoomSubmitProps {
  endpoint: string;
}

export const RoomSubmit = ({ endpoint }: RoomSubmitProps) => {
  const [roomName, setRoomName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false); // Add new state variable
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(endpoint, {
        room_name: roomName,
      });
  
      if (response.status === 201) {
        router.push(`/room/${roomName}`);
      } 
    } catch (error) {
        if (error.response.data.detail === 'room_already_exists') {
          router.push('/error/room-already-exists');
        }    
        router.push('/error/unknown-error');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && isFocused) { // Only call handleSubmit if input is in focus
      handleSubmit();
    }
  };

  return (
    <div className={styles.inputContainer}>
      {" "}
      {/* Add the input-container class to the parent div */}
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Loading..." : "Submit"}
      </button>
      <input
        type="text"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        placeholder={"Enter room name..."}
        onFocus={() => setIsFocused(true)} // Add onFocus event listener
        onBlur={() => setIsFocused(false)} // Add onBlur event listener
        onKeyPress={handleKeyPress} // Add event listener for key press
      />
    </div>
  );
};
