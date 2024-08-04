/* 
### Problem 6: Countdown Timer

- **Description:**
    - Create a countdown timer that starts from a given number of seconds.
    - Provide a button to start the countdown.
    - Display the remaining time in seconds in a paragraph tag.
    - When the timer reaches zero, display a message saying "Time's up!".
*/

import React, { useRef, useState } from "react";

const CountdownTimer1 = () => {
  const [inputValue, setInputValue] = useState("");
  const [count, setCount] = useState(null);
  const interval = useRef(null);

  const startTimer = () => {
    setCount(+inputValue);

    interval.current = setInterval(() => {
      setCount((prev) => {
        if (prev === 0) {
          clearInterval(interval.current);
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
        <button onClick={startTimer}>Start</button>
      </div>
      <p>{count === -1 ? "Time's up!" : count}</p>
      <br />
    </div>
  );
};

export default CountdownTimer1;
