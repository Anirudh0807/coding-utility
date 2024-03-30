import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";

function CodeHelper() {
  const [problemName, setProblemName] = useState("");
  const [platform, setPlatrform] = useState("");
  const [algorithm, setAlgorithm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setProblemName(e.target.value);
  };

  const handleInput = (e) => {
    setPlatrform(e.target.value);
  };

  const generateAlgorithmGemini = async () => {
    if (problemName === "") {
      setAlgorithm("Please Enter the problem Name");
      return;
    }
    if (algorithm !== "") {
      setAlgorithm("");
    }
    setLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(
        process.env.REACT_APP_GEMINI_API_KEY
      );

      const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

      const prompt = `You are a competitive coder who has experience in various coding platforms. Give a concise algorithm to solve for the problem ${problemName} from ${platform}. Do not give any explanation or an example or time and space complexity. Do not use any language speific data structures. Only give the algorithm in a maximum of 8 steps, separate each step with a newline character, and include the problem name in the output. The format should be as follows:
    Algorithm:
    Step 1,
    Step 2,
    ans so on.`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      console.log(text);
      setAlgorithm(text);
      setLoading(false);
    } catch (error) {
      setAlgorithm("Error generating algorithm. Please try again later");
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(algorithm);
  };

  return (
    <div className="w-4/5 bg-main flex flex-col items-center justify-center h-screen">
      <div className="text-4xl font-bold">
        Get An Algorithm For The Given Problem
      </div>
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
          className="rounded-full px-5 py-3 shadow-xl ml-5"
        />
      </div>

      <div className="justify-center flex flex-col items-center mt-5">
        <button
          onClick={generateAlgorithmGemini}
          className="rounded-full px-4 py-4 justify-center bg-button shadow-lg hover:bg-blue-400"
        >
          Generate Algorithm
        </button>

        {loading && <p>Generating Algorithm....</p>}
        {algorithm && (
          <div className="flex flex-col gap-4">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors duration-300"
              onClick={copyToClipboard}
            >
              <FaCopy size={20} />
            </button>
            <h2>Generated Algorithm:</h2>
            <textarea
              readOnly
              rows="15"
              cols="100"
              className="px-4 rounded-md bg-white shadow-lg resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {algorithm}
            </textarea>
          </div>
        )}
      </div>
    </div>
  );
}

export default CodeHelper;
