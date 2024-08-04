/* 
### Problem 6.2: Countdown Timer with start-stop

- **Description:**
    - Create a countdown timer that starts from a given number of seconds.
    - Provide a common button to start/stop the countdown.
    - Display the remaining time in seconds in a paragraph tag.
    - when clicked button to stop and again clicked to start timer it's should start from previous remaining seconds 
    - When the timer reaches zero, display a message saying "Time's up!".
*/

import React, { useRef, useState } from "react";

const CountdownTimer1 = () => {
  const [inputValue, setInputValue] = useState("");
  const [count, setCount] = useState(null);
  const [isActive, setIsActive] = useState(false);

  const interval = useRef(null);

  const timerHandler = (start) => {
    if (!start) {
      clearInterval(interval.current);
      setIsActive(false);
      return;
    }

    setCount((prevValue) => {
      if (prevValue > -1) {
        return prevValue;
      }

      return +inputValue;
    });
    setIsActive(true);

    interval.current = setInterval(() => {
      setCount((prev) => {
        if (prev === 0) {
          clearInterval(interval.current);
          setIsActive(false);
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />{" "}
        <button onClick={() => timerHandler(!isActive)}>
          {isActive ? "Stop" : "Start"}
        </button>
      </div>
      <p>{count === -1 ? "Time's up!" : count}</p>
      <br />
    </div>
  );
};

export default CountdownTimer1;
