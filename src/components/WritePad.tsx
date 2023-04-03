import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/WritePad.module.css";
import "text-encoding";

interface RoomSubmitProps {
  endpoint: string;
  placeholder: string;
}

export const WritePad = ({ endpoint, placeholder }: RoomSubmitProps) => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post(endpoint, {
        data: inputValue,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.inputContainer}>
      <textarea
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Loading..." : "Submit"}
      </button>
    </div>
  );
};
