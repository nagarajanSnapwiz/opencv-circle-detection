import React, { useEffect, useState, useRef } from 'react';
import { useOpenCv } from 'opencv-react';
import { processImage } from './process-image';
import testData from './data.json';

function loadImage(img) {
  return new Promise((res, reject) => {
    const image = new Image();
    image.crossOrigin = 'Anonymous';

    image.onload = () => {
      res();
    };
    image.src = img;
  });
}

export default function App() {
  const { cv, loaded: cvLoaded } = useOpenCv();
  const [selectedFile, setSelectedFile] = useState(
    'https://cdn.jsdelivr.net/gh/nagarajanSnapwiz/opencv-circle-detection@master/public/images/big11.jpg'
  );
  const origImgRef = useRef();
  const detectedCirclesCanvasRef = useRef();

  useEffect(() => {
    if (cv) {
      loadImage(selectedFile).then(() => {
        processImage(cv, selectedFile);
      });
    }
  }, [selectedFile, origImgRef.current, cv]);

  if (!cvLoaded) {
    return <h2>Loading...</h2>;
  }
  return (
    <main>
      <div className="row">
        <select
          value={selectedFile}
          onChange={(e) => {
            setSelectedFile(e.target.value);
          }}
        >
          {testData.map((x) => (
            <option value={x.url}>{x.name}</option>
          ))}
        </select>
      </div>
      <h2>Original Image </h2>
      <img src={selectedFile} ref={origImgRef} style={{ maxWidth: '100%' }} />
      <h2>Detected Circles</h2>
      <canvas ref={detectedCirclesCanvasRef} id="detectedCircle"></canvas>
    </main>
  );
}
