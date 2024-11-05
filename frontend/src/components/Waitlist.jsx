import React from 'react';
import { useNavigate } from 'react-router-dom';

const Waitlist = ({playAgain}) => { 
  const navigate = useNavigate(); // Create navigate function

  const handleSignUp = () => {
    navigate('/signup'); // Navigate to the signup screen
  };

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="absolute flex justify-center items-center w-full h-screen bg-black bg-opacity-70">
      {/* Inner div styled with Tailwind */}
      <div className="absolute w-[80%] h-[100vw] lg:w-[50vw] lg:h-[40vw] bg-[#FFEBDA] rounded-[5vw] flex flex-col items-center justify-center shadow-xl p-[4vw]">
        
        {/* Header with updated content */}
        <h1 className="text-center mb-[8vw] lg:mt-0 mt-[2vw] lg:mb-[3vw] font-poppins font-bold text-[7vw] lg:text-[3vw]  leading-none text-[#264195]">
          That was fun!
        </h1>

        {/* Home button */}
        <button className="w-[10vw] lg:w-[5vw] absolute right-[1vw] top-[1.5vw] active:scale-75" onClick={goToHome}>
          <img src="/home.png" alt="Home" />
        </button>
        
        {/* Updated instructions */}
        <ul className="w-full tracking-tight text-black list-disc px-[5vw] lg:px-0 mb-[3vw] lg:text-[1.8vw] text-[3.5vw] font-normal" style={{ fontFamily: "'Comic Neue', sans-serif" }}>
          <li className="mb-4">Playful sounds like <span className='font-bold'>'pop'</span> are key building blocks, helping toddlers connect actions to words and <span className='font-bold'>boost their speech skills</span></li>
          <li className="mb-4">We're creating the <span className='font-bold'>best science-based speech games</span> to help kids speak on time. <span className='font-bold'>Join our waitlist for early access to more fun games!</span></li>
        </ul>

        {/* Buttons for "Play Again" and "Sign Up" */}
        <div className="flex  gap-[2vw] lg:gap-[2vw] w-full h-[8vw] lg:h-[4vw]">
          <button 
            onClick={playAgain} 
            className="w-full border-2 border-pink-300 text-pink-300 hover:text-white hover:bg-pink-300 text-[2.5vw] lg:text-[1.5vw] whitespace-nowrap  font-bold py-[1vw] px-[3vw] rounded-lg lg:rounded-xl shadow-md"
            style={{ fontFamily: "'Comic Neue', sans-serif" }}
          >
            Play Again
          </button>
          <button 
            onClick={handleSignUp} 
            className="w-full bg-pink-400 hover:bg-pink-500 text-white text-[2.5vw] lg:text-[1.5vw]  font-bold py-[1vw] whitespace-nowrap px-[3vw] rounded-lg lg:rounded-xl shadow-md"
            style={{ fontFamily: "'Comic Neue', sans-serif" }}
          >
            Signup for early access
          </button>
        </div>
      </div>
    </div>
  );
};

export default Waitlist;
