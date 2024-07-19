/* 

### Problem 9: Light/Dark Mode Toggle

**Description:**

- Create a toggle switch to switch between light and dark modes.
- Apply different styles for light and dark modes to the entire application.
- Persist the selected mode in local storage so that it is maintained across page reloads.

 */

import React, { useEffect, useState } from "react";

const SwitchTheme = ({ isDark = false }) => {
  const [isDarkMode, setIsDarkMode] = useState(
    JSON.parse(localStorage.getItem("isDarkMode")) || isDark
  );

  useEffect(() => {
    const theme = isDarkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("isDarkMode", isDarkMode);
  }, [isDarkMode]);

  return (
    <button
      onClick={() => {
        setIsDarkMode(!isDarkMode);
      }}
      style={{
        color: isDarkMode ? "black" : "white",
        backgroundColor: isDarkMode ? "white" : "black",
        width: "50px",
        height: "50px",
        borderRadius: "10px",
      }}
    >
      {isDarkMode ? "Light" : "Dark"}
    </button>
  );
};

export default SwitchTheme;
