// src/AudioRecorder.js
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const MIN_RECORDING_DURATION = 300; // Minimum recording duration in milliseconds
const POP_THRESHOLD = 500; // Minimum time between "pop" detections in milliseconds

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [transcription, setTranscription] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const startTimeRef = useRef(null);
  const lastPopTimeRef = useRef(0); // Track the last detected "pop" time

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
      const response = await axios.post("http://localhost:5000/transcribe", {
        audioData: audioBase64,
      });
      console.log("Received transcription response:", response.data.transcription);
      setTranscription((prev) => `${prev} ${response.data.transcription}`.trim()); // Append transcription

      // Process transcription for "pop"
      processTranscription(response.data.transcription);
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
      if (word.toLowerCase() === "pop") {
        // Check the time since the last detected "pop"
        if (currentTime - lastPopTimeRef.current > POP_THRESHOLD) {
          lastPopTimeRef.current = currentTime;
          triggerBalloonPop(); // Trigger the balloon pop action
          console.log("Balloon popped!");
        } else {
          console.log("Ignored additional 'pop' detection.");
        }
      }
    });
  };

  // Start recording function
  const startRecording = async () => {
    console.log("Recording started.");
    setIsRecording(true);
    setTranscription(""); // Clear previous transcription
    audioChunksRef.current = []; // Clear previous audio chunks
    startTimeRef.current = Date.now(); // Record the start time

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
        setAudioURL(URL.createObjectURL(audioBlob));
        console.log("Audio data ready for transcription.");

        // Check if recording duration is sufficient
        const duration = Date.now() - startTimeRef.current;
        if (duration < MIN_RECORDING_DURATION) {
          console.log(`Short recording detected (<${MIN_RECORDING_DURATION} ms). Adding buffer delay.`);
          setTimeout(() => {
            transcribeAudio(audioBase64);
          }, MIN_RECORDING_DURATION - duration);
        } else {
          await transcribeAudio(audioBase64); // Transcribe when recording stops
        }
      };

      mediaRecorderRef.current.start();
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  // Stop recording function
  const stopRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      mediaRecorderRef.current.stop();
      console.log("Stop recording triggered.");
    }
  };

  // Event listeners to handle space bar press and release
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

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isRecording]);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Audio Recorder</h2>
      <p>Press and hold the space bar to record. Release to stop and transcribe.</p>

      {audioURL && (
        <div>
          <h4>Recorded Audio:</h4>
          <audio src={audioURL} controls />
        </div>
      )}

      {transcription && (
        <div>
          <h4>Transcription:</h4>
          <p>{transcription}</p>
        </div>
      )}
    </div>
  );
};

// Function to trigger balloon pop action
const triggerBalloonPop = () => {
  // Implement your balloon pop logic here
  console.log("Balloon should pop now!");
};

export default AudioRecorder;
