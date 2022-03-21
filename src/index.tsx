import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: `${process.env.React_APP_FIREBASE_PROJECT_ID}.firebaseapp.com`,
    projectId: process.env.React_APP_FIREBASE_PROJECT_ID,
    storageBucket: `${process.env.React_APP_FIREBASE_PROJECT_ID}.appspot.com`,
    messagingSenderId: process.env.React_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.React_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
