import React, { useState, useEffect } from "react";
import MonacoEditor from 'react-monaco-editor';

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
  };

  return (
    <>
      <header className="text-gray-400 bg-gray-900 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
            <span className="ml-3 text-xl">Roro Code</span>
          </a>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <button className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">Github
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </nav>
        </div>
      </header>
      <div className="h-[90vh] w-full bg-gray-800 text-white">
        <div className="py-6 px-4 flex flex-col gap-4">
          <MonacoEditor
            height={600}
            language="javascript"
            theme="vs-dark"
            value={code}
            options={editorOptions}
            onChange={(newCode) => setCode(newCode)}
          />
          <button onClick={handleRunCode} className="bg-yellow-400 px-2 py-3 text-black font-semibold rounded-2xl shadow-lg hover:bg-yellow-500 transition-all my-2">RUN ME DADDY</button>
          <div className="resul font-semibold">
            <h2>Result is:</h2>
            <pre>{result}</pre>
          </div>
        </div>
      </div>
      <footer className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-white">
            <span className="ml-3 text-xl">RoroCode</span>
          </a>
          <p className="text-sm text-gray-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-4">© 2020 Rohan Das —
            <a href="https://twitter.com/knyttneve" className="text-gray-500 ml-1" target="_blank" rel="noopener noreferrer">@RohanDas28</a>
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
