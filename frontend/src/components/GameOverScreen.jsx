import React from 'react';
import playagain from '/playagain.png';
import exit from '/exit.png';

const GameOverScreen = ({ onPlayAgain, onExit }) => {
 
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex">
        {/* Example of giving the image size using Tailwind CSS */}
        <img
          className="w-96 h-96 object-fit"
          src="./Hurray.png"
          alt="Hurray"
        />
      </div>
      <div className="flex gap-4 mt-12">
        {/* Play Again Image Button */}
        <img
          onClick={onPlayAgain}
          src={playagain}
          alt="Play Again"
          className="h-16 cursor-pointer hover:scale-105 transition-transform duration-300"
        />

        {/* Exit Image Button */}
        <img
          onClick={onExit}
          src={exit}
          alt="Exit"
          className="h-16 cursor-pointer hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>
  );
};

export default GameOverScreen;
