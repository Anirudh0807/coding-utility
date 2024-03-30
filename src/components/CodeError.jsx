import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { useState } from "react";

function CodeError() {
  const [problemName, setProblemName] = useState("");
  const [platform, setPlatrform] = useState("");
  const [lang, setLang] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setProblemName(e.target.value);
  };

  const handleInput = (e) => {
    setPlatrform(e.target.value);
  };

  const handleLang = (e) => {
    setLang(e.target.value);
  };

  const handleCode = (e) => {
    setCode(e.target.value);
  };

  const generateErrorGemini = async () => {
    if (problemName === "") {
      setError("Please Enter the problem Name");
      return;
    }
    if (lang === "") {
      setError("Please Enter Language");
      return;
    }
    if (code === "") {
      setError("Please Enter the code");
    }
    if (platform === "") {
      setError("Please Enter the Platform Name");
      return;
    }

    if (error !== "") {
      setError("");
    }
    setLoading(true);
    
    try {
      const genAI = new GoogleGenerativeAI(
        process.env.REACT_APP_GEMINI_API_KEY
      );

      const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

      const prompt = `Examine the ${lang} code for the ${problemName} problem on ${platform}. If you identify any errors in the code, provide guidance on resolving them without changing the core logic. If the code is error-free, simply state that it should work correctly and give some suggestions to improve the efficiency of the code. Code: ${code}`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      console.log(text);
      setError(text);
      setLoading(false);
    } catch (error) {
      setError("Error generating code. Please try again later");
      setLoading(false);
    }
  };

  return (
    <div className="w-4/5 bg-main flex flex-col items-center justify-center h-screen">
      <div className="text-4xl font-bold">
        Get The Errors For The Given Code
      </div>
      <div className="flex justify-center mt-5">
        <input
          type="text"
          placeholder="Enter the code"
          value={code}
          onChange={handleCode}
          className="rounded-full px-5 py-3 shadow-xl mr-5"
        />
        <input
          type="text"
          placeholder="Enter the problem name"
          value={problemName}
          onChange={handleInputChange}
          className="rounded-full px-5 py-3 shadow-xl mr-5"
        />
        <input
          type="text"
          placeholder="Enter the platform name"
          value={platform}
          onChange={handleInput}
          className="rounded-full px-5 py-3 shadow-xl ml-5 mr-5"
        />
        <input
          type="text"
          placeholder="Enter the Language"
          value={lang}
          onChange={handleLang}
          className="rounded-full px-5 py-3 shadow-xl ml-5"
        />
      </div>

      <div className="justify-center flex flex-col items-center mt-5">
        <button
          onClick={generateErrorGemini}
          className="rounded-full px-4 py-4 justify-center bg-button shadow-lg hover:bg-blue-400"
        >
          Check for Errors
        </button>

        {loading && <p>Checking for errors....</p>}
        {error && (
          <div className="">
            <h2>Generated Errors:</h2>
            <textarea
              readOnly
              rows="15"
              cols="100"
              className="px-4 rounded-md justify-center resize-none"
            >
              {error}
            </textarea>
          </div>
        )}
      </div>
    </div>
  );
}

export default CodeError;
