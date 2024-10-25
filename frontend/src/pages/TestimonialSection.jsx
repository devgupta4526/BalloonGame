import React from 'react';

const TestimonialSection = () => {
  return (
    <div className="bg-[#F8D9C4] flex flex-col items-center  py-20">
      {/* Title Section */}
      {/* <div className="text-center mb-12">
        <h2 className="font-comic-neue text-[32px] font-bold text-black">Testimonials</h2>
        <p className="font-comic-neue text-[20px] text-black mb-28">What Parents Are Saying</p>
      </div> */}
        {/* Section Title */}
        <div className="text-center mb-12 lg:mb-28 mt-4">
        <h2 className="font-comic-neue font-bold text-[6vw] lg:text-[2.5vw] leading-[9vw] lg:leading-[2vw] text-black mb-3 mt-8">
        Testimonials
        </h2>
        <p className="font-comic-neue font-normal text-[3vw] lg:text-[1.3vw] leading-[6vw] lg:leading-[3vw] text-black">
        What Parents Are Saying
        </p>
      </div>
      

      {/* Testimonial Cards */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-10">
        {/* Testimonial 1 */}
        <div className="bg-white border-4 border-black rounded-[16px] w-[350px] flex flex-col items-center  relative">
          {/* Profile Image */}
          <div className="absolute top-[-64px] left-1/2 transform -translate-x-1/2 w-[128px] h-[128px] rounded-full overflow-hidden">
            <img
              src="/aditi.png" // Replace with actual path
              alt="Aditi"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Quote */}
          <p className="font-comic-neue text-[22px] text-center text-[#454545] mt-[80px] mb-6 p-6 leading-[30px]">
            "My daughter loved the games, and we saw noticeable improvement in just a few weeks!"
          </p>
          {/* Bottom Section */}
          <div className="w-full bg-[#E1FFD3] rounded-b-[16px] flex justify-center items-center py-4">
            <p className="font-comic-neue text-[22px] font-bold text-black text-center p-4">
              Aditi <br /> Parent of a 3-year-old
            </p>
          </div>
        </div>

        {/* Testimonial 2 - Raj (Positioned Higher) */}
        <div className="bg-white border-4  border-black rounded-[16px] w-[350px] flex flex-col items-center  relative md:mt-[-100px]"> {/* Adjusted margin to raise Raj's card */}
          {/* Profile Image */}
          <div className="absolute top-[-64px] left-1/2 transform -translate-x-1/2 w-[128px] h-[128px] rounded-full overflow-hidden">
            <img
              src="/raj.png" // Replace with actual path
              alt="Raj"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Quote */}
          <p className="font-comic-neue text-[22px] text-center text-[#454545] mt-[80px] mb-6 leading-[30px] p-6">
            "The real-time feedback made it so easy to correct my son’s speech. It’s like having a therapist at home!"
          </p>
          {/* Bottom Section */}
          <div className="w-full bg-[#D4D6FF] rounded-b-[16px] flex justify-center items-center py-4">
            <p className="font-comic-neue text-[22px] font-bold text-black text-center p-4">
              Raj <br /> Parent of a 4-year-old
            </p>
          </div>
        </div>

        {/* Testimonial 3 */}
        <div className="bg-white border-4 border-black rounded-[16px] w-[350px] flex flex-col items-center  relative">
          {/* Profile Image */}
          <div className="absolute top-[-64px] left-1/2 transform -translate-x-1/2 w-[128px] h-[128px] rounded-full overflow-hidden ">
            <img
              src="/priya.png" // Replace with actual path
              alt="Priya"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Quote */}
          <p className="font-comic-neue text-[22px] text-center text-[#454545] mt-[80px] mb-6 leading-[30px] p-6">
            "Finally, a screen-time option I feel good about. It’s engaging and educational."
          </p>
          {/* Bottom Section */}
          <div className="w-full  bg-[#FECCFF] rounded-b-[16px] flex justify-center items-center py-4 p-2">
            <p className="font-comic-neue text-[22px] font-bold text-black text-center p-6">
              Priya <br /> Parent of a 2-year-old
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
