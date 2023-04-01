import React, { useState } from 'react';
import { PlayerList } from './PlayerList';
import { PlayingField } from './PlayingField';
import { HelpInstructions } from './HelpInstructions';
import { InviteLink } from './InviteLink';
import { JustifiedContainer } from "./JustifiedContainer";

import styles from "../styles/GameRoom.module.css";

const GameRoom = () => {
    const [players, setPlayers] = useState([]);

    const currentPrompt = "placeholder prompt";
    const currentFormat = "placeholder Format";
    const timeRemaining = 60;
    const playerResponses = [
        {
            player: {
                id: '1',
                name: 'test_player_name',
                score: 0,
                isReady: true,
            }, 
            response: "placeholder"
        }
    ];

  return (
    <JustifiedContainer alignment='left'>
      <div className={styles.row}>
      <PlayerList  players={players}/>
      <PlayingField 
        currentPrompt={currentPrompt}
        currentFormat={currentFormat} 
        timeRemaining={timeRemaining} 
        playerResponses={playerResponses}
      />
      </div>

      <HelpInstructions 
        title={"How To Play"} 
        message={"sample instructions"} 
      />
      <InviteLink link={"http://sample.link"} />
    </JustifiedContainer>
  );
};

export default GameRoom;
