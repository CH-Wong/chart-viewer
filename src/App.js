import logo from './logo.svg';
import './App.css';

import { firebaseConfig } from './firebase.js'
import { initializeApp } from "firebase/app";



import { getDatabase, ref, child, get } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const email = "w.chunheung@gmail.com"
const password = "hellohellotesttest"


var newdata = [];

initializeApp(firebaseConfig)

const auth = getAuth();
const dbRef = ref(getDatabase());

async function getData() {
  var user;

  await signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

  await get(child(dbRef, `livingroom/temperature`), user).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val())

      for (let key in snapshot.val()) {
        newdata.push(snapshot.val()[key])
      };

      console.log(newdata)

    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });

}

getData();


function App() {

  return (
    <div className="App">
      <header className="App-header">
      <canvas id="myChart"></canvas>
      </header>
    </div>
  );
}


// NEXT -> https://github.com/recharts/recharts
// https://reactjs.org/docs/thinking-in-react.html
export default App;


