import React from 'react'

const Footer = () => {
    return (
        <footer className="text-gray-400 bg-gray-900 body-font">
            <div className="container px-2 py-3 mx-auto flex items-center justify-center">
                <span className="flex title-font font-medium items-center justify-center text-white flex-col">
                    <span className="text-2xl">&lt;<span className="text-yellow-400">JS</span>Sandbox/&gt;</span>
                    <span className="text-2xl text-gray-400 sm:ml-4 sm:py-2 sm:mt-0 mt-4">
                        Created with ❤️ by <a href="https://rohandas28.github.io" className="text-yellow-500" target="_blank" rel="noopener noreferrer">Rohan Das</a>
                    </span>
                </span>
            </div>
        </footer>
    )
}

export default Footer