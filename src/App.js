/** App.js */
import { useEffect, useState } from "react";
import {MultilineChart, LineChart} from "./Charts.js";

import { email, password, app, auth, dbRef } from './firebaseConfig.js'
import { child, get, onValue, getDatabase, ref } from "firebase/database";
import { signInWithEmailAndPassword, signOut} from "firebase/auth";
import { } from "firebase/database";

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
  const [data, setData] = useState([]);

  // var user = userCredential.user;
  const stations = ["storage", "workyroom", "sleepyroom"]

  var rawData = [];
  var humidity = [];
  var temperature = [];
  var time = [];

  const db = getDatabase();

  // signInWithEmailAndPassword(auth, email, password)
  // .then((userCredential) => {
  //   const measurementRef = ref(db, "storage")
  //   onValue(measurementRef, (snapshot) => {
  //     const data = snapshot.val();
  //     console.log(data)
  //     // updateStarCount(postElement, data);
  //   });
  // })


    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 


      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
      });

  useEffect(() => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        var user = userCredential.user;
        var newData = [];
        

        const stations = ["storage", "workyroom", "sleepyroom"]
        const station = "storage"
        stations.forEach(station =>
          get(child(dbRef, station), user)
          .then((snapshot) => {
            if (snapshot.exists()) {
              
              var temperature = [];
              var humidity = [];
              var time = [];

              extractFromObject("time", snapshot.val(), time)
              extractFromObject("temperature", snapshot.val(), temperature)
              extractFromObject("humidity", snapshot.val(), humidity)
    
              time.forEach(function(element, index) {
                newData.push({"time": element*1000, "temperature": temperature[index], "humidity": humidity[index], "station": station})
                })
              
              setData(newData); 

            } else {
              console.log("No data available");
            }
            console.log(data)
          }).catch((error) => {
            console.error(error);
          })   
        )
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
  }, [])


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

  return (
    <div className="App">
      {/* <MultilineChart
        data={[portfolioData, schcData, vcitData]}
        dimensions={dimensions}
      /> */}
      <LineChart data={data} dimensions={dimensions} yLabel="Temperature" color="steelblue"/>
    
      <button
          className="login__btn"
          onClick={() => logout()}
        >
          Logout
        </button>
    </div>
  );
}
