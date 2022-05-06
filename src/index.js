import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from "./auth/login.js"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    {/* <React.StrictMode> */}
      <BrowserRouter>
        <Routes>
            <Route exact path="/login" element={<Login />}/>
            <Route exact path="/chart" element={<App />}/>
        </Routes>
      </BrowserRouter>
    {/* </React.StrictMode> */}
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



