import React from 'react';
import ReactDOM from 'react-dom';
import { OpenCvProvider } from 'opencv-react';

import App from './App';

ReactDOM.render(
  <OpenCvProvider>
    <App />
  </OpenCvProvider>,
  document.getElementById('root')
);
