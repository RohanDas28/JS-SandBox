import React from "react"
import { useState } from "react";
import MonacoEditor from 'react-monaco-editor';



function App() {

  const [code, setCode] = useState('Write your Code!')
  const handleRunCode = () =>{
    try{
      eval(code)
    } catch(error) {
      console.error('Error Running Code!!', error)
    }
  }
  const editorOptions = {
    selectOnLineNumbers: true,
    automaticLayout: true,
  }


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
      <div className="h-screen w-full bg-gray-800 text-white">
        <div className="">

        <MonacoEditor
        width="800"
        height="600"
        language="javascript"
        theme="vs-dark"
        value={code}
        options={editorOptions}
        onChange={(newCode) =>setCode(newCode)}
      />
        <button onClick={handleRunCode} className="bg-gray-400 px-2 py-3 rounded-2xl shadow-lg hover:bg-gray-600 transition-all my-2">RUN ME DADDY</button>

        </div>
      </div>


      <footer class="text-gray-400 bg-gray-900 body-font">
        <div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <a class="flex title-font font-medium items-center md:justify-start justify-center text-white">
            <span class="ml-3 text-xl">RoroCode</span>
          </a>
          <p class="text-sm text-gray-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-4">© 2020 Rohan Das —
            <a href="https://twitter.com/knyttneve" class="text-gray-500 ml-1" target="_blank" rel="noopener noreferrer">@RohanDas28</a>
          </p>
        </div>
      </footer>

    </>
  )
}

export default App
