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
    <div className="absolute flex justify-center items-center w-full h-screen">
      {/* Inner div styled with Tailwind */}
      <div className="absolute w-[50vw] h-[40vw] bg-[#FFEBDA] rounded-[5vw] flex flex-col items-center justify-center shadow-xl p-[4vw]">
        
        {/* Header with updated content */}
        <h1 className="text-center mb-[3vw] font-poppins font-bold text-[5vw] md:text-[4vw] leading-none text-[#264195]">
          That was fun!
        </h1>

        {/* Home button */}
        <button className="w-[5vw] absolute right-[1vw] top-[1.5vw] active:scale-75" onClick={goToHome}>
          <img src="/home.png" alt="Home" />
        </button>
        
        {/* Updated instructions */}
        <ul className="w-full text-black list-disc list-inside mb-[3vw] text-[2vw] md:text-[1.5vw] font-bold" style={{ fontFamily: "'Comic Neue', sans-serif" }}>
          <li className="mb-4">Simple sounds like <span className="font-bold text-pink-600">POP</span> are building blocks for toddlers, helping them connect actions to words and strengthening their speech skills, one joyful sound at a time.</li>
          <li className="mb-4">We are building the best games based on the science of speech to help our children speak on time. Join our waitlist now for early access to many more such fun games!</li>
        </ul>

        {/* Buttons for "Play Again" and "Sign Up" */}
        <div className="flex flex-col md:flex-row gap-[5vw] w-full h-[4vw]">
          <button 
            onClick={playAgain} 
            className="w-full border-2 border-pink-300 text-pink-300 hover:text-white hover:bg-pink-300 text-[2vw] md:text-[1.5vw] font-bold py-[1vw] px-[3vw] rounded-xl shadow-md"
            style={{ fontFamily: "'Comic Neue', sans-serif" }}
          >
            Play Again
          </button>
          <button 
            onClick={handleSignUp} 
            className="w-full bg-pink-400 hover:bg-pink-500 text-white text-[2vw] md:text-[1.5vw] font-bold py-[1vw] whitespace-nowrap px-[3vw] rounded-xl shadow-md"
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
