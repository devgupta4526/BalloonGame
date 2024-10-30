import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Balloon from "./Balloon";
import "./BalloonPopGame.css";
import BalloonStartScreen from "./BalloonStartScreen";
import Waitlist from "./Waitlist";
import Confetti from "react-confetti";

const BalloonGoogleBase = () => {
  const navigate = useNavigate();
  const [balloons, setBalloons] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [cooldown, setCooldown] = useState(false);

  const popSound = new Audio("/burst.wav");
  const cheerSound = new Audio("/kids_cheering_short.mp3");

  const balloonImages = [
    "/balloon1.png",
    "/balloon2.png",
    "/balloon3.png",
    "/balloon4.png",
    "/balloon5.png",
  ];

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const lastPopTimeRef = useRef(0); // Track the last detected "pop" time

  const POP_THRESHOLD = 500; // Minimum time between "pop" detections in milliseconds

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
  };

  const playAgain = () => {
    setScore(0);
    setGameOver(false);
    setShowWaitlist(false);
    setShowPlayButton(true);
    setBalloons([]);
  };

  const goToStartScreen = () => {
    if (gameOver) {
      setGameOver(false);
    } else {
      navigate("/");
    }
  };

  // Handle recording audio for transcription
  const startRecording = async () => {
    console.log("Recording started.");
    setIsRecording(true);
    setTranscription(""); // Clear previous transcription
    audioChunksRef.current = []; // Clear previous audio chunks

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 16000, // Use 16 kHz sample rate for compatibility
          channelCount: 1, // Mono
        },
      });

      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "audio/webm; codecs=opus", // Use WEBM OPUS
      });

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        console.log("Recording stopped.");
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const audioBase64 = await blobToBase64(audioBlob);
        console.log("Audio data ready for transcription.");

        await transcribeAudio(audioBase64); // Transcribe when recording stops
      };

      mediaRecorderRef.current.start();
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      mediaRecorderRef.current.stop();
      console.log("Stop recording triggered.");
    }
  };

  // Convert audio blob to base64 for sending to the backend
  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(blob);
    });
  };

  // Function to send audio to the backend and get transcription
  const transcribeAudio = async (audioBase64) => {
    try {
      console.log("Sending audio for transcription...");
      const url = `${import.meta.env.VITE_BACKEND_URL}/transcribe`; // Ensure this is defined
      console.log(`Transcribing audio at: ${url}`);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ audioData: audioBase64 }),
      });

      const data = await response.json();
      console.log("Received transcription response:", data.transcription);
      setTranscription(data.transcription); // Update transcription state

      // Process transcription for "pop"
      processTranscription(data.transcription);
    } catch (error) {
      console.error("Error transcribing audio:", error);
      setTranscription("Error transcribing audio");
    }
  };

  // Process transcription for the word "pop"
  const processTranscription = (text) => {
    const detectedWords = text.split(" ");
    const currentTime = Date.now();

    detectedWords.forEach((word) => {
      if (word.toLowerCase() === "pop" || word.toLowerCase() === "bob" || word.toLowerCase() === "papa") {
        // Check the time since the last detected "pop"
        if (currentTime - lastPopTimeRef.current > POP_THRESHOLD) {
          lastPopTimeRef.current = currentTime;
          popBalloon(); // Trigger the balloon pop action
          console.log("Balloon popped!");
        } else {
          console.log("Ignored additional 'pop' detection.");
        }
      }
    });
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
        console.log(
          `[${new Date().toLocaleTimeString()}] Balloon popped! Current score: ${score + 1}`
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

  const formattedScore = score.toString().padStart(3, "0").split("");

  const getBalloonStyle = (index) => {
    const zigzagOffset = 5;
    const verticalOffset = index % 2 === 0 ? zigzagOffset : -zigzagOffset;
    return {
      transform: `translateY(${verticalOffset}vw)`,
      margin: "4vw",
    };
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space" && !isRecording) {
        startRecording();
      }
    };

    const handleKeyUp = (event) => {
      if (event.code === "Space" && isRecording) {
        stopRecording();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isRecording]);

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

            <div className="flex flex-col items-center justify-center ml-28">
              <div className="score-box-container">
                {formattedScore.map((digit, index) => (
                  <div key={index} className="score-box">
                    {digit}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              {!gameOver && (
                <button
                  className="icon-button cursor-pointer active:scale-75"
                  onClick={resetGame}
                >
                  <img src="/reset.png" alt="Reset" />
                </button>
              )}
              <button
                className="icon-button cursor-pointer active:scale-75"
                onClick={goToStartScreen}
              >
                <img src="/exitbuttonround.png" alt="Home" />
              </button>
            </div>
          </div>

          <div className="flex justify-center items-center mt-10">
            <div className="flex justify-center items-center">
              {balloons.map((balloon, index) => (
                <div key={balloon.id} style={getBalloonStyle(index)}>
                  <Balloon isPopped={balloon.popped} imageSrc={balloon.image} />
                </div>
              ))}
            </div>
          </div>

          {gameOver && <Confetti />}
          
         {/* Listening Prompt and Transcription Display */}
        <div className="flex-grow flex flex-col justify-end items-center mt-5">
          {isRecording && (
            <div className="text-xl text-red-600">Listening...</div>
          )}
          <div className="text-lg mt-2">{transcription || "Say 'pop' to pop a balloon!"}</div>
        </div>
      </>
    )}
    </div>
  );
};

export default BalloonGoogleBase;
