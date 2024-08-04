/* 
### Problem 6: Countdown Timer

- **Description:**
    - Create a countdown timer that starts from a given number of seconds.
    - Provide a button to start the countdown.
    - Display the remaining time in seconds in a paragraph tag.
    - When the timer reaches zero, display a message saying "Time's up!".
*/

import React, { useEffect, useRef, useState } from "react";

const CountdownTimer3 = () => {
  const [inputValue, setInputValue] = useState("");
  const [count, setCount] = useState();
  const [isActive, setIsActive] = useState(false);
  const interval = useRef(null);

  useEffect(() => {
    if (isActive) {
      interval.current = setInterval(() => {
        setCount((prev) => {
          if (prev === 0) {
            setIsActive(false);
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      interval.current && clearInterval(interval.current);
    };
  }, [isActive]);

  const startTimer = () => {
    setCount(+inputValue);
    setIsActive(true);
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

export default CountdownTimer3;
