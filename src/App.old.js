/** App.js */
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";


import { child, get, onValue, getDatabase, ref } from "firebase/database";
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword} from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from "./pages/Home"
import Button from './components/Button'
import Form from './components/Form'

import {MultilineChart, LineChart} from "./Charts.js";
import { email, password, app, auth, dbRef } from './firebaseConfig'


function extractFromObject(key, inputObject, outputArray){
  for (const id in inputObject[key]) {
    outputArray.push(inputObject[key][id]);
  }
}

function logout(){
  console.log("hello?")
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}


async function getData(user, ) {

    // signInWithEmailAndPassword(auth, email, password)
    // .then((userCredential) => {
    //     // Signed in 


    //   })
    //   .catch((error) => {
    //       const errorCode = error.code;
    //       const errorMessage = error.message;
    //   });

  // stations.forEach(station =>
    // get(child(dbRef, station), user)



  //   .then((snapshot) => {
  //     if (snapshot.exists()) {
  //       rawData.push(snapshot.val())

  //       // var temperature = [];
  //       // var humidity = [];
  //       // var time = [];

  //       // extractFromObject("time", snapshot.val(), time)
  //       // extractFromObject("temperature", snapshot.val(), temperature)
  //       // extractFromObject("humidity", snapshot.val(), humidity)

  //       // time.forEach(function(element, index) {
  //       //   newData.push({"time": element*1000, "temperature": temperature[index], "humidity": humidity[index], "station": station})
  //       //   })
        
  //       // setData(newData); 

  //     } else {
  //       console.log("No data available");
  //     }
  //   }).catch((error) => {
  //     console.error(error);
  //   })   
  // )

}


export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  let navigate = useNavigate();
  const handleAction = () => {
    const authentication = getAuth();
      signInWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          navigate('/home')
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
        })
        .catch((error) => {
          console.log(error.code)
          if (error.code === 'auth/wrong-password') {
            toast.error('Please check the Password');
          }
          if (error.code === 'auth/user-not-found') {
            toast.error('Please check the Email');
          }
        })
  }


  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')

    if (authToken) {
      navigate('/home')
    }
  }, [])
  return (
    <div className="App">
      <>
        <ToastContainer />
        <Routes>
          <Route
            path='/login'
            element={
              <Form
                title="Login"
                setEmail={setEmail}
                setPassword={setPassword}
                handleAction={() => handleAction()}
              />}
          />

          <Route
            path='/home'
            element={
              <Home />}
          />
        </Routes>
      </>
    </div>
  );



  // const [data, setData] = useState([]);

  // // var user = userCredential.user;
  // const stations = ["storage", "workyroom", "sleepyroom"]

  // var rawData = [];
  // var humidity = [];
  // var temperature = [];
  // var time = [];

  // const db = getDatabase();

  // signInWithEmailAndPassword(auth, email, password)
  // .then((userCredential) => {
  //   const measurementRef = ref(db, "storage")
  //   onValue(measurementRef, (snapshot) => {
  //     const data = snapshot.val();
  //     console.log(data)
  //     // updateStarCount(postElement, data);
  //   });
  // })



  // useEffect(() => {
  //   signInWithEmailAndPassword(auth, email, password)
  //   .then((userCredential) => {
  //       // Signed in 
  //       var user = userCredential.user;
  //       var newData = [];
        

  //       const stations = ["storage", "workyroom", "sleepyroom"]
  //       const station = "storage"
  //       stations.forEach(station =>
  //         get(child(dbRef, station), user)
  //         .then((snapshot) => {
  //           if (snapshot.exists()) {
              
  //             var temperature = [];
  //             var humidity = [];
  //             var time = [];

  //             extractFromObject("time", snapshot.val(), time)
  //             extractFromObject("temperature", snapshot.val(), temperature)
  //             extractFromObject("humidity", snapshot.val(), humidity)
    
  //             time.forEach(function(element, index) {
  //               newData.push({"time": element*1000, "temperature": temperature[index], "humidity": humidity[index], "station": station})
  //               })
              
  //             setData(newData); 

  //           } else {
  //             console.log("No data available");
  //           }
  //           console.log(data)
  //         }).catch((error) => {
  //           console.error(error);
  //         })   
  //       )
  //   })
  //   .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //   });
  // }, [])


  // const dimensions = {
  //   width: 1000,
  //   height: 500,
  //   margin: {
  //     top: 30,
  //     right: 30,
  //     bottom: 30,
  //     left: 60
  //   }
  // };

  // return (
  //   <div className="App">
  //     {/* <MultilineChart
  //       data={[portfolioData, schcData, vcitData]}
  //       dimensions={dimensions}
  //     /> */}
  //     <LineChart data={data} dimensions={dimensions} yLabel="Temperature" color="steelblue"/>
    
  //     <button
  //         className="login__btn"
  //         onClick={() => logout()}
  //       >
  //         Logout
  //       </button>
  //   </div>
  // );
}
