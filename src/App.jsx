import React, { useState, useEffect } from "react";
import MonacoEditor from 'react-monaco-editor';

function App() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState('');
  const currentYear = new Date().getFullYear();

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
    fontSize: 24,
    minimap: {
      enabled: false,
    },
  };

  return (
    <>
      <header className="text-gray-400 bg-gray-900 body-font">
        <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center justify-center">
          <a className="flex title-font font-medium items-center text-white md:mb-0">
            <span className="text-2xl">&lt;<span className="text-yellow-400">JS</span>Sandbox/&gt;</span>
          </a>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <a target="_blank" href="https://github.com/RohanDas28/CodeSandBox">
              <button className="inline-flex items-center bg-yellow-400 border-0 py-2 px-4 focus:outline-none font-semibold text-xl hover:bg-yellow-500 rounded-full text-black text-base mt-2 md:mt-0">
                Github
                <span className="ml-2"> {/* Add some space between text and icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                </span>
              </button>
            </a>
          </nav>
        </div>
      </header>
      <div className="flex flex-col md:flex-row h-full bg-gray-800 text-white">
        <div className="md:w-2/3 w-full">
          <div className="py-6 px-4 flex flex-col gap-4">
            {/* The MonacoEditor component */}
            <MonacoEditor
              height={600}
              language="javascript"
              theme="vs-dark"
              value={code}
              options={editorOptions}
              onChange={(newCode) => setCode(newCode)}
            />
            <button onClick={handleRunCode} className="bg-yellow-400 px-2 py-3 text-black font-semibold rounded-2xl shadow-lg hover:bg-yellow-500 transition-all my-2">RUN!</button>
          </div>
        </div>
        <div className="md:w-1/3 w-full py-6">
          <div className="result font-semibold ">
            <h2 className="text-4xl md:border-b-4">Output</h2>
            <pre className="my-2 text-xl">{result}</pre>
          </div>
        </div>
      </div>
      <footer className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-2 py-3 mx-auto flex items-center justify-center">
          <span className="flex title-font font-medium items-center justify-center text-white flex-col">
            <span className="text-2xl">&lt;<span className="text-yellow-400">JS</span>Sandbox/&gt;</span>
            <span className="text-2xl text-gray-400 sm:ml-4 sm:py-2 sm:mt-0 mt-4">
              Created with ❤️ by <a href="https://rohandas.github.io" className="text-yellow-500" target="_blank" rel="noopener noreferrer">Rohan Das</a>
            </span>
          </span>
        </div>
      </footer>


    </>
  );
}

export default App;
