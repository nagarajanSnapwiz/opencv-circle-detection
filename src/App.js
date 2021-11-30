import React, { useEffect, useState, useRef } from 'react';
import { useOpenCv } from 'opencv-react';
import testData from './data.json';

export default function App() {
  const { cv, loaded: cvLoaded } = useOpenCv();
  const [selectedFile, setSelectedFile] = useState(
    'https://cdn.jsdelivr.net/gh/nagarajanSnapwiz/opencv-circle-detection@master/public/images/big1.jpg'
  );

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
      <img src={selectedFile} style={{ maxWidth: '100%' }} />
    </main>
  );
}
