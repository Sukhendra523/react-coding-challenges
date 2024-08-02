/* 
### Problem 16: Star Rating

**Description:**

- Create a star rating component.
- The user should be able to click on the stars to set the rating.
- Display the current rating as highlighted stars.

 */

import { useState } from "react";

import "./styles.css";

const startIcon = <>&#9734;</>;

function StarRating({ maxRating = 5 }) {
  const [rating, setRating] = useState(-1);
  const startIcons = Array(maxRating).fill(0);

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
      {startIcons.map((_, i) => {
        return (
          <button
            className={`rating-icon ${i <= rating ? "rated" : ""}`}
            key={i}
            onClick={() => setRating(i)}
            style={{
              backgroundColor: "white",
              border: "none",
              fontSize: "2rem",
            }}
          >
            {startIcon}
          </button>
        );
      })}
    </div>
  );
}

export default StarRating;
