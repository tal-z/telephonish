import React from "react";
import style from "../styles/ImageDisplay.module.css"
interface ImageDisplayProps {
  dataURL: string;
  alt: string;
}

const ImageDisplay = ({ dataURL, alt }: ImageDisplayProps) => {
  return <img className={style.imageDisplayContainer} src={dataURL} alt={alt} />;
};

export default ImageDisplay;