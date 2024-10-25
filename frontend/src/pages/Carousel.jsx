import React, { useEffect } from 'react';

const Carousel = ({ currentSlide, setCurrentSlide,isHolding  }) => {
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

  useEffect(() => {
    if (!isHolding) { // Only set interval if not holding
      const interval = setInterval(() => {
        setCurrentSlide((prevIndex) => (prevIndex + 1) % slides.length);
      }, 10000); // Change slide every 10 seconds
  
      return () => clearInterval(interval); // Cleanup the interval
    }
  }, [setCurrentSlide, slides.length, isHolding]); // Add isHolding as a dependency

  return (
    <div className="relative overflow-hidden w-full lg:max-w-[64vw] mx-auto">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div className="min-w-full flex flex-col-reverse lg:flex-row justify-between items-center w-full max-w-5xl lg:space-x-10" key={index}>
            <div className={`flex flex-col justify-center w-full lg:w-[60%] text-center lg:text-left transition-opacity duration-500`}>
              <h2 className="font-comic-neue text-[#6A7FBF] px-[6vw] lg:px-0 font-bold text-[6vw] mt-[2vw] lg:mt-0 lg:text-[40px] leading-[7vw] lg:leading-[45px] mb-4">
                {slide.title}
              </h2>
              <p className="font-comic-neue text-center lg:text-start px-[6vw] lg:px-0 font-normal text-[4vw] lg:text-[1.5vw] leading-[5vw] lg:leading-[1.9vw] text-black">
                {slide.description}
              </p>
            </div>
            <div className={`flex justify-center items-center w-full lg:w-[50%]`}>
              <div className="w-[80vw] h-[60vw] lg:w-[26vw] lg:h-[20vw]  flex justify-center items-center rounded-3xl">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-fit rounded-3xl"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
