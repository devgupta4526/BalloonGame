import React, { useState } from "react";
import Carousel from "./Carousel";
import { useSwipeable } from "react-swipeable";

const slides = [
  {
    title: "Real-Time Speech Feedback Powered by AI",
    description:
      "Our advanced AI listens to your child’s speech and provides instant feedback, helping improve articulation and language skills on the go.",
    image: "/aiimagenew.png",
  },
  {
    title: "Fun, Interactive Learning",
    description:
      "No more boring exercises! Our games are designed to capture attention and make speech practice fun and rewarding for kids.",
    image: "/kidsimage1111.png",
  },
  {
    title: "Healthy Screen Time Design",
    description:
      "Crafted to reduce passive screen time, our app encourages active engagement and meaningful parent-child interaction.",
    image: "/kidsimage2222.png",
  },
  {
    title: "Built by Experts, Loved by Parents",
    description:
      "Developed by speech therapists and early childhood experts, our methods are proven to help children improve speech at their own pace.",
    image: "/kidsimage3333.png",
  },
];

const SliderSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [direction, setDirection] = useState(null);
  const [isHolding, setIsHolding] = useState(false);

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNextSlide(),
    onSwipedRight: () => handlePrevSlide(),
    trackMouse: true,
  });

  // Function to go to the next slide
  const handleNextSlide = () => {
    setIsFading(true);
    setDirection("right");
    setTimeout(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      setIsFading(false);
      setDirection(null);
    }, 500);
  };

  // Function to go to the previous slide
  const handlePrevSlide = () => {
    setIsFading(true);
    setDirection("left");
    setTimeout(() => {
      setCurrentSlide(
        (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
      );
      setIsFading(false);
      setDirection(null);
    }, 500);
  };

  const handleTouchStart = () => setIsHolding(true);
  const handleTouchEnd = () => setIsHolding(false);

  return (
    <div
      {...handlers}
      className="bg-[#C8F0FFBF] w-full h-auto lg:h-[120vh] flex flex-col items-center justify-center relative px-6 py-10 lg:px-10 lg:py-[2.5vw] "
    >
      {/* Section Title */}
      <div className="text-center mb-12 lg:mb-28 mt-4">
        <h2 className="font-comic-neue font-bold text-[6vw] lg:text-[2.5vw] leading-[9vw] lg:leading-[2vw] text-black mb-3 mt-8">
          Why Choose Us
        </h2>
        <p className="font-comic-neue font-normal text-[3vw] lg:text-[1.3vw] leading-[6vw] lg:leading-[3vw] text-black">
          Empowering Parents. Engaging Children. Proven Results.
        </p>
      </div>

      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative flex flex-col items-center lg:flex-row justify-center w-full max-w-7xl space-y-10 lg:space-y-0"
      >
        <button
          onClick={handlePrevSlide}
          className="absolute left-0 lg:flex hidden justify-center items-center w-10 h-10 bg-[#FF9650] rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Pass the currentSlide state and function to Carousel */}
        <Carousel
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
          isHolding={isHolding}
        />

        <button
          onClick={handleNextSlide}
          className="absolute right-0 lg:flex hidden justify-center items-center w-10 h-10 bg-[#FF9650] rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div className="flex justify-center mb-[4vw] items-center mt-[12vw] lg:mt-32 space-x-2 gap-[15vw]">
        <div className="flex justify-center items-center space-x-2">
          {slides.map((_, index) => (
            <span
              key={index}
              onClick={() => {
                setIsFading(true);
                setTimeout(() => {
                  setCurrentSlide(index);
                  setIsFading(false);
                }, 500);
              }}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                index === currentSlide ? "bg-[#FF9650]" : "bg-white opacity-60"
              }`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SliderSection;
