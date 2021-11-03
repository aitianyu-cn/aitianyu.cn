import React from 'react';
import ReactDOM from 'react-dom';
import './aitianyu.view/css/index.css';
import { TianyuViewShell } from './aitianyu.view/TianyuViewShell';

ReactDOM.render(
  <React.StrictMode>
    <TianyuViewShell />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
