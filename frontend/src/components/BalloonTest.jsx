import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Balloon from './Balloon';
import './BalloonPopGame.css';
import BalloonStartScreen from './BalloonStartScreen';
import Waitlist from './Waitlist';
import { createModel } from 'vosk-browser'; // Correct import for Vosk

const AUDIO_PATHS = {
  pop: '/burst.wav',
  cheer: '/kids_cheering_short.mp3',
};

const BALLOON_IMAGES = [
  '/balloon1.png',
  '/balloon2.png',
  '/balloon3.png',
  '/balloon4.png',
  '/balloon5.png',
];

const INITIAL_BALLOON_COUNT = 5;

function BalloonTest() {
  const navigate = useNavigate();
  const [balloons, setBalloons] = useState([]);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [partial, setPartial] = useState("");
  const recognizerRef = useRef(null);
  const popSound = new Audio(AUDIO_PATHS.pop);
  const cheerSound = new Audio(AUDIO_PATHS.cheer);
  const [isLandscape, setIsLandscape] = useState(window.innerWidth > window.innerHeight);
  
  useEffect(() => {
    const loadModel = async (path) => {
      setLoading(true);
      recognizerRef.current?.terminate(); // Terminate old recognizer if exists

      const modelPath = `/models/${path}`; // Adjust the model path as necessary
      const model = await createModel(modelPath);
      setModel(model);

      const recognizer = new model.KaldiRecognizer(48000); // Use the correct sample rate for your model
      recognizer.setWords(true); // Enable word recognition

      // Handle recognition results
      recognizer.on("result", (message) => {
        const result = message.result;
        setTranscript(result.text);
        if (result.text.toLowerCase().includes('pop') || result.text.toLowerCase().includes('bob') || result.text.toLowerCase().includes('op') ) {
          popBalloon();
        }
      });

      // Handle partial recognition results
      recognizer.on("partialresult", (message) => {
        setPartial(message.result.partial);
      });

      recognizerRef.current = recognizer; // Store the recognizer in ref
      setLoading(false);
    };

    loadModel("vosk-model-small-en-in-0.4.tar.gz"); // Load the Vosk model

    const handleResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const addInitialBalloons = () => {
    const initialBalloons = Array.from({ length: INITIAL_BALLOON_COUNT }, (_, index) => ({
      id: index,
      popped: false,
      image: BALLOON_IMAGES[index % BALLOON_IMAGES.length],
    }));
    setBalloons(initialBalloons);
  };

  const startListening = async () => {
    if (model && !listening && !gameOver) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new AudioContext();
        const source = audioContext.createMediaStreamSource(stream);

        // Create a recognizer node
        const recognizerNode = audioContext.createScriptProcessor(4096, 1, 1);
        recognizerNode.onaudioprocess = (event) => {
          if (recognizerRef.current) {
            recognizerRef.current.acceptWaveform(event.inputBuffer);
          }
        };

        source.connect(recognizerNode);
        recognizerNode.connect(audioContext.destination); // Connect to output to avoid audio processing issues

        setListening(true);
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    }
  };

  const stopListening = () => {
    if (recognizerRef.current && listening) {
      recognizerRef.current.remove(); // Remove the recognizer
      setListening(false);
    }
  };

  const popBalloon = () => {
    setBalloons((prevBalloons) => {
      const firstUnpopped = prevBalloons.find((balloon) => !balloon.popped);
      if (firstUnpopped) {
        popSound.play();
        cheerSound.play();
        setScore((prevScore) => prevScore + 1);

        const updatedBalloons = prevBalloons.map((balloon) =>
          balloon.id === firstUnpopped.id ? { ...balloon, popped: true } : balloon
        );

        // Check if all balloons are popped
        if (updatedBalloons.every((balloon) => balloon.popped)) {
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

  const resetGame = () => {
    setScore(0);
    setGameOver(false);
    addInitialBalloons();
    startListening();
  };

  const playAgain = () => {
    setScore(0);
    setGameOver(false);
    setShowWaitlist(false);
    setShowPlayButton(true);
    setBalloons([]);
  };

  const startGame = () => {
    setShowPlayButton(false);
    addInitialBalloons();
    startListening();
  };

  const goToWaitlist = () => {
    stopListening();
    setShowWaitlist(true);
  };

  const goToStartScreen = () => {
    stopListening();
    navigate('/');
  };

  const formattedScore = score.toString().padStart(3, '0').split('');

  const getBalloonStyle = (index) => {
    const zigzagOffset = 5;
    const verticalOffset = index % 2 === 0 ? zigzagOffset : -zigzagOffset;
    return {
      transform: `translateY(${verticalOffset}vw)`,
      margin: '4vw',
    };
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-[#FFEBDA] to-[#FBD5B5] relative">
      {showPlayButton && <BalloonStartScreen startGame={startGame} />}
      {showWaitlist && <Waitlist playAgain={playAgain} />}

      {!showWaitlist && (
        <>
          <div className="flex w-full justify-between items-center px-5 py-2 mt-2">
            <button className="icon-button cursor-pointer active:scale-75" onClick={goToStartScreen}>
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
                  <button className="icon-button cursor-pointer active:scale-75" onClick={resetGame}>
                    <img src="/reset.png" alt="Reset" />
                  </button>
                  <button className="icon-button cursor-pointer active:scale-75" onClick={listening ? stopListening : startListening}>
                    <img src={!listening ? '/play.png' : '/pause.png'} alt="Play/Pause" />
                  </button>
                </>
              )}
              <button className="icon-button cursor-pointer active:scale-75" onClick={goToWaitlist}>
                <img src="/exitbuttonround.png" alt="Home" />
              </button>
            </div>
          </div>

          <div className="flex justify-center items-center mt-40">
            <div className="flex justify-center items-center">
              {balloons.map((balloon, index) => (
                <div key={balloon.id} style={getBalloonStyle(index)}>
                  <Balloon isPopped={balloon.popped} imageSrc={balloon.image} />
                </div>
              ))}
            </div>
          </div>

          {listening && (
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center">
              <p className="text-2xl text-[#101010]">Say Pop ... 🎤</p>
              <p className="text-lg text-[#101010] mt-2">Heard: "{partial}"</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default BalloonTest;
