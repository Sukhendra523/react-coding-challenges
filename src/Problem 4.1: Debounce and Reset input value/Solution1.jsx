import React, { useRef, useState } from "react";

const DebounceInputAndReset1 = () => {
  const [inputValue, setInputValue] = useState("");
  const [displayValue, setDisplayValue] = useState("");
  const debounceTimeout = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      setDisplayValue(value);
      setInputValue("");
    }, 4000);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Type something..."
      />
      <p>{displayValue}</p>
    </div>
  );
};

export default DebounceInputAndReset1;
