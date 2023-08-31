import styles from "../../styles/Lobby.module.css";

export const End = () => {


  return (
    <div className={styles.gameInfo}>
        <div>
          <h2>Thank you for playing!</h2>
          <h4>Here's what each player did:</h4>
        </div>
    </div>
  );
};
