import React, { useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BalloonPopGame from "./components/BalloonPopGame";
import LandingPage from "./pages/LandingPage";
import LocomotiveScroll from "locomotive-scroll";
import 'locomotive-scroll/dist/locomotive-scroll.css';
import BalloonTest from "./components/BalloonTest";
import MobileBalloonPopGame from "./components/MobileBalloonPopGame";
import BalloonSpace from "./components/BalloonSpace";
import StartScreen from "./components/StartScreen";
import BalloonGoogle from "./components/BalloonGoogle";
import BalloonGoogleBase from "./components/BalloonGoogleBase";
import BalloonSpaceMobile from "./components/BalloonSpaceMobile";
import BalloonSpaceNew from "./components/BalloonSpaceNew";

function App() {
  const scrollRef = useRef(null); // Create a ref for the scroll container

  useEffect(() => {
    // Initialize Locomotive Scroll
    const locomotiveScroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true, // Enable smooth scrolling
    });

    // Clean up on unmount
    return () => {
      locomotiveScroll.destroy();
    };
  }, []);

  return (
    <Router>
      <div data-scroll-container ref={scrollRef}> 
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/start" element={<StartScreen />} />
          <Route path="/game" element={<BalloonPopGame />} />
          <Route path="/space" element={<BalloonSpace />} />
          <Route path="/mobile" element={<MobileBalloonPopGame />} />
          <Route path="/vosk" element={<BalloonTest />} />
          <Route path="/goostt" element={<BalloonGoogle />} />
          <Route path="/goosttbase" element={<BalloonGoogleBase />} />
          <Route path="/spacemobile" element={<BalloonSpaceMobile />} />
          <Route path="/spacenew" element={<BalloonSpaceNew />} />
          {/* <Route path="/test" element={<Test />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
