import React from 'react';
import { Link } from 'react-router-dom';

const StartScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-purple-500 text-white">
      <h1 className="text-4xl font-bold mb-8">Welcome to the Mimansa Play!</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link to="/game">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:bg-blue-500 hover:text-white transition duration-300">
            <h2 className="text-xl font-semibold text-black">Play Balloon Pop</h2>
            <p className="text-black">Join the fun and pop as many balloons as you can!</p>
          </div>
        </Link>
        <Link to="/mobile">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:bg-blue-500 hover:text-white transition duration-300">
            <h2 className="text-xl font-semibold text-black">Balloon Pop Mobile Game</h2>
            <p className="text-black">Experience the game on your mobile device!</p>
          </div>
        </Link>
        <Link to="/space">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:bg-blue-500 hover:text-white transition duration-300">
            <h2 className="text-xl font-semibold text-black">Balloon Pop Space</h2>
            <p className="text-black">Test your skills in our space-themed balloon pop!</p>
          </div>
        </Link>
        <Link to="/vosk">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:bg-blue-500 hover:text-white transition duration-300">
            <h2 className="text-xl font-semibold text-black">Balloon Pop Vosk Demo</h2>
            <p className="text-black">Check out our vosk speech recognition demo!</p>
          </div>
        </Link>
        <Link to="/test">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:bg-blue-500 hover:text-white transition duration-300">
            <h2 className="text-xl font-semibold text-black">Test Spacebar</h2>
            <p className="text-black">Explore the testing features of the app!</p>
          </div>
        </Link>
        <Link to="/goostt">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:bg-blue-500 hover:text-white transition duration-300">
            <h2 className="text-xl font-semibold text-black">Google STT</h2>
            <p className="text-black">Explore the testing features of the app!</p>
          </div>
        </Link>
        <Link to="/goosttbase">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:bg-blue-500 hover:text-white transition duration-300">
            <h2 className="text-xl font-semibold text-black">Google STT Base</h2>
            <p className="text-black">Explore the testing features of the app!</p>
          </div>
        </Link>
        <Link to="/spacemobile">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:bg-blue-500 hover:text-white transition duration-300">
            <h2 className="text-xl font-semibold text-black">Ballon Mobile</h2>
            <p className="text-black">Explore the testing features of the app!</p>
          </div>
        </Link>
        <Link to="/spacenew">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:bg-blue-500 hover:text-white transition duration-300">
            <h2 className="text-xl font-semibold text-black">Ballon Space Test</h2>
            <p className="text-black">Explore the testing features of the app!</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default StartScreen;
