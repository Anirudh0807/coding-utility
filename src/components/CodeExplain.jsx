import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { useState } from "react";

function CodeExplain({ value }) {
  const [lang, setLang] = useState("");
  const [code, setCode] = useState("");
  const [ans, setAns] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLang = (e) => {
    setLang(e.target.value);
  };

  const handleCode = (e) => {
    setCode(e.target.value);
  };

  const generateExplainGemini = async () => {
    if (lang === "") {
      setAns("Please Enter Language");
      return;
    }
    if (code === "") {
      setAns("Please Enter the code");
    }

    if (ans !== "") {
      setAns("");
    }
    setLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(
        process.env.REACT_APP_GEMINI_API_KEY
      );

      const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

      const prompt = `Please provide an explanation for the code ${code} written in ${lang}. Break down the code into simple steps and simplify any complex processes. Summarize the code's functionality and list the key points of the explanation.`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      console.log(text);
      setAns(text);
      setLoading(false);
    } catch (error) {
      setAns("Error generating Response. Please Try again Later");
      setLoading(false);
    }
  };

  return (
    <div className="w-4/5 bg-main flex flex-col items-center justify-center h-screen">
      <div className="text-4xl font-bold">
        Get The Explanation For The Given Code
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
          placeholder="Enter the Language"
          value={lang}
          onChange={handleLang}
          className="rounded-full px-5 py-3 shadow-xl ml-5"
        />
      </div>

      <div className="justify-center flex flex-col items-center mt-5">
        <button
          onClick={generateExplainGemini}
          className="rounded-full px-4 py-4 justify-center bg-button shadow-lg hover:bg-blue-400"
        >
          Explain
        </button>

        {loading && <p>Generating Explanation....</p>}
        {ans && (
          <div className="">
            <h2>Generated Explanation:</h2>
            <textarea
              readOnly
              rows="15"
              cols="100"
              className="px-4 rounded-md justify-center resize-none"
            >
              {ans}
            </textarea>
          </div>
        )}
      </div>
    </div>
  );
}

export default CodeExplain;
