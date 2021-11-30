import React, { useEffect, useState } from 'react';
import { useOpenCv } from 'opencv-react';

export default function App() {
  const { cv, loaded: cvLoaded } = useOpenCv();

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
