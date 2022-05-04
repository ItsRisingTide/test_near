import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initiallizeContract } from './utils/near';

import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

window.nearInitPromise = initiallizeContract()
  .then(() => {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      // <React.StrictMode>
      <App />
      // </React.StrictMode>
    );
  })
  .catch((err) => {
    console.error(err);
  });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
