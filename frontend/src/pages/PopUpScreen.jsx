import React, { useState } from 'react';
import emailjs from '@emailjs/browser'; // Import EmailJS
import { toast } from 'react-toastify'; // Import Toastify
import { sendEmail, storeEmail } from "../utils/emailUtils"; // Import the utility functions

const PopUpScreen = ({ closePopup }) => {
  const [email, setEmail] = useState(''); // State for the email input
  const [loading, setLoading] = useState(false); // State for loading
  const [signupMessage, setSignupMessage] = useState(""); // State for signup message

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

  const handleSignUp = async () => {
     // Check if email is valid
     if (!isValidEmail(email)) {
      toast.error("Please enter a valid email."); // Show error toast
      return;
  }

  setLoading(true); // Set loading to true

    try {
        // await sendEmail(email); // Send email
        await storeEmail(email); // Store email in Firestore
        setSignupMessage("Thanks for signing up! Exciting things are coming your way soon.");
        setEmail("");
        toast.success("Thank you for signing up!");
    } catch (error) {
        toast.error(error.message); // Show the error message
    } finally {
        setLoading(false);
    }
};

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
      <div className='relative w-[90%] max-w-[80%] lg:max-w-[60%] h-[40%] lg:h-[70%] bg-white border-2 border-gray-300 shadow-2xl flex flex-col rounded-3xl justify-center items-center p-4'>
        {/* Giraffe image */}
        <img 
          src="/ziraffe.png" 
          alt="Giraffe" 
          className="absolute bottom-[-1.5vw] left-[-5vw] w-[12vw] h-auto" 
        />

        {/* Title */}
        <h1 className="text-[4vw] md:text-[3vw] font-bold text-center text-[#707ACF]">
          Sign up for early access
        </h1>
        <div className='absolute active:scale-75 flex justify-center items-center top-0 right-0 bg-red-500   w-[6vw] h-[6vw] rounded-tr-[1vw] rounded-bl-[1vw]' onClick={closePopup}>
          <img src="/cross.png" alt="close" className='w-[3vw]' />
        </div>

        {/* Input & Button */}
        <div className="flex w-full justify-center items-center mt-[2vw]">
          <input
            type="email"
            value={email} // Set email input value
            onChange={(e) => setEmail(e.target.value)} // Update email state
            placeholder="Enter your email to unlock the early access"
            className="w-full lg:h-[5vw] lg:max-w-[28vw] p-[1vw] text-[1.2vw] rounded-s-xl border-2 border-[#DBCDF0] focus:outline-none focus:border-purple-500"
          />
          <button
            onClick={handleSignUp} // Handle signup click
            className={`w-[10vw] h-[5vw] text-[1vw] active:scale-95 bg-[#DBCDF0] px-[1.5vw] py-[1vw] rounded-e-xl text-black font-semibold ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} // Disable button while loading
            disabled={loading} // Disable button while loading
          >
            {loading ? "Loading..." : "Sign me up!"} {/* Change button text based on loading */}
          </button>
        </div>

        {/* Disclaimer */}
        {signupMessage && (<h3 className="w-fit flex justify-start mx-8 items-start mt-[1vw] font-light text-[0.9vw] text-center">
          <span className="text-red-700">*</span> {signupMessage}
        </h3>)}
        {!signupMessage && (<h3 className="w-fit flex justify-start mx-8 items-start mt-[1vw] font-light text-[0.9vw] text-center">
          <span className="text-red-700">*</span> We’ll only send what’s worth opening – no spam, guaranteed!
        </h3>)}

        {/* Decorative balloons */}
        <div className="absolute bottom-0 right-[2vw]">
          <img src="/balloon1.png" alt="Balloons" className="w-[6vw] md:w-[4vw]" />
        </div>
        <div className="absolute bottom-0 right-[6vw]">
          <img src="/balloon4.png" alt="Balloons" className="w-[5vw] md:w-[3.5vw]" />
        </div>
      </div>
    </div>
  );
}

export default PopUpScreen;
