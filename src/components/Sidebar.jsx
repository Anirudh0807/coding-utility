import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-1/5 h-screen bg-sidebar">
      <ul className="flex flex-col justify-center items-center text-center">
        <Link to="/code-helper" className="w-full h-full">
          <li className="mt-8 w-40 rounded-md px-6 py-3 shadow-xl bg-button">
            Get Algorithm
          </li>
        </Link>

        <Link to="/code-generator" className="w-full h-full">
          <li className="mt-8 w-40 rounded-md px-6 py-3 shadow-xl bg-button">
            Get Code
          </li>
        </Link>
        <Link to="/code-error" className="w-full h-full">
          <li className="mt-8 w-40 rounded-md px-6 py-3 shadow-xl bg-button">
            Get Errors
          </li>
        </Link>

        <Link to="/code-explain" className="w-full h-full">
          <li className="mt-8 w-40 rounded-md px-6 py-3 shadow-xl bg-button">
            Get Explanation
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
