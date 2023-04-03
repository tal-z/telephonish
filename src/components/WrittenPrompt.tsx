import React from "react";
import styles from "../styles/WrittenPrompt.module.css";

interface WrittenPromptProps {
  prompt: string;
}

const WrittenPrompt: React.FC<WrittenPromptProps> = ({ prompt }) => {
  return (
    <div className={styles.promptCard}>
      <p className={styles.promptText}>{prompt}</p>
    </div>
  );
};

export default WrittenPrompt;
