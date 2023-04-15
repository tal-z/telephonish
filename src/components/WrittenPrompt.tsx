import React from "react";
import styles from "../styles/WrittenPrompt.module.css";

interface WrittenPromptProps {
  prompt: string;
}

const WrittenPrompt: React.FC<WrittenPromptProps> = ({ prompt }) => {
  return (
    <div className={styles.promptCard}>
      Draw This Prompt:
      <div className={styles.promptText}>"{prompt}"</div>
    </div>
  );
};

export default WrittenPrompt;
