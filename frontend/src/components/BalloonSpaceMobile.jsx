import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Balloon from "./Balloon";
import "./BalloonPopGame.css";
import BalloonStartScreen from "./BalloonStartScreen";
import Waitlist from "./Waitlist";
import Confetti from "react-confetti";
import Mascot from "./Mascot";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

function BalloonSpaceMobile() {
  const navigate = useNavigate();
  const [balloons, setBalloons] = useState([]);
  const [recognition, setRecognition] = useState(null);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [mascotMessage, setMascotMessage] = useState(
    "Welcome! Pop the balloons!"
  );

  const popSound = new Audio("/burst.wav");
  const cheerSound = new Audio("/kids_cheering_short.mp3");

  const balloonImages = [
    "/balloon1.png",
    "/balloon2.png",
    "/balloon3.png",
    "/balloon4.png",
    "/balloon5.png",
  ];

  let spacebarPressTime = 0;
  let spacebarReleaseTime = 0;
  let recognitionStartTime = 0;

  // Initialize speech recognition and handle results
  useEffect(() => {
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.lang = "en-IND";
      recognitionInstance.interimResults = true;

      // Adding a grammar for the words "pop", "stop", and "bob"
      recognitionInstance.grammars = new (window.SpeechGrammarList ||
        window.webkitSpeechGrammarList)();
      recognitionInstance.grammars.addFromString(
        "#JSGF V1.0; grammar words; public <word> = pop | stop | bob | papa;",
        1
      );

      recognitionInstance.onstart = () => {
        recognitionStartTime = new Date().getTime();
        console.log(
          `[${new Date().toLocaleTimeString()}] Speech recognition started`
        );
        setListening(true);
      };
      let isProcessingResult = false;
      recognitionInstance.onresult = (event) => {
        if (isProcessingResult) return; // Ignore if already processing a result

        isProcessingResult = true; // Set flag to indicate we're processing a result

        const currentTranscript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join(" ");

        const resultTime = new Date().getTime();
        const timeToResult = resultTime - recognitionStartTime;

        console.log(
          `[${new Date().toLocaleTimeString()}] Transcript received: "${currentTranscript}"`
        );
        console.log(`[Time since recognition start: ${timeToResult}ms]`);

        setTranscript(currentTranscript);

        if (
          currentTranscript.toLowerCase().includes("pop") ||
          currentTranscript.toLowerCase().includes("stop") ||
          currentTranscript.toLowerCase().includes("bob") ||
          currentTranscript.toLowerCase().includes("papa")
        ) {
          popBalloon();
        }
        setTimeout(() => {
          isProcessingResult = false; // Reset the processing flag after a short delay
        }, 100); // Adjust this timeout if needed
      };

      recognitionInstance.onend = () => {
        console.log(
          `[${new Date().toLocaleTimeString()}] Speech recognition ended`
        );
        setListening(false);
      };

      recognitionInstance.onerror = (event) => {
        console.error(
          `[${new Date().toLocaleTimeString()}] Speech recognition error:`,
          event.error
        );
      };

      setRecognition(recognitionInstance);
    }

    return () => {
      stopListening();
    };
  }, []);

  // Mic button logic
  const handleMicButtonDown = () => {
    startListening();
    console.log("Mic button pressed: Starting speech recognition");
  };

  const handleMicButtonUp = () => {
    stopListening();
    console.log("Mic button released: Stopping speech recognition");
  };

  // Handle spacebar press/release for controlling speech recognition
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        event.preventDefault(); // Prevent scrolling
        spacebarPressTime = new Date().getTime();
        console.log(
          `[${new Date().toLocaleTimeString()}] Spacebar pressed: Starting speech recognition`
        );
        startListening();
      }
    };

    const handleKeyUp = (event) => {
      if (event.code === "Space") {
        spacebarReleaseTime = new Date().getTime();
        const pressDuration = spacebarReleaseTime - spacebarPressTime;
        console.log(
          `[${new Date().toLocaleTimeString()}] Spacebar released: Stopping speech recognition`
        );
        console.log(`[Spacebar held for: ${pressDuration}ms]`);
        stopListening();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [listening, recognition]);

  // Start speech recognition
  const startListening = () => {
    if (recognition && !listening && !gameOver) {
      recognition.start();
    }
  };

  const updateMascotMessage = (message) => {
    setMascotMessage(message);
  };

  // Stop speech recognition
  const stopListening = () => {
    if (recognition && listening) {
      recognition.stop();
      setTranscript(""); // Clear transcript when stopping
    }
  };

  // Balloon pop logic
  const popBalloon = () => {
    if (cooldown) return; // Prevent popping if cooldown is active
    setCooldown(true); // Set cooldown

    // Delay the cooldown reset to the next frame to ensure it doesn't happen immediately
    setTimeout(() => {
      setCooldown(false); // Reset cooldown after 1 second
    }, 1000); // Adjust this time to change cooldown duration

    setBalloons((prevBalloons) => {
      const firstUnpopped = prevBalloons.find((balloon) => !balloon.popped);
      if (firstUnpopped) {
        popSound.play();
        cheerSound.play();
        setScore((prevScore) => prevScore + 1);
        updateMascotMessage("Well Done! Keep going!");
        console.log(
          `[${new Date().toLocaleTimeString()}] Balloon popped! Current score: ${
            score + 1
          }`
        );

        const updatedBalloons = prevBalloons.map((balloon) =>
          balloon.id === firstUnpopped.id
            ? { ...balloon, popped: true }
            : balloon
        );

        if (updatedBalloons.every((balloon) => balloon.popped)) {
          console.log(
            `[${new Date().toLocaleTimeString()}] All balloons popped. Game over.`
          );
          setTimeout(() => {
            setGameOver(true);
            setShowWaitlist(true);
          }, 1000);
        }

        return updatedBalloons;
      }
      return prevBalloons;
    });
  };

  // Start the game by adding balloons
  const startGame = () => {
    setShowPlayButton(false);
    const initialBalloons = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      popped: false,
      image: balloonImages[i],
    }));
    setBalloons(initialBalloons);
  };

  const resetGame = () => {
    setScore(0);
    setGameOver(false);
    startGame(); // Reset the balloons and score
    console.log(
      `[${new Date().toLocaleTimeString()}] Game reset. Score set to 0.`
    );
  };

  const playAgain = () => {
    setScore(0);
    setGameOver(false);
    setShowWaitlist(false);
    setShowPlayButton(true);
    setBalloons([]);
    console.log(`[${new Date().toLocaleTimeString()}] Play again triggered.`);
  };

  const goToStartScreen = () => {
    stopListening();
    if (gameOver) {
      setGameOver(false);
    } else {
      navigate("/");
    }
  };

  // Format the score display
  const formattedScore = score.toString().padStart(3, "0").split("");

  const getBalloonStyleMobile = (index, totalBalloons) => {
    const radius = 40; // Adjust this value to control the semi-circle size
    const angle = (Math.PI / (totalBalloons - 1)) * index; // Divide the semi-circle among balloons
    const xOffset = radius * Math.cos(angle); // Calculate x position based on angle
    const yOffset = radius * Math.sin(angle); // Calculate y position based on angle
    
    return {
      position: "absolute",
      transform: `translate(${xOffset}vw, ${-yOffset}vw)`,
      margin: "1vw",
    };
  };

  return (
    <div className="flex flex-col  h-screen bg-gradient-to-b from-[#FFEBDA] to-[#FBD5B5] relative overflow-hidden">
      {showPlayButton && <BalloonStartScreen startGame={startGame} />}

      {showWaitlist && <Waitlist playAgain={playAgain} />}

      {!showWaitlist && (
        <>
        <div className="flex flex-col justify-center items-center mt-[10vw]">
        <div className="flex w-full  justify-between items-center px-5 py-2 mt-2">
            <button
              className="icon-button cursor-pointer lg:w-[3.5vw] lg:h-[3.5vw] w-[12vw] h-[12vw] active:scale-75"
              onClick={goToStartScreen}
            >
              <img src="/back.png" alt="Back" />
            </button>

           

            <div className="flex gap-4">
              {!gameOver && (
                <>
                  <button
                    className="icon-button cursor-pointer lg:w-[3.5vw] lg:h-[3.5vw] w-[12vw] h-[12vw] active:scale-75"
                    onClick={resetGame}
                  >
                    <img src="/reset.png" alt="Reset" />
                  </button>
                </>
              )}
              <button
                className="icon-button cursor-pointer lg:w-[3.5vw] lg:h-[3.5vw] w-[12vw] h-[12vw] active:scale-75"
                onClick={goToStartScreen}
              >
                <img src="/exitbuttonround.png" alt="Home" />
              </button>
            </div>
          </div>
          {!gameOver && (
              <div className="flex flex-col items-center justify-center mt-[10vw]">
                <div className="score-box-container">
                  {formattedScore.map((digit, index) => (
                    <div key={index} className="score-box lg:w-[3.5vw] lg:h-[3.5vw] w-[10vw] h-[10vw] lg:text-[2vw] text-[5vw]">
                      {digit}
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
          {/* <Mascot message={mascotMessage} /> */}

          <div className="flex h-full  justify-center items-center mt-40 relative">
            <div className="flex justify-center items-center relative">
              {balloons.map((balloon, index) => (
                <div
                  key={balloon.id}
                  style={getBalloonStyleMobile(index, balloons.length)}
                >
                  <Balloon  isPopped={balloon.popped} imageSrc={balloon.image} />
                </div>
              ))}
            </div>
          </div>

          {/* Mic Button for Mobile */}
          <div className="fixed lg:hidden z-[11] md:hidden bottom-[5vw] left-1/2 transform -translate-x-1/2">
            <button
              className="mic-button  text-white p-4 rounded-full"
              onMouseDown={handleMicButtonDown}
              onMouseUp={handleMicButtonUp}
              onTouchStart={handleMicButtonDown} // For mobile touch event
              onTouchEnd={handleMicButtonUp} // For mobile touch event
            >
      <svg width="88" height="88" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="44" cy="44" r="41.7143" fill="#454545" stroke="#FC8594" strokeWidth="3.42857"/>
<path d="M43.8496 48.3136C42.439 48.3136 41.2399 47.8199 40.2524 46.8324C39.2649 45.845 38.7712 44.6459 38.7712 43.2352V33.0784C38.7712 31.6677 39.2649 30.4687 40.2524 29.4812C41.2399 28.4937 42.439 28 43.8496 28C45.2603 28 46.4594 28.4937 47.4468 29.4812C48.4343 30.4687 48.928 31.6677 48.928 33.0784V43.2352C48.928 44.6459 48.4343 45.845 47.4468 46.8324C46.4594 47.8199 45.2603 48.3136 43.8496 48.3136ZM42.1568 64.2857V54.9579C39.2226 54.5629 36.7963 53.251 34.8778 51.0221C32.9593 48.7933 32 46.1976 32 43.2352H35.3856C35.3856 45.5769 36.2108 47.573 37.8613 49.2235C39.5118 50.874 41.5079 51.6992 43.8496 51.6992C46.1913 51.6992 48.1874 50.874 49.8379 49.2235C51.4884 47.573 52.3136 45.5769 52.3136 43.2352H55.6992C55.6992 46.1976 54.74 48.7933 52.8215 51.0221C50.903 53.251 48.4766 54.5629 45.5424 54.9579V64.2857H43.8496H42.1568ZM42.6647 44.5048C42.4107 44.2509 41.8324 43.5597 42.1568 43.2352C42.1568 42.2195 42.1568 38.1286 42.1568 37.649V38.1568V33.0784C42.1568 32.5988 42.4813 33.4029 42.1568 33.0784C41.8324 32.754 42.6364 33.0784 42.1568 33.0784C41.6772 33.0784 42.968 31.5478 42.6435 31.8723C42.319 32.1967 42.1568 32.5988 42.1568 33.0784V43.2352C42.1568 43.7149 42.319 44.1169 42.6435 44.4414C42.968 44.7658 42.185 44.5048 42.6647 44.5048Z" fill="white"/>
</svg>


            </button>
          </div>
         
        </>
      )}

{listening && (
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-center">
              <p className="text-lg font-bold text-red-500">Listening...</p>
            </div>
          )}
    </div>
  );
}

export default BalloonSpaceMobile;
