import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from "react-router-dom";
// Array holding the content for the working section
const workingItems = [
  {
    img: '/game.png',
    title: 'Choose a Game',
    text: 'Pick from a variety of fun, speech-boosting games tailored to your child’s age and development level.',
    bgColor: 'bg-[#B3C7FD66]',
  },
  {
    img: '/headphoneimage.png',
    title: 'Practice Sounds & Words',
    text: 'Kids mimic words and sounds, with our engaging videos and fun characters guiding them along the way.',
    bgColor: 'bg-[#FECB6066]',
  },
  {
    img: '/likeimage.png',
    title: 'Instant Feedback',
    text: 'Our proprietary AI listens and gives instant feedback, improving pronunciation and articulation.',
    bgColor: 'bg-[#8CD5C066]',
  },
  {
    img: '/progressimage.png',
    title: 'Track Progress',
    text: 'Easily monitor your child\'s improvement and celebrate their speech milestones!',
    bgColor: 'bg-[#FCCDD166]',
  },
];

const WorkingSection = () => {
  const navigate = useNavigate();

  const handleTryGame = () => {
    navigate("/start");
  };

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
    });
  },[]);

  return (
    <div className="bg-[rgba(215,255,234,0.54)] py-10 px-6 lg:px-10 flex flex-col items-center">
      {/* Section Title */}
      <div className="text-center mb-12 lg:mb-28 mt-4" data-aos="fade-up">
        <h2 className="font-comic-neue font-bold text-[6vw] lg:text-[2.5vw] leading-[9vw] lg:leading-[2vw] text-black mb-3 mt-8">
          How it works
        </h2>
        <p className="font-comic-neue font-normal text-[3vw] lg:text-[1.3vw] leading-[6vw] lg:leading-[3vw] text-black">
          How Mimansa Kids Makes Speech Learning Easy
        </p>
      </div>

      {/* Main Content */}
      <div className="flex h-full flex-col lg:flex-row justify-center items-center w-full">
        {/* Right Content (Image Placeholder on top for mobile) */}
        <div className="flex justify-center lg:hidden items-center max-w-full lg:max-w-[28.5vw] mb-10 lg:mb-0 lg:ml-12" data-aos="fade-up" data-aos-delay="100">
          <img
            src="/worksectionimage2.png"
            alt="Work Section"
            className="w-[80vw] lg:w-full rounded-3xl shadow-lg"
          />
        </div>

        {/* Left Content (Boxes in single column for mobile) */}
        <div className="flex flex-wrap justify-center gap-8 w-full lg:w-[50%]">
          {workingItems.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col w-[80vw] h-auto lg:w-[20vw] lg:h-[19.5vw] mb-1 p-5 rounded-3xl ${item.bgColor}`} 
              data-aos="fade-up" 
              data-aos-delay={`${index * 100}`} // Increment delay for each item
            >
              <img src={item.img} alt={item.title} className="lg:w-[5vw] w-[13vw] self-center mb-6" />
              <h3 className="font-comic-neue font-bold text-[6vw] lg:text-[1.5vw] leading-[7vw] lg:leading-[1.75vw] text-black text-center mb-6">
                {item.title}
              </h3>
              <p className="font-comic-neue font-normal text-[4.5vw] lg:text-[1.2vw] leading-[6vw] lg:leading-[1.5vw] text-[#454545] text-center">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* Right Content (Image Placeholder on right for laptop, hidden on mobile) */}
        <div className="hidden lg:flex justify-center items-center max-w-full lg:max-w-[28.5vw] mb-10 lg:mb-0 lg:ml-12" data-aos="fade-up" data-aos-delay="300">
          <img
            src="/worksectionimage2.png"
            alt="Work Section"
            className="w-[80vw] lg:w-full rounded-3xl shadow-lg"
          />
        </div>
      </div>

      {/* Button Section */}
      <div className="mt-16 lg:mt-[5vw] mb-8 lg:mb-0">
        { <button onClick={handleTryGame}  className="bg-[#322F29] text-white font-comic-neue font-bold text-[5vw] lg:text-[1.5rem] py-4 px-8 rounded-lg">
          Try the Game
        </button> }
      </div>
    </div>
  );
};

export default WorkingSection;
