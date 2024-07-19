import React from "react";
import { NavLink } from "react-router-dom";
import { defaultTabs } from "../Data";

const Tabs = ({ tabs = defaultTabs }) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          marginBottom: "1rem",
        }}
      >
        {tabs.map((tab, id) => (
          <NavLink
            key={id}
            to={`/${tab.name.replace(" ", "-").toLocaleLowerCase()}`}
            style={({ isActive }) => ({
              backgroundColor: `${isActive ? "black" : "white"}`,
              color: `${isActive ? "white" : "black"}`,
            })}
          >
            {tab.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
