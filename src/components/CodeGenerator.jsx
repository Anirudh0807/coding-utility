import React, { useState } from "react";
import OpenAI from "openai";
import SyntaxHighlighter from "react-syntax-highlighter";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

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

  const generateCode = async () => {
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
      const response = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt: `You are a competitive coder. Give an optimal code for the the problem ${problemName} from ${platform} in ${lang}. Only give the code no need for explanation.`,
        temperature: 1,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      setCode(response.choices[0].text.trimStart());
      setLoading(false);
    } catch (error) {
      console.error("Error generating code:", error);
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
          onClick={generateCode}
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