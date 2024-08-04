/* 
### Problem 6.2: Countdown Timer with start-stop

- **Description:**
    - Create a countdown timer that starts from a given number of seconds.
    - Provide a common button to start/stop the countdown.
    - Display the remaining time in seconds in a paragraph tag.
    - when clicked button to stop and again clicked to start timer it's should start from previous remaining seconds 
    - When the timer reaches zero, display a message saying "Time's up!".
*/

import CountdownTimer1 from "./Solution1";
import CountdownTimer2 from "./Solution2";

const CountdownTimerWithStop = () => {
  return (
    <>
      <CountdownTimer2 />
    </>
  );
};

export default CountdownTimerWithStop;
