import React from "react";

const FooterSection = ({ scrollToSection }) => {
  return (
    <>
      <footer className="bg-[#C5DEF2] hidden lg:block py-[8vw] lg:py-10">
        <div className="max-w-[90vw] lg:max-w-[80vw] mx-auto flex flex-col lg:flex-row justify-between items-center lg:items-start">
          {/* Left Section - Logo */}
          <div className="mb-[6vw] lg:mb-0">
            <img
              src="/logo1.png"
              alt="Mimansa Kids Logo"
              className="w-[60vw] sm:w-[30vw] lg:w-[12vw]"
            />
          </div>

          {/* Middle Section - Links */}
          <div className="flex flex-col lg:flex-row lg:space-x-20 space-y-[6vw] lg:space-y-0">
            {/* Social Links */}
            <div>
              <h3 className="font-semibold text-[2.5vw] lg:text-[1vw] text-[#A1A1A1] mb-[3vw] lg:mb-4">
                SOCIAL
              </h3>
              <ul className="space-y-[2vw] lg:space-y-2 text-[#454545] text-[4vw] sm:text-[2vw] lg:text-[1.02vw]">
                <li className="flex items-center hover:text-[#C8A6FB]">
                  <a
                    href="https://www.facebook.com/people/Mimansa-Kids/61557931594123/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <svg
                      width="14"
                      height="23"
                      viewBox="0 0 14 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-[2vw] lg:mr-2"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.6658 4.2201L10.5309 4.22146C8.85676 4.22146 8.53214 4.98401 8.53214 6.1027V8.57114H12.5254L12.0052 12.4383H8.53214V22.3583H4.36875V12.4383H0.887207V8.57114H4.36875V5.72074C4.36875 2.4109 6.47667 0.609863 9.55421 0.609863C11.0285 0.609863 12.2958 0.714528 12.6658 0.762102V4.2201Z"
                        fill="#454545"
                      />
                    </svg>
                    Facebook
                  </a>
                </li>
                <li className="flex items-center hover:text-[#C8A6FB]">
                  <a
                    href="https://www.instagram.com/mimansakids/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-[2vw] lg:mr-2"
                    >
                      <path
                        d="M15.6803 0.779785H6.24247C3.03744 0.779785 0.429932 3.3688 0.429932 6.55095V15.9214C0.429932 19.1037 3.03744 21.6925 6.24247 21.6925H15.6803C18.8855 21.6925 21.493 19.1035 21.493 15.9214V6.55095C21.4932 3.3688 18.8855 0.779785 15.6803 0.779785ZM19.6243 15.9214C19.6243 18.0805 17.8551 19.8371 15.6804 19.8371H6.24247C4.0679 19.8372 2.29875 18.0805 2.29875 15.9214V6.55095C2.29875 4.39191 4.0679 2.63527 6.24247 2.63527H15.6803C17.8549 2.63527 19.6242 4.39191 19.6242 6.55095L19.6243 15.9214Z"
                        fill="#454545"
                      />
                      <path
                        d="M10.9614 5.84766C7.96864 5.84766 5.53394 8.26498 5.53394 11.2363C5.53394 14.2076 7.96864 16.6248 10.9614 16.6248C13.9541 16.6248 16.3888 14.2076 16.3888 11.2363C16.3888 8.26498 13.9541 5.84766 10.9614 5.84766ZM10.9614 14.7692C8.99923 14.7692 7.40276 13.1844 7.40276 11.2362C7.40276 9.28797 8.9991 7.70301 10.9614 7.70301C12.9236 7.70301 14.52 9.28797 14.52 11.2362C14.52 13.1844 12.9235 14.7692 10.9614 14.7692Z"
                        fill="#454545"
                      />
                      <path
                        d="M16.6166 4.27441C16.2565 4.27441 15.9028 4.41914 15.6485 4.67272C15.393 4.92507 15.2461 5.27637 15.2461 5.6351C15.2461 5.99271 15.3931 6.34389 15.6485 6.59748C15.9027 6.84982 16.2565 6.99579 16.6166 6.99579C16.9779 6.99579 17.3305 6.84982 17.5859 6.59748C17.8413 6.34389 17.987 5.99259 17.987 5.6351C17.987 5.27637 17.8413 4.92507 17.5859 4.67272C17.3317 4.41914 16.9779 4.27441 16.6166 4.27441Z"
                        fill="#454545"
                      />
                    </svg>
                    Instagram
                  </a>
                </li>
                <li className="flex items-center hover:text-[#C8A6FB]">
                  <a
                    href="https://www.linkedin.com/company/mimansakids/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <svg
                      width="21"
                      height="20"
                      viewBox="0 0 21 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-[2vw] lg:mr-2"
                    >
                      <path
                        d="M14.8149 6.13965C16.4062 6.13965 17.9324 6.77179 19.0576 7.89701C20.1828 9.02223 20.8149 10.5483 20.8149 12.1396V19.1396H16.8149V12.1396C16.8149 11.6092 16.6042 11.1005 16.2292 10.7254C15.8541 10.3504 15.3454 10.1396 14.8149 10.1396C14.2845 10.1396 13.7758 10.3504 13.4007 10.7254C13.0257 11.1005 12.8149 11.6092 12.8149 12.1396V19.1396H8.81494V12.1396C8.81494 10.5483 9.44708 9.02223 10.5723 7.89701C11.6975 6.77179 13.2236 6.13965 14.8149 6.13965Z"
                        fill="#454545"
                      />
                      <path
                        d="M4.81494 7.13965H0.814941V19.1396H4.81494V7.13965Z"
                        fill="#454545"
                      />
                      <path
                        d="M2.81494 4.13965C3.91951 4.13965 4.81494 3.24422 4.81494 2.13965C4.81494 1.03508 3.91951 0.139648 2.81494 0.139648C1.71037 0.139648 0.814941 1.03508 0.814941 2.13965C0.814941 3.24422 1.71037 4.13965 2.81494 4.13965Z"
                        fill="#454545"
                      />
                    </svg>
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-semibold text-[2.5vw] lg:text-[1vw] text-[#A1A1A1] mb-[3vw] lg:mb-4">
                COMPANY
              </h3>
              <ul className="space-y-[2vw] cursor-pointer lg:space-y-2 text-[#454545] text-[4vw] sm:text-[2vw] lg:text-[1.02vw]">
                <li
                  onClick={() => {
                    scrollToSection("home-section");
                  }}
                  className="hover:text-[#C8A6FB]"
                >
                  Home
                </li>
                <li
                  onClick={() => {
                    scrollToSection("slider-section");
                  }}
                  className="hover:text-[#C8A6FB]"
                >
                  Why Us
                </li>
                <li
                  onClick={() => {
                    scrollToSection("working-section");
                  }}
                  className="hover:text-[#C8A6FB]"
                >
                  How It Works
                </li>
                <li
                  onClick={() => {
                    scrollToSection("testimonial-section");
                  }}
                  className="hover:text-[#C8A6FB]"
                >
                  Testimonial
                </li>
                <li
                  onClick={() => {
                    scrollToSection("contact-section");
                  }}
                  className="hover:text-[#C8A6FB]"
                >
                  Contact Us
                </li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="font-semibold text-[2.5vw] lg:text-[1vw] text-[#A1A1A1] mb-[3vw] lg:mb-4">
                SUPPORT
              </h3>
              <ul className="space-y-[2vw] lg:space-y-2 text-[#454545] text-[4vw] sm:text-[2vw] lg:text-[1.02vw]">
                <li>Privacy Policy</li>
                <li>FAQ</li>
              </ul>
            </div>
          </div>

          <div className="w-[0.5vw] hidden lg:block lg:w-[0.125vw] h-[20vw] lg:h-[13vw] py-[1vw] opacity-[60%] bg-[#A1A1A199]"></div>
          <div className="max-w-full block lg:hidden w-[50vw] mx-[8vw] my-[4vw]  h-[0.5vw]  opacity-[60%] bg-[#A1A1A199]"></div>

          {/* Right Section - App Store Links */}
          <div className="flex flex-col items-center">
            <h3 className="font-semibold text-[2.5vw] lg:text-[1vw] text-center mb-[3vw] lg:mb-4">
              COMING SOON ON
            </h3>
            <div className="flex flex-col space-y-[4vw] lg:space-y-4">
              <img
                src="/appstore.png"
                alt="App Store"
                className="w-[50vw] sm:w-[30vw] lg:w-[15.5vw]"
              />
              <img
                src="/googleplay.png"
                alt="Google Play"
                className="w-[50vw] sm:w-[30vw] lg:w-[15.5vw]"
              />
            </div>
          </div>
        </div>

        <div className="max-w-full mx-[8vw] my-[4vw] lg:mx-36 lg:my-2 h-[0.5vw] lg:h-[0.125vw] opacity-[60%] bg-[#A1A1A199]"></div>

        {/* Footer Bottom Section */}
        <div className="mt-[6vw] lg:mt-6 text-center flex flex-col items-center lg:items-start px-[8vw] lg:px-36">
          <p className="text-[3.5vw] lg:text-[0.9vw] text-[#A1A1A1]">
            hello@mimansaplay.com
          </p>
          <p className="text-[3.5vw] lg:text-[0.9vw] text-[#A1A1A1]">
            © 2024 Mimansa Kids
          </p>
        </div>
      </footer>

      {/* Footer Mobile */}
      <footer className="bg-[#C5DEF2] lg:hidden text-white p-[2vw]">
        <div className="container mx-auto">
          {/* Add your mobile footer content here based on the image */}
          {/* Left Section - Logo */}
          <div className="mb-0">
            <img
              src="/logo1.png"
              alt="Mimansa Kids Logo"
              className="w-[60vw] sm:w-[30vw]"
            />
          </div>

          <div>
            <ul className="space-y-[2vw] cursor-pointer p-[4.5vw] text-[#454545]  text-[4vw] sm:text-[2vw]">
              <li
                onClick={() => {
                  scrollToSection("home-section");
                }}
              >
                Home
              </li>
              <li
                onClick={() => {
                  scrollToSection("slider-section");
                }}
              >
                Why Us
              </li>
              <li
                onClick={() => {
                  scrollToSection("working-section");
                }}
              >
                How It Works
              </li>
              <li
                onClick={() => {
                  scrollToSection("testimonial-section");
                }}
              >
                Testimonial
              </li>
              <li
                onClick={() => {
                  scrollToSection("contact-section");
                }}
              >
                Contact Us
              </li>
            </ul>
          </div>

          <div className="flex p-[4vw] mb-[3vw]">
            <ul className="space-y-[2vw] flex gap-[4vw] justify-center items-center ">
              <li className="flex items-center justify-center">
                <a
                  href="https://www.facebook.com/people/Mimansa-Kids/61557931594123/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  <svg
                    width="17"
                    height="28"
                    viewBox="0 0 17 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_731_600)">
                      <g clip-path="url(#clip1_731_600)">
                        <g clip-path="url(#clip2_731_600)">
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M15.5934 4.59903L12.8738 4.60076C10.7412 4.60076 10.3276 5.57216 10.3276 6.99724V10.1418H15.4146L14.7519 15.068H10.3276V27.705H5.02395V15.068H0.588867V10.1418H5.02395V6.51067C5.02395 2.29432 7.7092 0 11.6296 0C13.5077 0 15.1221 0.13333 15.5934 0.193935V4.59903Z"
                            fill="#264195"
                          />
                        </g>
                      </g>
                    </g>
                    <defs>
                      <clipPath id="clip0_731_600">
                        <rect width="16.3439" height="28" fill="white" />
                      </clipPath>
                      <clipPath id="clip1_731_600">
                        <rect width="16.3439" height="28" fill="white" />
                      </clipPath>
                      <clipPath id="clip2_731_600">
                        <rect
                          width="16.3333"
                          height="28"
                          fill="white"
                          transform="translate(0.00537109)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </a>
              </li>
              <li className="flex items-center justify-center">
                <a
                  href="https://www.instagram.com/mimansakids/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  <svg
                    width="29"
                    height="27"
                    viewBox="0 0 29 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_731_612)">
                      <g clip-path="url(#clip1_731_612)">
                        <path
                          d="M20.3188 0H8.2961C4.21326 0 0.891602 3.29811 0.891602 7.3518V19.2887C0.891602 23.3425 4.21326 26.6405 8.2961 26.6405H20.3188C24.4019 26.6405 27.7236 23.3424 27.7236 19.2887V7.3518C27.7238 3.29811 24.4019 0 20.3188 0ZM25.3431 19.2887C25.3431 22.0392 23.0892 24.2768 20.3189 24.2768H8.2961C5.52596 24.2769 3.27227 22.0392 3.27227 19.2887V7.3518C3.27227 4.60144 5.52596 2.36367 8.2961 2.36367H20.3188C23.0891 2.36367 25.3429 4.60144 25.3429 7.3518L25.3431 19.2887Z"
                          fill="#264195"
                        />
                        <path
                          d="M14.3075 6.45605C10.4951 6.45605 7.39355 9.53544 7.39355 13.3206C7.39355 17.1057 10.4951 20.1849 14.3075 20.1849C18.1199 20.1849 21.2214 17.1057 21.2214 13.3206C21.2214 9.53544 18.1199 6.45605 14.3075 6.45605ZM14.3075 17.8211C11.8079 17.8211 9.77422 15.8022 9.77422 13.3205C9.77422 10.8386 11.8078 8.81957 14.3075 8.81957C16.8072 8.81957 18.8407 10.8386 18.8407 13.3205C18.8407 15.8022 16.807 17.8211 14.3075 17.8211Z"
                          fill="#264195"
                        />
                        <path
                          d="M21.511 4.45117C21.0523 4.45117 20.6017 4.63554 20.2778 4.95857C19.9523 5.28003 19.7651 5.72755 19.7651 6.18453C19.7651 6.64009 19.9524 7.08745 20.2778 7.41049C20.6015 7.73195 21.0523 7.91789 21.511 7.91789C21.9712 7.91789 22.4204 7.73195 22.7457 7.41049C23.0711 7.08745 23.2568 6.63993 23.2568 6.18453C23.2568 5.72755 23.0711 5.28003 22.7457 4.95857C22.422 4.63554 21.9712 4.45117 21.511 4.45117Z"
                          fill="#264195"
                        />
                      </g>
                    </g>
                    <defs>
                      <clipPath id="clip0_731_612">
                        <rect
                          width="28.0255"
                          height="26.9299"
                          fill="white"
                          transform="translate(0.34375)"
                        />
                      </clipPath>
                      <clipPath id="clip1_731_612">
                        <rect
                          width="28.0071"
                          height="26.9299"
                          fill="white"
                          transform="translate(0.353027)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </a>
              </li>
              <li className="flex items-center justify-center">
                <a
                  href="https://www.linkedin.com/company/mimansakids/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  <svg
                    width="26"
                    height="25"
                    viewBox="0 0 26 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.2039 7.64355C20.231 7.64355 22.1751 8.44883 23.6085 9.88223C25.0419 11.3156 25.8472 13.2597 25.8472 15.2869V24.2041H20.7516V15.2869C20.7516 14.6112 20.4832 13.9631 20.0054 13.4853C19.5276 13.0075 18.8796 12.7391 18.2039 12.7391C17.5281 12.7391 16.8801 13.0075 16.4023 13.4853C15.9245 13.9631 15.6561 14.6112 15.6561 15.2869V24.2041H10.5605V15.2869C10.5605 13.2597 11.3658 11.3156 12.7992 9.88223C14.2326 8.44883 16.1767 7.64355 18.2039 7.64355Z"
                      fill="#264195"
                    />
                    <path
                      d="M5.46517 8.91699H0.369629V24.2036H5.46517V8.91699Z"
                      fill="#264195"
                    />
                    <path
                      d="M2.9174 5.09554C4.32449 5.09554 5.46517 3.95487 5.46517 2.54777C5.46517 1.14068 4.32449 0 2.9174 0C1.5103 0 0.369629 1.14068 0.369629 2.54777C0.369629 3.95487 1.5103 5.09554 2.9174 5.09554Z"
                      fill="#264195"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          <div className="w-[95%] rounded-3xl h-[1vw] bg-white mx-[2vw]"></div>

          <div className="flex flex-col items-center justify-center w-full mt-[6vw] mb-[6vw]">
            <p className="text-[4vw] text-center w text-[#A1A1A1]">
              hello@mimansaplay.com
            </p>
            <p className="text-[4vw]  text-[#A1A1A1]">© 2024 Mimansa Kids</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterSection;
