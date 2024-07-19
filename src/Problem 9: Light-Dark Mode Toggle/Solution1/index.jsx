import React from "react";
import SwitchTheme from "./SwitchTheme";
import "./styles.css";

const ToggleTheme1 = () => {
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
        <SwitchTheme />
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

export default ToggleTheme1;
