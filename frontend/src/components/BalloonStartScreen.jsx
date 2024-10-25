import React from "react";
import buttonImage from "/imagebg.png"; // Image to be used as Play Now button

const BalloonStartScreen = ({ startGame }) => {
  return (
    <div className="absolute inset-0 flex justify-center items-center w-full h-screen">
      {/* Inner div styled with Tailwind */}
      <div className="max-w-lg w-full h-auto bg-[#FFEBDA] rounded-[20px] mx-auto flex flex-col items-center justify-center shadow-xl p-5 md:p-10">
        {/* Header with specified styles */}
        <h1 className="mb-6 font-poppins font-bold text-[32px] leading-[40px] text-[#264195] text-center">
          How to Play
        </h1>

        {/* Instructions */}
        <ul
          className="w-full text-black list-disc list-inside mb-6 font-bold text-xl"
          style={{ fontFamily: "'Comic Neue', sans-serif" }}
        >
          <li className="mb-2">
            Every time you say{" "}
            <span className="font-bold text-pink-600">POP</span>, one balloon on
            the screen will burst.
          </li>
          <li className="mb-2">
            Get your kid to say{" "}
            <span className="font-bold text-pink-600">POP</span> with you and
            try to burst as many balloons as possible.
          </li>
        </ul>

        {/* Play Now Button (using image) */}
        <div
          className="relative cursor-pointer active:scale-75"
          onClick={startGame}
        >
          <img
            src={buttonImage}
            alt="Play Now"
            className="w-[250px] h-[80px] object-contain" // Adjust size for responsiveness
          />
          <span
            className="absolute inset-0 flex justify-center items-center text-2xl text-white font-bold"
            style={{ fontFamily: "'Comic Neue', sans-serif" }}
          >
            Play Now
          </span>
        </div>
      </div>
    </div>
  );
};

export default BalloonStartScreen;
