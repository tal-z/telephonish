import React, { useRef, useState } from "react";
import CanvasDraw from "react-canvas-draw";
import ColorPicker from "./ColorPicker";
import styles from "../../styles/DrawPad.module.css";
import axios from "axios";

const DrawPad: React.FC = ({ gameData, prompt }) => {
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const canvasRef = useRef<CanvasDraw>(null);

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
  };

  const handleBrushSizeChange = (newSize: number) => {
    setBrushSize(newSize);
  };

  const handleUndo = () => {
    canvasRef.current?.undo();
  };

  const handleClear = () => {
    canvasRef.current?.clear();
  };

  const handleSubmit = () => {
    const dataUrl = canvasRef.current?.getDataURL();
  
    const payload = {
      player: gameData.playerId,  // TODO: fix this to be correct player_id
      room: gameData.room_id,
      round_number: gameData.current_round_number,
      dataUrl: dataUrl,
      prompt: prompt,
    };
    console.log(payload);
  
    axios
      .post("http://127.0.0.1:8000/game/submit-drawing/", payload)
      .then((response) => {
        console.log(response.data);  // Handle the response as needed
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={styles.drawPadContainer}>
      <CanvasDraw
        className={styles.drawPad}
        brushColor={color}
        brushRadius={brushSize}
        ref={canvasRef}
      />
      <div className={styles.toolbar}>
        <ColorPicker
          colors={[
            "#FF0000",
            "#FFA500",
            "#FFFF00",
            "#008000",
            "#0000FF",
            "#4B0082",
            "#EE82EE",
            "#FF69B4",
            "#00CED1",
            "#FFD700",
            "#8B4513",
            "#000000",
          ]}
          selectedColor={color}
          onColorChange={handleColorChange}
          brushSize={brushSize}
          onBrushSizeChange={handleBrushSizeChange}
        />
        <button className={styles.actionButton} onClick={handleUndo}>
          Undo
        </button>
        <button className={styles.actionButton} onClick={handleClear}>
          Clear
        </button>
      </div>
      <button className={styles.submitButton} onClick={handleSubmit}>
        Done
        <br />
        Drawing!
      </button>
    </div>
  );
};

export default DrawPad;
