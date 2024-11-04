import React from 'react';
import './Balloon.css';

const Balloon = ({ isPopped , imageSrc, isRising }) => {
  // console.log("Balloon props - isPopped:", isPopped, "imageSrc:", imageSrc);
  const generateConfettiStyles = () => {
    const randomRotation = Math.floor(Math.random() * 360);
    const randomScale = Math.random() * 1 + 0.5;
    const randomX = Math.floor(Math.random() * 200) - 100;
    const randomY = Math.floor(Math.random() * 200) - 100;

    return {
      transform: `rotate(${randomRotation}deg) scale(${randomScale})`,
      backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
      '--confetti-final-x': `${randomX}px`,
      '--confetti-final-y': `${randomY}px`,
    };
  };

  const generateFragmentStyles = () => {
    const randomX = Math.floor(Math.random() * 200) - 100;
    const randomY = Math.floor(Math.random() * 200) - 100;

    return {
      '--fragment-final-x': `${randomX}px`,
      '--fragment-final-y': `${randomY}px`,
    };
  };

  // Generate random animation properties
  const randomFloatDistance = Math.random() * 15 + 5; // Random distance for float
  const randomFloatDuration = Math.random() * 2 + 3; // Random duration between 3s to 5s
  const randomSwayDistance = Math.random() * 10 + 5; // Random distance for sway
  const randomSwayDuration = Math.random() * 2 + 3; // Random duration between 3s to 5s

  const balloonStyle = !isRising ? {
    animation: `float ${randomFloatDuration}s ease-in-out infinite`,
    transform: `translateX(${randomFloatDistance}px)`,
  } : {};

  const swayStyle = !isRising ? {
    animation: `float-horizontal ${randomSwayDuration}s ease-in-out infinite`,
    transform: `translateX(${randomSwayDistance}px)`,
  } : {};  

  return (
    <div className="balloon-container">
      {!isPopped ? (
        <div  className={`balloon w-[16vw] lg:w-[8vw] lg:h-[10vw] h-[12vw] ${isRising ? 'balloon-rise' : ''}`}  style={balloonStyle}>
          <img src={imageSrc} alt="Balloon" style={swayStyle}/>
        </div>
      ) : (
        <div className="popped-container">
          <div className="fragment-container">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="balloon-fragment"
                style={generateFragmentStyles()}
              />
            ))}
          </div>
          <div className="confetti-container">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="confetti-piece"
                style={generateConfettiStyles()}
              />
            ))}
          </div>
          <div className="animal-reveal">🐯</div>
        </div>
      )}
    </div>
  );
};

export default Balloon;
