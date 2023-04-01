import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/RoomSubmit.module.css";
import "text-encoding";
import { useRouter } from "next/router";

interface RoomSubmitProps {
  endpoint: string;
}

export const RoomSubmit = ({ endpoint }: RoomSubmitProps) => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post(endpoint, {
        data: inputValue,
      });
    } catch (error) {
      console.error(error);
    } finally {
      router.push(`/room/${inputValue}`);
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
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={"Enter room name..."}
      />
    </div>
  );
};
