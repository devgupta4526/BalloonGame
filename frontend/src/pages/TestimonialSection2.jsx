import React from 'react';

const TestimonialSection2 = () => {
  return (
    <div className="bg-[#F8D9C4] flex flex-col items-center py-10">
      {/* Section Title */}
      <div className="text-center mb-12 lg:mb-28 mt-4" data-aos="fade-up">
        <h2 className="font-comic-neue font-bold text-[6vw] lg:text-[2.5vw] leading-[9vw] lg:leading-[2vw] text-black mb-3 mt-8">
          Testimonials
        </h2>
        <p className="font-comic-neue font-normal text-[3vw] lg:text-[1.3vw] leading-[6vw] lg:leading-[3vw] text-black">
          What Parents Are Saying
        </p>
      </div>
      
      {/* Image Section for Large Screens */}
      <div className="hidden lg:flex justify-center w-full items-center lg:mb-[10vw]" data-aos="fade-up" data-aos-delay="200">
        <img src="/testimonial2.png" className="w-[180vw] md:w-[70%]" alt="Testimonial image" />
      </div>
      
      {/* Image Section for Mobile Screens */}
      <div className="flex lg:hidden mt-[8vw] justify-center w-full items-center mb-[14vw]" data-aos="fade-up" data-aos-delay="200">
        <img src="/testimonialmobile2.png" className="w-[95%] md:w-[70%]" alt="Testimonial image" />
      </div>
    </div>
  );
}

export default TestimonialSection2;
