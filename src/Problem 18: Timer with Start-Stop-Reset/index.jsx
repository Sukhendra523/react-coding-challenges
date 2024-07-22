import { useRef, useState } from "react";

/* 
### Problem 18: Timer with Start/Stop/Reset

**Description:**

- Create a timer that counts up from zero.
- Provide buttons to start, stop, and reset the timer.
- Display the elapsed time in a human-readable format (e.g., MM:SS).

*/

const renderTimeDigits = (number) => {
  return number > 9 ? number : "0" + number;
};

function convertSecondsToTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  return `${renderTimeDigits(h)} : ${renderTimeDigits(m)} : ${renderTimeDigits(
    s
  )}`;
}

const initialTime = {
  timeString: "00 : 00 : 00",
  totalSeconds: 0,
};

const StopWatch = () => {
  const [currentTime, setCurrentTime] = useState(initialTime);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef();

  const timerHandler = (isStartTimer) => {
    if (!isStartTimer) {
      clearInterval(timerRef.current);
      setIsTimerRunning(!isTimerRunning);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentTime((prevTime) => {
        const updatedSeconds = prevTime.totalSeconds + 1;
        return {
          timeString: convertSecondsToTime(updatedSeconds),
          totalSeconds: updatedSeconds,
        };
      });
    }, 1000);

    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsTimerRunning(false);
    setCurrentTime(initialTime);
  };

  return (
    <div>
      <h3>
        {isTimerRunning
          ? "Running..."
          : currentTime.totalSeconds > 0 && "Paused..."}
      </h3>
      <div style={{ marginBottom: "1rem" }}>{currentTime.timeString}</div>
      <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
        <button onClick={() => timerHandler(!isTimerRunning)}>
          {isTimerRunning ? "Stop" : "Start"}
        </button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

export default StopWatch;
