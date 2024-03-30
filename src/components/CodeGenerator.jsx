import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";

function CodeGenerator() {
  const [problemName, setProblemName] = useState("");
  const [platform, setPlatrform] = useState("");
  const [lang, setLang] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setProblemName(e.target.value);
  };

  const handleInput = (e) => {
    setPlatrform(e.target.value);
  };

  const handleLang = (e) => {
    setLang(e.target.value.toLowerCase());
  };

  const generateCodeGemini = async () => {
    if (problemName === "") {
      setCode("Please Enter the problem Name");
      return;
    }
    if (lang === "") {
      setCode("Please Enter Language");
      return;
    }
    if (platform === "") {
      setCode("Please Enter the Platform Name");
      return;
    }
    if (code !== "") {
      setCode("");
    }
    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(
        process.env.REACT_APP_GEMINI_API_KEY
      );

      const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

      const prompt = `You are a competitive coder. Give an optimal code for the the problem ${problemName} from ${platform} in ${lang}. Only give the code no need for explanation.`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      console.log(text);
      setCode(text);
      setLoading(false);
    } catch (error) {
      setCode("Error generating code. Please try again later");
      setLoading(false);
    }
  };

  return (
    <div className="w-4/5 bg-main flex flex-col items-center justify-center h-screen">
      <div className="text-4xl font-bold">Get The Code For A Problem</div>
      <div className="flex justify-center mt-5">
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
          onClick={generateCodeGemini}
          className="rounded-full px-4 py-4 justify-center bg-button shadow-lg hover:bg-blue-400"
        >
          Generate Code
        </button>

        {loading && <p>Generating Code....</p>}
        {code && (
          <div className="">
            <h2>Generated Code:</h2>
            <div className="w-fit h-96 overflow-auto">
              <SyntaxHighlighter language={lang} className="px-4 rounded-md">
                {code}
              </SyntaxHighlighter>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CodeGenerator;
