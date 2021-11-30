import React, { useEffect, useState } from 'react';
import { useOpenCv } from 'opencv-react';

export default function App() {
  const { cv, loaded: cvLoaded } = useOpenCv();

  if (!(cvLoaded && cv)) {
    return <h2>Loading...</h2>;
  }
  console.log('cvload', { cv, cvLoaded });
  return (
    <main>
      <div className="row">
        <select>
          <option>large1</option>
          <option>small1</option>
        </select>
      </div>
      <h2>Image t </h2>
    </main>
  );
}
