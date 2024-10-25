import React, { useState, useEffect } from "react"; // Import React, useState, and useEffect hooks
import { ToastContainer, toast } from "react-toastify"; // Import Toastify for notifications
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import { sendEmail, storeEmail } from "../utils/emailUtils"; // Import utility functions for email handling
import AOS from 'aos'; // Import AOS for animations
import 'aos/dist/aos.css'; // Import AOS styles

const DontMissSection = () => {
  const [email, setEmail] = useState(""); // State for the email input
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [signupMessage, setSignupMessage] = useState(""); // State for signup messages

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex to validate email format
    return regex.test(email); // Return true if email is valid
  };

  // Function to handle signup logic
  const handleSignUp = async () => {
    // Check if email is valid
    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email."); // Show error toast for invalid email
      return;
    }

    setLoading(true); // Set loading to true

    try {
      // await sendEmail(email); // Send email (if needed)
      await storeEmail(email); // Store email in Firestore
      setSignupMessage("Thanks for signing up! Exciting things are coming your way soon.");
      setEmail(""); // Clear the email input field
      toast.success("Thank you for signing up!"); // Show success toast
    } catch (error) {
      toast.error(error.message); // Show error toast if there's an issue
    } finally {
      setLoading(false); // Set loading to false after operation
    }
  };

  // Initialize AOS animations when the component mounts
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
    });
  }, []);

  return (
    <div className="bg-[#F9E4E4] min-h-[576px] flex flex-col lg:flex-row items-center py-10 px-4">
      <div className="flex flex-col justify-center items-center w-full lg:w-[50%] mt-[4vw] lg:mt-0">
        {/* Text Section */}
        <div className="px-6 lg:px-12 lg:ml-16 mb-10 text-left" data-aos="fade-up">
          <h2 className="font-comic-neue font-bold text-[7vw] lg:text-[2.2vw] leading-tight lg:leading-[2.8vw] text-black mb-3">
            Don’t Miss Out on Giving Your Child the Best
          </h2>
          <p className="font-comic-neue text-[5vw] lg:text-[1.3vw] text-black mb-6">
            Be among the first to experience our AI-powered speech-learning app for children.
          </p>
        </div>

        {/* Input & Button */}
        <div className="flex flex-col lg:flex-row w-full px-6 lg:px-12 lg:ml-[7.5rem] lg:mt-[-1.5vw] mt-[-10vw] lg:items-center space-y-4 lg:space-y-0">
          <input
            type="email"
            value={email} // Set email input value
            onChange={(e) => setEmail(e.target.value)} // Update email state
            placeholder="Enter your email to unlock the early access"
            className="w-full lg:mb-0 mb-[-2vw] lg:max-w-md p-4 lg:rounded-s-xl lg:rounded-e-none rounded-xl border-2 border-[#DBCDF0] focus:outline-none focus:border-purple-500"
          />
          {signupMessage ? (
            <h3 className="font-light text-[2.5vw] lg:hidden w-full flex items-start text-left">
              {signupMessage}
            </h3>
          ) : (
            <h3 className="font-light text-[2.5vw] lg:hidden w-full flex items-start text-left">
              <span className="text-red-700">*</span>
              We’ll only send what’s worth opening – no spam, guaranteed!
            </h3>
          )}
          <button
            onClick={handleSignUp} // Handle signup click
            className={`w-full lg:w-[10vw] whitespace-nowrap bg-[#DBCDF0] border-2 border-[#DBCDF0] active:scale-95 lg:px-[1.5vw] lg:py-[1vw] px-[3vw] py-[2.5vw] rounded-xl lg:rounded-s-none lg:rounded-e-xl text-black font-semibold ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`} // Disable button while loading
            disabled={loading} // Disable button while loading
          >
            {loading ? "Loading..." : "Sign me up!"} {/* Change button text based on loading state */}
          </button>
        </div>

        {signupMessage ? (
          <h3 className="mt-[0.5rem] hidden font-light text-[3vw] lg:text-[0.9vw] w-full lg:flex items-start px-6 lg:px-28 text-center lg:text-left">
            {signupMessage}
          </h3>
        ) : (
          <h3 className="mt-[0.5rem] font-light text-[3vw] lg:text-[0.9vw] w-full lg:flex hidden items-start px-6 lg:px-28 text-center lg:text-left">
            <span className="text-red-700">*</span>
            We’ll only send what’s worth opening – no spam, guaranteed!
          </h3>
        )}
      </div>

      {/* Image Section */}
      <div className="w-full block lg:w-[50%] mt-10 lg:mt-0" data-aos="fade-left">
        <img
          src="/phoneimage.png"
          alt="Two phones displaying the app"
          className="w-full lg:w-full mx-auto"
        />
      </div>

      {/* Toast Container */}
      <ToastContainer containerId={1} />
    </div>
  );
};

export default DontMissSection;
