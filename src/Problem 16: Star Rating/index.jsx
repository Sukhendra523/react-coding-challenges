/* 
### Problem 16: Star Rating

**Description:**

- Create a star rating component.
- The user should be able to click on the stars to set the rating.
- Display the current rating as highlighted stars.

 */

import { useState } from "react";

import "./styles.css";

const startIcon = <>&#9733;</>;

function StarRating({ onChange, maxRating = 5 }) {
  const [rating, setRating] = useState(-1);
  const [ratingHovered, setRatingHovered] = useState(-1);
  const startIcons = Array(maxRating).fill(0);

  const ratingHandler = (i) => {
    setRating(i);
    onChange?.(i);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
      {startIcons.map((_, i) => {
        return (
          <button
            className={`rating-icon ${i <= rating ? "rated" : ""} ${
              i <= ratingHovered ? "hovered" : ""
            }`}
            key={i}
            onClick={() => ratingHandler(i)}
            onMouseEnter={() => setRatingHovered(i)}
            onMouseLeave={() => setRatingHovered(-1)}
          >
            {startIcon}
          </button>
        );
      })}
    </div>
  );
}

export default StarRating;
