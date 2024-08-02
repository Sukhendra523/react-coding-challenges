/**
 * 
Build a traffic light where the lights switch from green
to yellow to red after predetermined intervals and 
loop indefinitely.
 Each light should be lit for the following durations:

Red light: 4000ms
Yellow light: 5000ms
Green light: 3000ms
You are free to exercise your creativity to style the appearance of the traffic light.
 */

import React, { useState, useEffect } from "react";
import "./styles.css"; // Create a CSS file for styling

const lightConfig = {
  red: { color: "yellow", time: 4000 },
  yellow: { color: "green", time: 5000 },
  green: { color: "red", time: 3000 },
};

const TrafficLight = () => {
  const [light, setLight] = useState(lightConfig["red"]);

  useEffect(() => {
    const interval = setTimeout(() => {
      setLight((prevValue) => {
        return lightConfig[prevValue.color];
      });
    }, light.time);

    return () => {
      clearInterval(interval);
    };
  }, [light]);

  return (
    <div className="traffic-light">
      <div
        className="light"
        style={{ backgroundColor: light.color === "red" ? "red" : "black" }}
      ></div>
      <div
        className="light"
        style={{
          backgroundColor: light.color === "yellow" ? "yellow" : "black",
        }}
      ></div>
      <div
        className="light"
        style={{
          backgroundColor: light.color === "green" ? "green" : "black",
        }}
      ></div>
    </div>
  );
};

export default TrafficLight;
