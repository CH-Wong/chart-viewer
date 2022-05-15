/** App.js */
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate, Navigate  } from "react-router-dom";


// import { child, get, onValue, getDatabase, ref } from "firebase/database";
// import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword} from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home'
import Login from './pages/Login'
import ProtectedRoute from "./components/ProtectedRoute";
// import Button from './components/Button'
// import Form from './components/Form'

// import {MultilineChart, LineChart} from "./Charts.js";
// import { email, password, app, auth, dbRef } from './firebaseConfig'



export default function App() {

  return (
      <div className="chartviewer-app">
        <BrowserRouter>
            <ToastContainer />
            <Routes>
            <Route
                path='/login'
                element={<Login />}
            />
            <Route
                path='/home'
                element={<Home />}
            />
            </Routes>
            {/* <Navigate from="*" to="/home" /> */}
            
        </BrowserRouter>
      </div>

  );
}
