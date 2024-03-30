import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const activeStyle = {
    background: "linear-gradient(to right, #ff416c, #ff4b2b)",
    color: "#fff",
    transition: "all 0.3s ease",
  };

  const inactiveStyle = {
    background: "#f2f2f2",
    color: "#333",
    transition: "all 0.3s ease",
  };

  return (
    <div className="w-1/5 h-screen bg-gray-100">
      <div className="my-8">
        <h1 className="text-2xl font-bold text-center text-gray-700 uppercase tracking-wide relative pb-2">
          Coding Utility
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-red-500 to-orange-500"></div>
        </h1>
      </div>

      <ul className="flex flex-col gap-10 justify-center items-center text-center">
        <NavLink
          to="/"
          className="w-fit h-fit rounded-lg"
          style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
        >
          <li className="w-40 rounded-md px-6 py-3 shadow-lg text-start">Get Algorithm</li>
        </NavLink>
        <NavLink
          to="/code-generator"
          className="w-fit h-fit rounded-lg"
          style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
        >
          <li className="w-40 rounded-md px-6 py-3 shadow-lg text-start">Get Code</li>
        </NavLink>
        <NavLink
          to="/code-error"
          className="w-fit h-fit rounded-lg"
          style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
        >
          <li className="w-40 rounded-md px-6 py-3 shadow-lg text-start">Get Errors</li>
        </NavLink>
        <NavLink
          to="/code-explain"
          className="w-fit h-fit rounded-lg"
          style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
        >
          <li className="w-40 rounded-md px-6 py-3 shadow-lg text-start">
            Get Explanation
          </li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Sidebar;
