const speech = require("@google-cloud/speech");
const fs = require("fs");

// Initialize the Speech-to-Text client with the Google Cloud service account key
const client = new speech.SpeechClient({ keyFilename: "/glass-setting-438008-u2-5c2c26c2800f.json" });

async function transcribeAudio(audioFilePath) {
  const audio = {
    content: fs.readFileSync(audioFilePath).toString("base64"),
  };
  const config = {
    encoding: "LINEAR16",  // Adjust if needed based on your audio file's encoding
    sampleRateHertz: 16000, // Adjust if needed based on your audio file
    languageCode: "en-US",
  };
  const request = { audio, config };

  try {
    const [response] = await client.recognize(request);
    const transcription = response.results.map(result => result.alternatives[0].transcript).join("\n");
    console.log(`Transcription: ${transcription}`);
    return transcription;
  } catch (error) {
    console.error("Error transcribing audio:", error);
  }
}

// Test the function
transcribeAudio("path/to/your-audio-file.wav");
