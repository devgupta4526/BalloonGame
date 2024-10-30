// server.js
const express = require("express");
const cors = require("cors");
const { SpeechClient } = require("@google-cloud/speech");
const { GoogleAuth } = require("google-auth-library");
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = 5000;

// Configure CORS
const allowedOrigins = [
  'https://balloon-game-three.vercel.app',
  'http://localhost:5173', // Add this for local development
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST'], // Specify allowed methods
  credentials: true, // Allow credentials if needed
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const auth = new GoogleAuth({
  credentials: {
    project_id: process.env.GOOGLE_CLOUD_PROJECT_ID,
    private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY.replace(/\\n/g, '\n'), // Replace escaped newline
    client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
  },
  scopes: ["https://www.googleapis.com/auth/cloud-platform"],
});
const client = new SpeechClient({ auth });

app.post("/transcribe", async (req, res) => {
  try {
    console.log("Transcription request received.");
    const audioData = req.body.audioData;
    console.log("Audio data length:", audioData.length);

    const audioBytes = Buffer.from(audioData, "base64");

    const [response] = await client.recognize({
      audio: { content: audioBytes.toString("base64") },
      config: {
        encoding: 'WEBM_OPUS',
        sampleRateHertz: 48000, // Adjusted sample rate for short audio
        languageCode: 'en-US',
        model: "command_and_search",
        useEnhanced: true,
        speechContexts: [
          {
            phrases: ["pop", "stop", "go", "pause", "yes", "no"],
            boost: 120, // Increase to capture single words
          },
        ],
      },
    });

    if (response && response.results) {
      const transcription = response.results
        .map((result) => result.alternatives[0].transcript)
        .join("\n");
      console.log("Transcription result:", transcription);
      res.json({ transcription });
    } else {
      console.log("No transcription received.");
      res.json({ transcription: "No transcription available" });
    }
  } catch (error) {
    console.error("Error transcribing audio:", error);
    res.status(500).send("Error transcribing audio");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
