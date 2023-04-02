import React, { useRef, useState } from 'react';
import CanvasDraw from "react-canvas-draw";
import ColorPicker from "./ColorPicker";
import styles from "../styles/DrawPad.module.css";

const DrawPad: React.FC = () => {
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

  return (
    <div className={styles.drawPadContainer}>
      <CanvasDraw
        className="draw-pad"
        canvasWidth={500}
        canvasHeight={500}
        brushColor={color}
        brushRadius={brushSize}
        ref={canvasRef}
      />
      <div className={styles.toolbar}>
        <ColorPicker
          colors={["#FF0000", "#FFA500", "#FFFF00", "#008000", "#0000FF", "#4B0082", "#EE82EE", "#FF69B4", "#00CED1", "#FFD700", "#8B4513", "#000000"]}
          selectedColor={color}
          onColorChange={handleColorChange}
          brushSize={brushSize}
          onBrushSizeChange={handleBrushSizeChange}
        />
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleClear}>Clear</button>
      </div>

    </div>
  );
};

export default DrawPad;
