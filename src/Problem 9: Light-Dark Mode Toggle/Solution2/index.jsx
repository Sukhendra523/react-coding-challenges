import React from "react";
import "./styles.css";
import useTheme from "./useTheme";

const ToggleTheme2 = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div>
      <header
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {" "}
        <h1> Header </h1>
        <button
          onClick={toggleTheme}
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
      </header>
      <main>
        <h1>Heading Light Dark</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus
          praesentium perspiciatis, esse, quis voluptatum repellendus, vitae
          expedita hic optio deserunt tempora aspernatur corporis iusto libero
          nam quisquam minus. Quo, eveniet?
        </p>
      </main>
      <footer style={{ textAlign: "center" }}>
        {" "}
        <h1> Footer </h1>{" "}
      </footer>
    </div>
  );
};

export default ToggleTheme2;
