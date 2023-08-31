import React, { useState, useEffect } from "react";
import DrawPad from "./gameplay/DrawPad";
import WrittenPrompt from "./gameplay/WrittenPrompt";
import ImageDisplay from "./gameplay/ImageDisplay";
import { WritePad } from "./gameplay/WritePad";
import { Lobby } from "./gameplay/Lobby";
import { End } from "./gameplay/End"
import CountdownTimer from "./gameplay/CountdownTimer";
import styles from "../styles/PlayingField.module.css";
import axios from 'axios';

type PlayingFieldProps = {
  variant?: string;
  gameData: any;
  gameplayData: any;
  playerName: any;
  onReadyToStart: () => void;
  onDoneStory: () => void;
  onDoneDrawing: () => void;
  onDonePoem: () => void;
};

export const PlayingField = ({ variant, gameData, gameplayData, playerName, onReadyToStart, onDoneStory, onDoneDrawing, onDonePoem }: PlayingFieldProps) => {
  
  const [dataUrl, setDataUrl] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [poemInputValue, setPoemInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [storyText, setStoryText] = useState(null);

  const playerSeries = gameplayData?.player_series[playerName];

  useEffect(() => {

    if (variant === "drawing") {
      const getPlayerStory = async (player, room, roundNumber) => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/game/get-story/', {
            params: {
              player: player,
              room: room,
              round_number: roundNumber
            }
          });

          // Handle the successful response
          const story = response.data;
          setStoryText(story.story_text);
        } catch (error) {
          // Handle the error response
          console.error(error);
        }
      };

      const getPlayerPoem = async (player, room, roundNumber) => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/game/get-poem/', {
            params: {
              player: player,
              room: room,
              round_number: roundNumber
            }
          });

          // Handle the successful response
          const poem = response.data;
          console.log(response);
          setStoryText(poem.poem_text);
        } catch (error) {
          // Handle the error response
          console.error(error);
        }
      };
      console.log(gameplayData.round_order[gameData.current_round_number - 2]);

      if (gameplayData.round_order[gameData.current_round_number - 2] === "one-sentence-story") {
        getPlayerStory(playerSeries[gameData.current_round_number-1].id, gameData.room_id, gameData.current_round_number-1);
      } else if (gameplayData.round_order[gameData.current_round_number - 2] === "poem") {
        console.log("getting poem");
        getPlayerPoem(playerSeries[gameData.current_round_number-1].id, gameData.room_id, gameData.current_round_number-1);

      };
    } else if (variant === "poem") {
      const getPlayerDrawing = async (player, room, roundNumber) => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/game/get-drawing/', {
            params: {
              player: player,
              room: room,
              round_number: roundNumber
            }
          });

          // Handle the successful response
          const drawing = response.data;
          setDataUrl(drawing.dataUrl);
        } catch (error) {
          // Handle the error response
          console.error(error);
        }
      };

      getPlayerDrawing(playerSeries[gameData.current_round_number-1].id, gameData.room_id, gameData.current_round_number-1);
    }
  }, [variant, gameData.playerId, gameData.room_id, gameData.current_round_number]);


  if (variant === "lobby") {
    return (
      <div className={styles.playingFieldColumnContainer}>
        <Lobby gameData={gameData} onReadyToStart={onReadyToStart}/>
      </div>
    );
  }

  if (variant === "one-sentence-story") {

    const handleStorySubmit = async () => {
      setLoading(true);
      try {
        await axios.post('http://127.0.0.1:8000/game/submit-story/', {
          player: gameData.playerId,
          room: gameData.room_id,
          round_number: gameData.current_round_number,
          story: inputValue,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        onDoneStory();
      }
    };

    return (
        <div className={styles.playingFieldColumnContainer}>
          <CountdownTimer seconds={22} variant="writing" />
          <WritePad
            endpoint=""
            placeholder="Write a one-sentence story!"
            inputValue={inputValue}
            setInputValue={setInputValue}
            loading={loading}
            onSubmit={handleStorySubmit}
          />
        </div>
    );
  }

  if (variant === "drawing") {

    return (
      <div className={styles.playingFieldColumnContainer}>
        <div className={styles.playingFieldRowContainer}>
          <WrittenPrompt prompt={storyText} />
          <CountdownTimer seconds={22} variant="drawing" />
        </div>
        <DrawPad gameData={gameData} prompt={storyText} onDoneDrawing={onDoneDrawing}/>
      </div>
    );
  }

  if (variant === "poem") {

    const handlePoemSubmit = async () => {
      setLoading(true);
      try {
        await axios.post('http://127.0.0.1:8000/game/submit-poem/', {
          player: gameData.playerId,
          room: gameData.room_id,
          poem: poemInputValue,
          round_number: gameData.current_round_number,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        onDonePoem();
      }
    };

    return (
      <div className={styles.playingFieldRowContainer}>
        <div className={styles.playingFieldColumnContainer}>
          <CountdownTimer seconds={22} variant="poem" />
          <WritePad
            endpoint=""
            placeholder="Describe this picture in a sentence!"
            inputValue={poemInputValue}
            setInputValue={setPoemInputValue}
            loading={loading}
            onSubmit={handlePoemSubmit}
          />
        </div>
        <ImageDisplay dataURL={dataUrl} alt="" />
      </div>
    );
  }

  if (variant === "end") {
    return (
      <div className={styles.playingFieldColumnContainer}>
        <End/>
      </div>
    );
  }  return null;
};
