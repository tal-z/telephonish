import React, { useState } from "react";
import DrawPad from "./gameplay/DrawPad";
import WrittenPrompt from "./gameplay/WrittenPrompt";
import ImageDisplay from "./gameplay/ImageDisplay";
import { WritePad } from "./gameplay/WritePad";
import { Lobby } from "./gameplay/Lobby";
import CountdownTimer from "./gameplay/CountdownTimer";
import styles from "../styles/PlayingField.module.css";
import axios from 'axios';

type PlayingFieldProps = {
  variant?: string;
  gameData: any;
  onReadyToStart: () => void;
  onDoneStory: () => void;
  onDoneDrawing: () => void;
};

export const PlayingField = ({ variant, gameData, onReadyToStart, onDoneStory, onDoneDrawing }: PlayingFieldProps) => {
  if (variant === "lobby") {
    return (
      <div className={styles.playingFieldColumnContainer}>
        <Lobby gameData={gameData} onReadyToStart={onReadyToStart}/>
      </div>
    );
  }

  if (variant === "one-sentence-story") {
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);

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

    const [storyText, setStoryText] = useState(null);
    const [dataUrl, setDataUrl] = useState(null);
    
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

    getPlayerStory( gameData.playerId, gameData.room_id, gameData.current_round_number )

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

    const [dataUrl, setDataUrl] = useState(null);


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

    getPlayerDrawing( gameData.playerId, gameData.room_id, gameData.current_round_number )

    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);

    const handlePoemSubmit = async () => {
      setLoading(true);
      try {
        await axios.post('http://127.0.0.1:8000/game/submit-poem/', {
          player: gameData.playerId,
          room: gameData.room_id,
          poem: inputValue,
          round_number: gameData.current_round_number,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className={styles.playingFieldRowContainer}>
        <div className={styles.playingFieldColumnContainer}>
          <CountdownTimer seconds={22} variant="poem" />
          <WritePad
            endpoint=""
            placeholder="Write a poem about this picture!"
            inputValue={inputValue}
            setInputValue={setInputValue}
            loading={loading}
            onSubmit={handlePoemSubmit}
          />
        </div>
        <ImageDisplay dataURL={dataUrl} alt="" />
      </div>
    );
  }

  // add additional cases for different variants
  return null;
};
