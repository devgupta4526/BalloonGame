import React, { useEffect } from "react"; // Importing React and useEffect hook from React
import AOS from 'aos'; // Importing AOS for animations
import 'aos/dist/aos.css'; // Importing AOS CSS for styling animations

const ScienceSection = ({ openPopup }) => {
  // Initialize AOS animations when the component mounts
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
    });
  }, []);

  return (
    <div className="bg-[rgba(250,237,203,1)] flex flex-col justify-center items-center px-4 md:px-8">
      {/* Header Section */}
      <div className="text-center mb-[3vw] mt-[22vw] lg:mb-12 lg:mt-[5.5vw]">
        <h2 className="font-comic-neue text-[6vw] md:text-[2.5vw] leading-[9vw] md:leading-[2vw] font-bold text-black mb-3" data-aos="fade-up">
          The Science Behind Us
        </h2>
        <p className="font-comic-neue text-[3vw] md:text-[1.3vw] leading-[6vw] md:leading-[3vw] text-black" data-aos="fade-up">
          Developed with Experts, Backed by Research
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-8 md:gap-12 mb-12">
        {/* Image Placeholder */}
        <div className="lg:w-[38vw] w-[90%] lg:mx-0 md:w-[38vw] lg:h-[40vw] flex justify-center items-center lg:mb-4 mb-[6vw] md:mb-0" data-aos="fade-right">
          <img
            src="/sciencesectionimage.png"
            alt="Science Image"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Text and Button */}
        <div className="text-center max-w-lg mt-2 flex flex-col justify-center lg:items-start md:items-start items-center">
          {/* Box for mobile screens (commented out) */}
          {/* <div className="bg-[#f5ebd2] p-4 rounded-lg shadow-md w-full md:hidden">
            <p className="text-[4vw] leading-[5vw] font-comic text-gray-800 mb-8">
              Our games use methods endorsed by leading early childhood
              development experts and speech therapists to ensure your child
              gets the best learning experience possible. With AI-driven
              insights, your child receives personalized support on their
              journey to better speech.
            </p>
          </div> */}

          {/* Text without box for larger screens */}
          <p className="lg:text-left text-center text-[4vw] px-[5.5vw] lg:px-0 mt-[2vw] lg:mt-0 lg:text-[1.5vw] lg:leading-[2.5vw] font-comic text-gray-800 mb-[2vw]" data-aos="fade-left">
            Our games use methods endorsed by leading early childhood
            development experts and speech therapists to ensure your child
            gets the best learning experience possible. With AI-driven
            insights, your child receives personalized support on their
            journey to better speech.
          </p>

          {/* Button */}
          <button
            onClick={openPopup} // Function to open the popup when the button is clicked
            className="bg-purple-200 font-semibold lg:w-auto lg:mx-0 mx-[30vw] w-[90%] text-black lg:px-[3vw] lg:py-[1vw] px-[8vw] py-[4vw] rounded-lg hover:bg-purple-300 hover:text-white transition duration-300 text-[4vw] md:text-[1vw] mt-[1vw]" data-aos="zoom-in">
            Sign Up for Early Access
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScienceSection;
