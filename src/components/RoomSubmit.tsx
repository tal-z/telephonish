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
      });
  
      if (response.status === 201) {
        router.push(`/room/${roomName}`);
      } 
    } catch (error: any) {
      if (error.response && error.response.data.detail === 'room_already_exists') {
        router.push('/error/room-already-exists');
      } else {
        router.push('/error/unknown-error');
      }    
    } finally {
      setLoading(false);
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
        onKeyDown={handleKeyDown} // Add event listener for key press
      />
    </div>
  );
};
