import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Balloon from './Balloon';
import './BalloonPopGame.css';
import BalloonStartScreen from './BalloonStartScreen';
import Waitlist from './Waitlist';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

function BalloonPopGame() {
  const navigate = useNavigate();
  const [balloons, setBalloons] = useState([]);
  const [recognition, setRecognition] = useState(null);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isRising, setIsRising] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true); // State for play button
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [isLandscape, setIsLandscape] = useState(window.innerWidth > window.innerHeight);


  const popSound = new Audio('/burst.wav');
  const cheerSound = new Audio('/kids_cheering_short.mp3');

  const balloonImages = [
    '/balloon1.png',
    '/balloon2.png',
    '/balloon3.png',
    '/balloon4.png',
    '/balloon5.png',
  ];

  useEffect(() => {
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.lang = 'en-IND';
      recognitionInstance.interimResults = false;

      recognitionInstance.onresult = (event) => {
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript.trim();
          }
        }

        setTranscript(finalTranscript);

        if (finalTranscript.toLowerCase().includes('pop') || 
            finalTranscript.toLowerCase().includes('bob') || 
            finalTranscript.toLowerCase().includes('papa') ||
            finalTranscript.toLowerCase().includes('stop')) {
          popBalloon();
        }
      };

      setRecognition(recognitionInstance);
    }

    return () => {
      stopListening();
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (gameOver && recognition) {
      recognition.stop();
      setListening(false);
    }
  }, [gameOver, recognition]);

  const addInitialBalloons = () => {
    setIsRising(true);
    const initialBalloons = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      popped: false,
      image: balloonImages[i],
    }));
    setBalloons(initialBalloons);

    setTimeout(() => {
      setIsRising(false);
    }, 1000);
  };

  const startListening = () => {
    if (recognition && !listening && !gameOver) {
      recognition.start();
      setListening(true);
    }
  };

  const stopListening = () => {
    if (recognition && listening) {
      recognition.stop();
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

  const playAgain = () =>{
    setScore(0);
    setGameOver(false);
    setShowWaitlist(false);
    setShowPlayButton(true);
    setBalloons([]);
  }

  const startGame = () => {
    setShowPlayButton(false); // Hide the play button after starting the game
    addInitialBalloons();
    startListening();
  };

  const goToWaitlist = () => {
    stopListening();
    setShowWaitlist(true);
  };

  const goToStartScreen = () => {
    stopListening();
    if (gameOver) {
      setGameOver(false);
    } else {
      navigate('/');
    }
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
      {/* Show Play Button when user hasn't started the game */}
      {showPlayButton && (
        // <div className="absolute inset-0  flex justify-center items-center  bg-opacity-50 z-50">
        //   <button
        //     onClick={startGame}
        //     className="cursor-pointer hover:scale-110 active:scale-75"
        //   >
        //     <img src="/play.png" alt="Play" />
        //     {/* <p className="text-xl text-white ">Click to Play!</p>  */}
        //   </button>

        // </div>
        <BalloonStartScreen startGame = {startGame}/>
      )}

      {showWaitlist && (
        <Waitlist  playAgain={playAgain}/>
      )}

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
              <Balloon isPopped={balloon.popped} imageSrc={balloon.image} isRising={isRising} />
            </div>
          ))}
        </div>
      </div>

      {listening && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-2xl text-[#101010]">Say Pop ... 🎤</p>
          <p className="text-lg text-[#101010] mt-2">Heard: "{transcript}"</p>
        </div>
      )}
        </>
      )}
    </div>
  );
}

export default BalloonPopGame;
