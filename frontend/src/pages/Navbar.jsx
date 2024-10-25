import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ openPopup, scrollToSection }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false); // State for mobile menu

  const handleTryGame = () => {
    navigate("/start");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMenuItemClick = () => {
    setMobileMenuOpen(false); // Close the menu when a menu item is clicked
  };

  return (
    <div className="bg-white flex items-center justify-between w-full h-[14vw] lg:h-[6vw] px-[8vw] shadow-md sticky top-0 z-50">
      <img
        src="/logo1.png"
        alt="Mimansa Kids Logo"
        className="w-[30vw] lg:w-[12vw]"
      />

      {/* Desktop Menu */}
      <ul className="hidden lg:flex gap-[2.5vw] text-[1.1vw] text-black list-none">
        <li
          onClick={() => {
            scrollToSection("home-section");
            handleMenuItemClick();
          }}
          className="cursor-pointer hover:text-gray-600 font-semibold text-[#A964FF] transition duration-300"
        >
          Home
        </li>
        <li
          onClick={() => {
            scrollToSection("slider-section");
            handleMenuItemClick();
          }}
          className="cursor-pointer hover:text-[#A964FF] font-semibold transition duration-300"
        >
          Why Us
        </li>
        <li
          onClick={() => {
            scrollToSection("working-section");
            handleMenuItemClick();
          }}
          className="cursor-pointer hover:text-[#A964FF] font-semibold transition duration-300"
        >
          How it works
        </li>
        <li
          onClick={() => {
            scrollToSection("testimonial-section");
            handleMenuItemClick();
          }}
          className="cursor-pointer hover:text-[#A964FF] font-semibold transition duration-300"
        >
          Testimonial
        </li>
        <li
          onClick={() => {
            scrollToSection("contact-section");
            handleMenuItemClick();
          }}
          className="cursor-pointer hover:text-[#A964FF] font-semibold transition duration-300"
        >
          Contact Us
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <div className="lg:hidden flex items-center justify-center gap-4">
      <button
          onClick={openPopup}
          className="py-[2.5vw] text-[2.5vw] px-[6vw] bg-[#DBCDF0] text-black font-semibold rounded-md hover:bg-[#c09ff3] hover:text-white transition duration-300 whitespace-nowrap"
        >
          Sign me up!
        </button>
       

        <button onClick={toggleMobileMenu} className="focus:outline-none">
          {/* Hamburger icon */}
         {!isMobileMenuOpen ? <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 7V5H21V7H3ZM3 19V17H21V19H3ZM3 13V11H21V13H3Z"
              fill="#1C1B1F"
            />
          </svg> : <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.6362 15.636L28.3642 28.3639" stroke="#1C1B1F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.6362 28.364L28.3642 15.6361" stroke="#1C1B1F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {/* {isMobileMenuOpen && (
        <div className={`md:hidden font-comic-neue absolute top-full left-0 w-full rounded-b-xl bg-white shadow-lg z-40 transition-all duration-1000 ease-in-out transform origin-top ${
    isMobileMenuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
        }`}>
          <ul className="flex mt-[3vw] flex-col space-x-[4vw] gap-[1.5vw] text-[1rem] text-black py-4">
            
            <li
              onClick={() => {
                scrollToSection("home-section");
                handleMenuItemClick();
              }}
              className="cursor-pointer ml-[4vw] hover:text-[#A964FF] font-semibold  transition duration-300"
            >
              Home
            </li>
            <li
              onClick={() => {
                scrollToSection("slider-section");
                handleMenuItemClick();
              }}
              className="cursor-pointer hover:text-[#A964FF] font-semibold transition duration-300"
            >
              Why Us
            </li>
            <li
              onClick={() => {
                scrollToSection("working-section");
                handleMenuItemClick();
              }}
              className="cursor-pointer hover:text-[#A964FF] font-semibold transition duration-300"
            >
              How it works
            </li>
            <li
              onClick={() => {
                scrollToSection("testimonial-section");
                handleMenuItemClick();
              }}
              className="cursor-pointer hover:text-[#A964FF] font-semibold transition duration-300"
            >
              Testimonial
            </li>
            <li
              onClick={() => {
                scrollToSection("contact-section");
                handleMenuItemClick();
              }}
              className="cursor-pointer hover:text-[#A964FF] font-semibold transition duration-300"
            >
              Contact Us
            </li>
          </ul>
          
        </div>
      )} */}
      {/* Mobile Dropdown Menu */}
      <div
  className={`lg:hidden font-comic-neue absolute top-full left-0 w-full rounded-b-xl bg-white shadow-lg z-40 transform origin-top transition-all duration-500 ease-in-out ${
    isMobileMenuOpen ? "scale-y-100 opacity-100 visible" : "scale-y-0 opacity-0 invisible"
  }`}
>
  <ul className="flex mt-[3vw] flex-col space-x-[4vw] gap-[1.5vw] text-[1rem] text-black py-4">
    <li
      onClick={() => {
        scrollToSection("home-section");
        handleMenuItemClick();
      }}
      className="cursor-pointer ml-[4vw] hover:text-[#A964FF] font-semibold  transition duration-300"
    >
      Home
    </li>
    <li
      onClick={() => {
        scrollToSection("slider-section");
        handleMenuItemClick();
      }}
      className="cursor-pointer hover:text-[#A964FF] font-semibold transition duration-300"
    >
      Why Us
    </li>
    <li
      onClick={() => {
        scrollToSection("working-section");
        handleMenuItemClick();
      }}
      className="cursor-pointer hover:text-[#A964FF] font-semibold transition duration-300"
    >
      How it works
    </li>
    <li
      onClick={() => {
        scrollToSection("testimonial-section");
        handleMenuItemClick();
      }}
      className="cursor-pointer hover:text-[#A964FF] font-semibold transition duration-300"
    >
      Testimonial
    </li>
    <li
      onClick={() => {
        scrollToSection("contact-section");
        handleMenuItemClick();
      }}
      className="cursor-pointer hover:text-[#A964FF] font-semibold transition duration-300"
    >
      Contact Us
    </li>
  </ul>
</div>


      {/* Buttons on Desktop */}
      <div className="hidden lg:flex items-center justify-center gap-[1.5vw]">
        {<button
          onClick={handleTryGame}
          className="py-[0.80vw] px-4 hover:bg-black hover:text-white font-semibold text-[1rem] rounded-md bg-white text-black border-2 border-black transition duration-300 whitespace-nowrap"
        >
          Try the game
        </button>}
        <button
          onClick={openPopup}
          className="py-[0.85vw] px-3 bg-[#DBCDF0] text-black font-semibold text-[1vw] rounded-md hover:bg-[#c09ff3] hover:text-white transition duration-300 whitespace-nowrap"
        >
          Signup for early access
        </button>
      </div>
    </div>
  );
};

export default Navbar;
