/* 

### Problem 9: Light/Dark Mode Toggle

**Description:**

- Create a toggle switch to switch between light and dark modes.
- Apply different styles for light and dark modes to the entire application.
- Persist the selected mode in local storage so that it is maintained across page reloads.

 */

import { useEffect, useState } from "react";

const useTheme = (isDark = false) => {
  const [isDarkMode, setIsDarkMode] = useState(
    JSON.parse(localStorage.getItem("isDarkMode")) || isDark
  );
  const theme = isDarkMode ? "dark" : "light";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("isDarkMode", isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return { theme, toggleTheme, isDarkMode, setIsDarkMode };
};

export default useTheme;
