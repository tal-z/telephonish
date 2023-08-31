import React, { useState, useEffect } from "react";
import styles from "../../styles/WritePad.module.css";
import "text-encoding";

interface RoomSubmitProps {
  endpoint: string;
  placeholder: string;
  inputValue: string;
  setInputValue: (value: string) => void;
  loading: boolean;
  onSubmit: () => void;
}

export const WritePad = ({ endpoint, placeholder, inputValue, setInputValue, loading, onSubmit }: RoomSubmitProps) => {

  const [submitted, setSubmitted] = useState(false);

  const handleStorySubmit = async () => {
    await onSubmit();
    setSubmitted(true);
  };

  const submitButtonText = (
    loading 
    ? "Loading..." 
    : (
        submitted 
        ? "Waiting for other players" 
        : "Submit"
      )
  );

  useEffect(() => {
    // Clear the input value when the component renders
    setInputValue("");
  }, []);
  
  return (
    <div className={styles.inputContainer}>
      <textarea
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
      />
      <button onClick={handleStorySubmit} disabled={loading}>
        {submitButtonText}
      </button>
    </div>
  );
};
