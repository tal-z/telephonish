import React from "react";
import styles from "../styles/ColorPicker.module.css";

interface ColorPickerProps {
  colors: string[];
  selectedColor: string;
  onColorChange: (color: string) => void;
  brushSize: number;
  onBrushSizeChange: (size: number) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  colors,
  selectedColor,
  onColorChange,
  brushSize,
  onBrushSizeChange,
}) => {
  return (
    <div className={styles.colorPicker}>
      <div className={styles.colorButtons}>
        <div className={styles.column}>
          {colors.slice(0, Math.ceil(colors.length / 2)).map((color) => (
            <button
              key={color}
              className={styles.colorButton}
              style={{ backgroundColor: color }}
              onClick={() => onColorChange(color)}
            />
          ))}
        </div>
        <div className={styles.column}>
          {colors.slice(Math.ceil(colors.length / 2)).map((color) => (
            <button
              key={color}
              className={styles.colorButton}
              style={{ backgroundColor: color }}
              onClick={() => onColorChange(color)}
            />
          ))}
        </div>
      </div>
      <div className={styles.slider}>
        <input
          type="range"
          id="brush-size"
          min="1"
          max="10"
          value={brushSize}
          onChange={(e) => onBrushSizeChange(parseInt(e.target.value))}
          className={styles.sliderInput}
        />
        <span className={styles.brushSize}>{brushSize}px</span>
      </div>
    </div>
  );
};

export default ColorPicker;
