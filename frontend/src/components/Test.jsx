import React, { useEffect, useState } from 'react';

const Test = () => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [startTime, setStartTime] = useState(0); // State to track the start time
  let debounceTimeout;

  useEffect(() => {
    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const newRecognition = new SpeechRecognition();
      newRecognition.continuous = true; // Continuous listening
      newRecognition.interimResults = true; // Get interim results

      newRecognition.onstart = () => {
        console.log('Speech recognition started');
        setIsListening(true);
        setStartTime(Date.now()); // Set the start time when recognition starts
      };

      newRecognition.onresult = (event) => {
        const currentTranscript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join(' ');
        console.log('Speech recognition result received:', currentTranscript);

        // Calculate elapsed time in seconds
        const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
        console.log(`Elapsed time: ${elapsedTime} seconds`);

        // Clear the previous debounce timeout
        clearTimeout(debounceTimeout);

        // Set a new debounce timeout
        debounceTimeout = setTimeout(() => {
          setTranscript(currentTranscript);
          console.log('Updated transcript:', currentTranscript);
        }, 500); // Increased debounce timing
      };

      newRecognition.onend = () => {
        console.log('Speech recognition ended');
        setIsListening(false);
      };

      newRecognition.onerror = (event) => {
        console.error('Error occurred in recognition:', event.error);
      };

      setRecognition(newRecognition);
    } else {
      console.error('Speech recognition not supported');
    }

    return () => {
      // Cleanup on component unmount
      if (recognition) {
        recognition.stop();
        recognition.onend = null;
        recognition.onerror = null;
        clearTimeout(debounceTimeout);
      }
    };
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === ' ') {
      event.preventDefault(); // Prevent scrolling when spacebar is pressed
      if (!isListening) {
        console.log('Starting speech recognition...');
        recognition.start();
      } else {
        console.log('Stopping speech recognition...');
        recognition.stop();
      }
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === ' ') {
      console.log('Spacebar released.');
      if (isListening) {
        recognition.stop(); // Stop on spacebar release
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp); // Added keyup listener

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp); // Cleanup keyup listener
    };
  }, [isListening, recognition]);

  return (
    <div>
      <h1>Speech Recognition Test</h1>
      <p>Press and hold the spacebar to speak.</p>
      <p>Transcript: {transcript}</p>
    </div>
  );
};

export default Test;
