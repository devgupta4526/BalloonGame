import React from "react";
import buttonImage from "/imagebg.png"; // Image to be used as Play Now button

const BalloonStartScreen = ({ startGame }) => {
  return (
    <div className="absolute  z-[10]    inset-0 flex justify-center items-center w-full h-screen bg-black bg-opacity-20">
      {/* Inner div styled with Tailwind */}
      <div className=" w-[80%] h-[100vw] lg:w-[50vw] lg:h-[40vw]  bg-[#FFEBDA] rounded-[5vw] flex flex-col items-center justify-center shadow-xl p-[4vw] ">
         {/* Header with updated content */}
         <h1 className="text-center mb-[3vw] font-poppins font-bold text-[9vw] lg:text-[5vw]  leading-none text-[#264195]">
          How to Play
        </h1>

         {/* Updated instructions */}
      
      <ul className="w-full  flex flex-col justify-center  text-black list-decimal px-[5vw]  lg:px-0 mb-[3vw] lg:text-[2vw] text-[3.5vw] font-bold" style={{ fontFamily: "'Comic Neue', sans-serif" }}>
          <li className="mb-4">Press and hold the spacebar <br/>
         <span className="text-blue-400">(mic gets activated)</span></li>
          <li className="mb-4">Say Pop Pop.</li>
          <li className="mb-4">Enjoy the balloon go pop</li>
          <li className="mb-4">Press the spacebar and repeat</li>
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
