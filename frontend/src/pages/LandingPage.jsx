import React, { useEffect, useRef, useState } from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import SliderSection from './SliderSection';
import WorkingSection from './WorkingSection';
import ChallengeSection from './ChallengeSection';
import ScienceSection from './ScienceSection';
import FooterSection from './FooterSection';
import DontMissSection from './DontMissSection';
import TestimonialSection2 from './TestimonialSection2';
import PopUpScreen from './PopUpScreen';
import Carousel from './Carousel';

const LandingPage = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false); // State for pop-up visibility
  const sliderSectionRef = useRef(null);
  const workingSectionRef = useRef(null);
  const testimonialSectionRef = useRef(null);
  const contactSectionRef = useRef(null);
  const homeSectionRef = useRef(null);

  const openPopup = () => {
    setIsPopupVisible(true); // Function to open the pop-up
  };

  const closePopup = () => {
    setIsPopupVisible(false); // Function to close the pop-up
  };



  const scrollToSection = (section) => {
    if (section === "slider-section" && sliderSectionRef.current) {
      sliderSectionRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (section === "working-section" && workingSectionRef.current) {
      workingSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
    else if (section === "testimonial-section" && testimonialSectionRef.current) {
      testimonialSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
    else if (section === "contact-section" && contactSectionRef.current) {
      contactSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
    else if (section === "home-section" && homeSectionRef.current) {
      homeSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }

  };

  return (
    <div className='w-full h-full'>
      <Navbar openPopup={openPopup} scrollToSection ={ scrollToSection } />
      {isPopupVisible && <PopUpScreen closePopup={closePopup} />} 
      <div className=' overflow-hidden'>
      
      <div ref={homeSectionRef}>
        <HeroSection />
      </div>
        {/* Use ref instead of ID */}
      <div ref={sliderSectionRef}>
        <SliderSection />
      </div>
      <div ref={workingSectionRef}>
        <WorkingSection />
      </div>
        {/* <WorkingSection /> */}
        {/* <Carousel/> */}
        <div ref={testimonialSectionRef}>
        <TestimonialSection2 />
        </div>
        {/* <TestimonialSection /> */}
        <ChallengeSection />
        {isPopupVisible && <PopUpScreen closePopup={closePopup} />} 
        <ScienceSection openPopup={openPopup} />
        <DontMissSection />
        <div ref={contactSectionRef}>
        <FooterSection scrollToSection ={ scrollToSection } />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
