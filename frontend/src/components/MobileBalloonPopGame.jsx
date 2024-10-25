import React, { useState, useEffect } from 'react';
import Balloon from './Balloon';
import BalloonStartScreen from './BalloonStartScreen';
import Waitlist from './Waitlist';
import './BalloonPopGame.css';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

function MobileBalloonPopGame() {
  const [balloon, setBalloon] = useState(null);
  const [recognition, setRecognition] = useState(null);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [showWaitlist, setShowWaitlist] = useState(false);

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

        if (finalTranscript.toLowerCase().includes('pop')) {
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
    if (gameOver && recognition) {
      recognition.stop();
      setListening(false);
    }
  }, [gameOver, recognition]);

  const addNewBalloon = () => {
    if (score < 5) {
      const newBalloon = {
        id: score,
        popped: false,
        image: balloonImages[score % balloonImages.length],
      };
      setBalloon(newBalloon);
    } else {
      setGameOver(true);
      setShowWaitlist(true);
    }
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
    if (!balloon?.popped && score < 5) {
      popSound.play();
      cheerSound.play();
      setScore((prevScore) => prevScore + 1);
      setBalloon((prevBalloon) => ({ ...prevBalloon, popped: true }));

      setTimeout(() => {
        addNewBalloon();
      }, 1000);
    }
  };

  const resetGame = () => {
    setScore(0);
    setGameOver(false);
    setShowWaitlist(false);
    addNewBalloon();
    startListening();
  };

  const playAgain = () => {
    resetGame();
    setShowPlayButton(true);  // Return to start screen
  };

  const startGame = () => {
    setShowPlayButton(false);
    setShowWaitlist(false);
    resetGame();
  };

  const formattedScore = score.toString().padStart(3, '0').split('');

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-[#FFEBDA] to-[#FBD5B5] relative">
      {/* Show Play Button when the game hasn't started */}
      {showPlayButton && (
        <BalloonStartScreen startGame={startGame} />
      )}

      {/* Show Waitlist when game is over */}
      {showWaitlist && (
        <Waitlist playAgain={playAgain} />
      )}

      {/* Main game UI when not on start screen or waitlist */}
      {!showWaitlist && !showPlayButton && (
        <>
          {/* Top bar with score, back, and exit buttons */}
          <div className="flex w-full justify-between items-center px-5 py-2 mt-2">
            <button className="icon-button" onClick={() => window.history.back()}>
              <img src="/back.png" alt="Back" className="w-8 h-8" />
            </button>

              <div className="score-box-container ml-[8vw]">
                {formattedScore.map((digit, index) => (
                  <div key={index} className="score-box">
                    {digit}
                  </div>
                ))}
              </div>

              {/* Control buttons for Play, Reset, and Listen */}
              {!gameOver && (
                <div className="flex items-center gap-4 ml-4">
                  <button className="icon-button" onClick={resetGame}>
                    <img src="/reset.png" alt="Reset" className="w-8 h-8" />
                  </button>
                  <button className="icon-button" onClick={listening ? stopListening : startListening}>
                    <img src={!listening ? '/play.png' : '/pause.png'} alt="Play/Pause" className="w-8 h-8" />
                  </button>
                  <button className="icon-button" onClick={() => setShowWaitlist(true)}>
              <img src="/exitbuttonround.png" alt="Exit" className="w-8 h-8" />
            </button>
                </div>
              )}
           

        
          </div>

          <div className="flex justify-center items-center mt-[10vw]">
            {balloon && (
              <Balloon isPopped={balloon.popped} imageSrc={balloon.image} isRising={true} />
            )}
          </div>

          {listening && (
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center">
              <p className="text-2xl text-[#101010]">Say Pop ... 🎤</p>
              <p className="text-lg text-[#101010] mt-2">Heard: "{transcript}"</p>
            </div>
          )}

          {gameOver && (
            <div className="absolute inset-0 flex justify-center items-center bg-opacity-50">
              <div className="text-center">
                <h2 className="text-3xl mb-4">Game Over!</h2>
                <button className="text-lg bg-blue-500 text-white py-2 px-4 rounded" onClick={playAgain}>
                  Play Again
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default MobileBalloonPopGame;
