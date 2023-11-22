import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import CodeError from "./components/CodeError";
import CodeExplain from "./components/CodeExplain";
import CodeGenerator from "./components/CodeGenerator";
import CodeHelper from "./components/CodeHelper";
import Sidebar from "./components/Sidebar";
function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <Routes>
          <Route path="/" element={<CodeHelper />} />
          <Route path="/code-error" element={<CodeError />} />
          <Route path="/code-explain" element={<CodeExplain />} />
          <Route path="/code-generator" element={<CodeGenerator />} />
          <Route path="/code-helper" element={<CodeHelper />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
