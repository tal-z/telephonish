import React from "react";
import style from "../../styles/ImageDisplay.module.css";
interface ImageDisplayProps {
  dataURL: string;
  alt: string;
}

const ImageDisplay = ({ dataURL, alt }: ImageDisplayProps) => {
  return (
    <div className={style.imageDisplayContainer} >
          <img className={style.imageDisplay} src={dataURL} alt={alt} />
    </div>
  );
};

export default ImageDisplay;
