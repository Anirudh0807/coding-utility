import React, { useState } from "react";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

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

  const generateAlgorithm = async () => {
    if(problemName===""){
      setAlgorithm("Please Enter the problem Name");
      return;
    }
    if(algorithm!==""){
      setAlgorithm("");
    }
    setLoading(true);
    try {
      const response = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt: `You are a competitive coder who has experience in various coding platforms. Give a concise algorithm to solve for the problem ${problemName} from ${platform}. Do not give any explanation or an example or time and space complexity. Only give the algorithm in a maximum of 8 steps, separate each step with a newline character, and include the problem name in the output. The format should be as follows:
        Algorithm:
        Step 1,
        Step 2,
        ans so on.
        `,
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      setAlgorithm(response.choices[0].text);
      setLoading(false);
    } catch (error) {
      console.error("Error generating algorithm:", error);
    }
  };

  return (
    <div className="w-4/5 bg-main flex flex-col items-center justify-center h-screen">
      <div className="text-4xl font-bold">Get An Algorithm For The Given Problem</div>
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
          onClick={generateAlgorithm}
          className="rounded-full px-4 py-4 justify-center bg-button shadow-lg hover:bg-blue-400">
          Generate Algorithm
        </button>

      {loading && <p>Generating Algorithm....</p>}
      {algorithm && (
        <div className="">
          <h2>Generated Algorithm:</h2>
          <textarea readOnly rows="15" cols="100" className="px-4 rounded-md justify-center resize-none">{algorithm}</textarea>
        </div>
      )}
      </div>
    </div>
  );
}

export default CodeHelper;
