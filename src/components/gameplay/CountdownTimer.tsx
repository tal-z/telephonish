import React, { useState, useEffect } from "react";
import styles from "../../styles/CountdownTimer.module.css";

const CountdownTimer = ({ seconds, variant }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  const timerVariant =
    variant === "drawing"
      ? `${styles.countdownTimerDrawing} ${timeLeft <= 20 ? styles.pulse : ""}`
      : `${styles.countdownTimerWriting} ${timeLeft <= 20 ? styles.pulse : ""}`;

  useEffect(() => {
    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const remainingSeconds = timeLeft % 60;

  return (
    <div className={timerVariant}>
      <span>{minutes < 10 ? `0${minutes}` : minutes}</span>:
      <span>
        {remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}
      </span>
    </div>
  );
};

export default CountdownTimer;
