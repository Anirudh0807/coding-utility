import React, { useState } from "react";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

function CodeExplain({value}) {
  const [lang, setLang] = useState("");
  const [code, setCode] = useState("");
  const [ans, setAns] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLang = (e) => {
    setLang(e.target.value);
  };

  const handleCode = (e) => {
    setCode(e.target.value);
  }

  const generateExplain = async () => {
    if (lang === "") {
      setAns("Please Enter Language");
      return;
    }
    if (code === "") {
      setAns("Please Enter the code");
    }

    if (ans != "") {
      setAns("");
    }
    setLoading(true);

    try {
      const response = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt: `Please provide an explanation for the code ${code} written in ${lang}. Break down the code into simple steps and simplify any complex processes. Summarize the code's functionality and list the key points of the explanation.`,
        temperature: 1,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      setAns(response.choices[0].text.trimStart());
      setLoading(false);
    } catch (error) {
      console.error("Error generating code:", error);
    }
  };

  return (
    <div className="w-4/5 bg-main flex flex-col items-center justify-center h-screen">
      <div className="text-4xl font-bold">Get The Explanation For The Given Code</div>
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
          onClick={generateExplain}
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
