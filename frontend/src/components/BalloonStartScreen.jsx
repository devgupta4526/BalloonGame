import React from "react";
import buttonImage from "/imagebg.png"; // Image to be used as Play Now button

const BalloonStartScreen = ({ startGame }) => {
  return (
    <div className="absolute  z-[10]    inset-0 flex justify-center items-center w-full h-screen bg-black bg-opacity-70">
      {/* Inner div styled with Tailwind */}
      <div className=" w-[80%] h-[100vw] lg:w-[50vw]  lg:h-[35vw]  bg-[#FFEBDA] rounded-[5vw] flex flex-col items-center justify-center shadow-xl p-[4vw] ">
         {/* Header with updated content */}
         <h1 className="text-center mb-[10vw] lg:mt-[2vw] mt-[5vw] lg:mb-[3vw] font-poppins font-bold text-[9vw] lg:text-[3vw]  leading-none text-[#264195]">
          How to Play
        </h1>

         {/* Updated instructions */}
      
      <ul className="w-full text-left tracking-wider whitespace-nowrap  flex flex-col justify-center  text-black  px-[3vw]  lg:px-0 mb-[2vw] lg:mb-[0vw] lg:text-[2vw] text-[4vw] font-normal lg:font-normal" style={{ fontFamily: "'Comic Neue', sans-serif" }}>
          <li className="mb-[1vw] lg:mb-[0.4vw] px-[2.5vw]">1. Press and hold the <span className="font-bold">spacebar</span>  <br/>
         <span className="text-[#264195] px-[2.5vw]">(mic gets activated)</span></li>
          <li className="mb-[1vw] lg:mb-[0.4vw] px-[2.5vw]">2. Say <span className="font-bold">Pop Pop...</span> </li>
          <li className="mb-[1vw] lg:mb-[0.4vw] px-[2.5vw]">3. Enjoy the balloon go pop</li>
          <li className="mb-[1vw] lg:mb-[0.4vw] px-[2.5vw]">4. Press the <span className="font-bold">spacebar</span>  and repeat</li>
        </ul>
     

       

        {/* Play Now Button (using image) */}
        <div
          className="relative  cursor-pointer active:scale-75"
          onClick={startGame}
        >
          <img
            src={buttonImage}
            alt="Play Now"
            className="lg:w-[18vw] lg:h-[10vw] w-[50vw] h-[30vw] object-contain" // Adjust size for responsiveness
          />
          <span
            className="absolute  text-[#264195] inset-0 flex justify-center items-center text-[5vw] lg:text-[2vw]  font-bold"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Play Now
          </span>
        </div>
      </div>
    </div>
  );
};

export default BalloonStartScreen;
