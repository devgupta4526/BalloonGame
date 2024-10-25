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

function BalloonSpace() {
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

  const getBalloonStyle = (index) => {
    const zigzagOffset = 5;
    const verticalOffset = index % 2 === 0 ? zigzagOffset : -zigzagOffset;
    return {
      transform: `translateY(${verticalOffset}vw)`,
      margin: "4vw",
    };
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-[#FFEBDA] to-[#FBD5B5] relative">
      {showPlayButton && <BalloonStartScreen startGame={startGame} />}

      {showWaitlist && <Waitlist playAgain={playAgain} />}

      {!showWaitlist && (
        <>
          <div className="flex w-full justify-between items-center px-5 py-2 mt-2">
            <button
              className="icon-button cursor-pointer active:scale-75"
              onClick={goToStartScreen}
            >
              <img src="/back.png" alt="Back" />
            </button>

            {!gameOver && (
              <div className="flex flex-col items-center justify-center ml-28">
                <div className="score-box-container">
                  {formattedScore.map((digit, index) => (
                    <div key={index} className="score-box">
                      {digit}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4">
              {!gameOver && (
                <>
                  <button
                    className="icon-button cursor-pointer active:scale-75"
                    onClick={resetGame}
                  >
                    <img src="/reset.png" alt="Reset" />
                  </button>
                </>
              )}
              <button
                className="icon-button cursor-pointer active:scale-75"
                onClick={goToStartScreen}
              >
                <img src="/exitbuttonround.png" alt="Home" />
              </button>
            </div>
          </div>
          {/* <Mascot message={mascotMessage} /> */}

          <div className="flex justify-center items-center mt-40">
            <div className="flex justify-center items-center">
              {balloons.map((balloon, index) => (
                <div key={balloon.id} style={getBalloonStyle(index)}>
                  <Balloon isPopped={balloon.popped} imageSrc={balloon.image} />
                </div>
              ))}
            </div>
          </div>

          {/* Mic Button for Mobile */}
          <div className="fixed lg:hidden bottom-[30vw] left-1/2 transform -translate-x-1/2">
            <button
              className="mic-button bg-red-500 text-white p-4 rounded-full"
              onMouseDown={handleMicButtonDown}
              onMouseUp={handleMicButtonUp}
              onTouchStart={handleMicButtonDown} // For mobile touch event
              onTouchEnd={handleMicButtonUp} // For mobile touch event
            >
              🎤
            </button>
          </div>
          {listening && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-2xl text-[#101010]">Say Pop ... 🎤</p>
          <p className="text-lg text-[#101010] mt-2">Heard: "{transcript}"</p>
        </div>
      )}
      

          {listening && (
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-center">
              <p className="text-lg font-bold text-red-500">Listening...</p>
            </div>
          )}
          {gameOver && <Confetti />}
        </>
      )}
    </div>
  );
}

export default BalloonSpace;
