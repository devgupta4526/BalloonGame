import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ChallengeSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
    });
  }, []);

  return (
    <div className="bg-[#E9FFF3] py-10 px-8 text-center w-full flex flex-col">
      {/* Section Title */}
      <div className="text-center mb-12 lg:mb-28 mt-4" data-aos="fade-up">
        <h2 className="font-comic-neue font-bold text-[6vw] lg:text-[2.5vw] leading-[9vw] lg:leading-[2vw] text-black mb-3 mt-8">
          The Challenge
        </h2>
        <p className="font-comic-neue font-normal lg:px-0 px-[8vw] text-[3vw] lg:text-[1.3vw] leading-[6vw] lg:leading-[3vw] text-black">
          Speech and Language Delays are on the Rise, and Parents are Seeking Help
        </p>
      </div>

      {/* Content section with three columns */}
      <div className="flex flex-col mb-20 md:flex-row justify-center items-start gap-8 mx-auto">
        {/* Column 1: Unhealthy Screen Time */}
        <div className="flex-1 bg-[#D4E9F7] rounded-[1.2rem] p-8 w-[80vw] md:w-[25vw] h-[auto] md:h-[65vh]" data-aos="fade-up" data-aos-delay="100">
          <h3 className="font-comic-neue mt-5 font-semibold text-[6vw] md:text-[2.3vw] text-[#6782AE] mb-6 text-center">
            Passive Screen
          </h3>
          <div className="flex justify-center items-center">
            {/* Vertical dashed line divider */}
            <div className="border-t-[3px] border-dashed opacity-80 border-white w-full lg:w-[60vw] md:w-[30vw] h-[2vw] mx-0 lg:mx-[2vw]"></div>
          </div>
          <p className="font-comic-neue mt-5 font-light text-[5.5vw] md:text-[1.9vw] text-[#454545] text-center px-[2vw] lg:px-0">
            Increase in passive unhealthy screen time leading to speech delay in children.
          </p>
        </div>

        {/* Column 2: Speech Delay */}
        <div className="flex-1 bg-[#D4E9F7] rounded-[1.2rem] p-8 w-[80vw] md:w-[25vw] h-[auto] md:h-[65vh]" data-aos="fade-up" data-aos-delay="200">
          <h3 className="font-comic-neue mt-5 font-semibold text-[6vw] md:text-[2.3vw] text-[#6782AE] mb-6 text-center">
            Speech Delay
          </h3>
          <div className="flex justify-center items-center">
            {/* Vertical dashed line divider */}
            <div className="border-t-[3px] border-dashed opacity-80 border-white w-full lg:w-[60vw] md:w-[30vw] h-[2vw] mx-0 lg:mx-[2vw]"></div>
          </div>
          <p className="font-comic-neue mt-5 font-light text-[5.5vw] md:text-[1.9vw] text-[#454545] text-center px-[2vw] lg:px-0">
            1 in 5 children is at risk of having speech and language delay before age 5.
          </p>
        </div>

        {/* Column 3: Expensive Therapy */}
        <div className="flex-1 bg-[#D4E9F7] rounded-[1.2rem] p-8 w-[80vw] md:w-[25vw] h-[auto] md:h-[65vh]" data-aos="fade-up" data-aos-delay="300">
          <h3 className="font-comic-neue mt-5 font-semibold text-[6vw] md:text-[2.3vw] text-[#6782AE] mb-6 text-center">
            Expensive Therapy
          </h3>
          <div className="flex justify-center items-center">
            {/* Vertical dashed line divider */}
            <div className="border-t-[3px] border-dashed opacity-80 border-white w-full lg:w-[60vw] md:w-[30vw] h-[2vw] mx-0 lg:mx-[2vw]"></div>
          </div>
          <p className="font-comic-neue mt-5 font-light text-[5vw] md:text-[1.9vw] text-[#454545] text-center px-[2vw] lg:px-0">
            Good center-based speech therapy is inaccessible and expensive.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChallengeSection;
