/** App.js */
import React from "react";
import {MultilineChart, LineChart} from "./Charts.js";

import { firebaseConfig, email, password } from './firebaseConfig.js'
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

initializeApp(firebaseConfig);


function extractFromObject(key, inputObject, outputArray){
  for (const id in inputObject[key]) {
    outputArray.push(inputObject[key][id]);
  }
}

async function getData(outputArray, station) {
  const auth = getAuth();
  const dbRef = ref(getDatabase());
  await signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      var temperature = [];
      var humidity = [];
      var time = [];
      var data = [];

      get(child(dbRef, station), user)
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val())
          console.log(snapshot.val().time)
          
          extractFromObject("time", snapshot.val(), time)
          extractFromObject("temperature", snapshot.val(), temperature)
          extractFromObject("humidity", snapshot.val(), humidity)

          
          time.forEach(function(element, index) {
            outputArray.push({"time": element*1000, "temperature": temperature[index], "humidity": humidity[index]})
            })
    
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });

      return outputArray
      
  })
  .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
  });
}

export default function App() {
  const dimensions = {
    width: 1000,
    height: 500,
    margin: {
      top: 30,
      right: 30,
      bottom: 30,
      left: 60
    }
  };
  var data = [];

  getData(data, 'sleepyroom');
  
  return (
    <div className="App">
      {/* <MultilineChart
        data={[portfolioData, schcData, vcitData]}
        dimensions={dimensions}
      /> */}
      <LineChart data={data} dimensions={dimensions} yLabel="Workyroom"/>
      <LineChart data={data} dimensions={dimensions} yLabel="Storage"/>
    </div>
  );
}
