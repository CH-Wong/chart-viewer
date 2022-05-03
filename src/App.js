/** App.js */
import React from "react";
import {MultilineChart, LineChart} from "./Charts.js";


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
  const data = new Set([
    {"time": 1651518737, "temperature": 25.0},
    {"time": 1651518747, "temperature": 26.0},
    {"time": 1651518757, "temperature": 27.0},
    {"time": 1651518767, "temperature": 28.0},
    {"time": 1651518777, "temperature": 29.0},
    {"time": 1651518787, "temperature": 25.0},
    {"time": 1651518797, "temperature": 26.0},
  ]);

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
