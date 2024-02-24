import React, { useState, useEffect } from "react";
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    const originalConsoleLog = console.log;
    console.log = (...args) => {
      setResult(prevResult => prevResult + args.map(arg => (arg !== undefined ? arg : 'undefined')).join(' ') + '\n');
      originalConsoleLog.apply(console, args);
    };

    return () => {
      console.log = originalConsoleLog;
    };
  }, []);

  const handleRunCode = () => {
    try {
      setResult('');
      let consoleLogOutput = '';
      const originalConsoleLog = console.log;
      console.log = (...args) => {
        consoleLogOutput += args.map(arg => (arg !== undefined ? arg : 'undefined')).join(' ') + '\n';
        originalConsoleLog.apply(console, args);
      };

      const output = eval(code);

      console.log = originalConsoleLog;
      setResult(consoleLogOutput);

      if (output !== undefined) {
        setResult(prevResult => prevResult + 'Result: ' + output + '\n');
      }
    } catch (error) {
      console.error('Error Running Code!!', error);
      setResult(prevResult => prevResult + `Error: ${error.message}\n`);
    }
  };

  const editorOptions = {
    selectOnLineNumbers: true,
    automaticLayout: true,
    fontSize: 18,
    minimap: {
      enabled: false,
    },
    wordWrap: true
  };

  return (
    <>
      <Header />

      <div className="flex flex-col md:flex-row h-full bg-gray-800 text-white">
        {/* The MonacoEditor component */}
        <div className="md:w-2/3 w-full">
          <div className="py-6 px-4 flex flex-col gap-4">
            <Editor height="600px" defaultLanguage="javascript" options={editorOptions} theme="vs-dark" value={code} onChange={(newCode) => setCode(newCode)} defaultValue="// Write your JavaScript Code Here" />
            <button onClick={handleRunCode} className="bg-yellow-400 px-2 py-3 text-black font-semibold rounded-2xl shadow-lg hover:bg-yellow-500 transition-all my-2">&lt;RUN!/&gt;</button>
          </div>
        </div>
        {/* Output Segment  */}
        <div className="md:w-1/3 w-full py-6 text-wrap">
          <div className="result font-semibold ">
            <h2 className="text-4xl md:border-b-4">Output</h2>
            <pre className="my-2 text-xl overflow-auto text-wrap">{result}</pre>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default App;
