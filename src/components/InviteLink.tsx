import React, { useState } from "react";
import styles from "../styles/InviteLink.module.css";

type InviteLinkProps = {
  link: string;
};

export const InviteLink = ({ link }: InviteLinkProps) => {
  const [isFlashing, setIsFlashing] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 500); // Remove the flashing effect after 0.5 seconds (adjust as needed)
  };

  const inputClassName = isFlashing ? `${styles.textInput} ${styles.flashAnimation}` : styles.textInput;

  return (
    <div className={styles.inputContainer}>
      <input type="text" value={link} readOnly className={inputClassName} />
      <button onClick={handleCopy}>Copy Invite Link</button>
    </div>
  );
};
