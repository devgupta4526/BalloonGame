

# Balloon Pop Game - Overview and Troubleshooting

### Folder Structure
```
frontend/
│
├── public/                      # Public assets folder
│   ├── ballonimage.png          # Stores images for balloons, mascot, etc.
│   ├── etc....                  # Stores audio files for game sound effects
│
├── src/                         # Main source folder for React components and logic
│   ├── components/              # Component folder containing all UI components
│   │   ├── Balloon.js           # Balloon component for each balloon displayed on screen
│   │   ├── BalloonSpace.js      # Main game logic and layout component
│   │   ├── BalloonStartScreen.js # Initial start screen for the game
│   │   ├── Waitlist.js          # Signup form for early access
│   │   ├── Mascot.js            # Mascot component with guiding messages
│   │   ├── Balloon.css          # Styles specific to the Balloon component
│   │   ├── BalloonSpace.css     # Styles for the main game layout
```

---

### Key Components and Functionality

#### `BalloonSpace` Component
The main component for the Balloon Pop Game, responsible for:
- Managing game states like `score`, `gameOver`, and `cooldown`.
- Handling speech recognition to pop balloons when specific words are detected.
- Rendering game visuals, like balloons and confetti, based on the current score and game status.

#### Key Variables and Constants
- **`balloons`**: Array of balloon objects, each with properties like `id`, `popped`, and `image`.
- **`recognition`**: Instance of `SpeechRecognition` (or `webkitSpeechRecognition`), used for speech detection.
- **`cooldown`**: Prevents multiple pops in rapid succession by setting a cooldown period after each balloon pop.

---

### Game Flow

1. **Start Screen**: Players begin by pressing a button, which initializes the balloons and begins the game.
2. **Speech Recognition**: Activated via the spacebar on laptops or a microphone button on mobile devices.
   - Recognizes phrases like "pop," "stop," "bob," or "papa."
3. **Balloon Popping**: Balloons pop when the correct words are detected.
4. **Score and Game Over**: Score increments with each pop, and a game-over sequence starts once all balloons are popped.

---

### Troubleshooting and Issues

#### 1. **Multiple Balloons Popping at Once**
   - **Issue**: Sometimes, multiple balloons are recognized as popped simultaneously, leading to an incorrect score count .
   - **Probable Cause**: This may be due to recognition inaccuracies, delays in response or delays in resetting the cooldown timer.
   - **Solution**: The cooldown mechanism ensures only one balloon pops per second. Adjust the `cooldown` duration as needed.
   - **After Implementation**: Even after the cooldown mechanism multiple ballons are poping.

#### 2. **Speech Recognition Delays and Inconsistencies**
   - **Issue**: Speech recognition behaves differently across browsers and devices, leading to inconsistent detection.
   - **Probable Cause**: SpeechRecognition API’s performance can vary significantly between Chrome, Safari, and other platforms.
   - **Solution**: To handle inconsistencies, ensure a fallback approach for non-supported browsers or consider using a third-party speech recognition library for better cross-platform compatibility.

#### 3. **Different Speech Recognition on Mobile and Laptop**
   - **Issue**: The recognition works differently based on device due to varying microphone sensitivities and browser optimizations.
   - **Solution**: .

#### 4. **Delay in Speech Recognition after Popping Two Balloons**
   - **Issue**: There’s a noticeable delay in processing after popping two balloons in quick succession.
   - **Solution**: Implement timing information in the `onresult` event to log when results are received. Additionally, consider adding a delay or visual feedback if a response isn't received within a certain time.

#### 5. **Pop word is not recognised as single word need to speak pop twice and multiple pop are not recognised**
   - **Issue**: The Api is not trained on pop so good consider it as noise if multiple times it occurs gives stop papa bob as another response result.
   - **Solution**: .

---

### Key Code Sections

#### Speech Recognition Implementation
```javascript
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

useEffect(() => {
  if (SpeechRecognition) {
    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = true;
    recognitionInstance.lang = "en-IND";
    recognitionInstance.interimResults = true;

    recognitionInstance.grammars = new (window.SpeechGrammarList || window.webkitSpeechGrammarList)();
    recognitionInstance.grammars.addFromString(
      "#JSGF V1.0; grammar words; public <word> = pop | stop | bob | papa;", 1
    );

    recognitionInstance.onstart = () => setListening(true);
    recognitionInstance.onresult = (event) => {
      const currentTranscript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join(" ");

      if (/pop|stop|bob|papa/.test(currentTranscript.toLowerCase())) {
        popBalloon();
      }
    };

    recognitionInstance.onend = () => setListening(false);
    recognitionInstance.onerror = (event) => console.error("Speech recognition error:", event.error);

    setRecognition(recognitionInstance);
  }
}, []);
```

#### Balloon Pop Logic with Cooldown
```javascript
const popBalloon = () => {
  if (cooldown) return; // Prevent popping if cooldown is active
  setCooldown(true);

  setTimeout(() => setCooldown(false), 1000); // Adjust this time as needed for cooldown duration

  setBalloons((prevBalloons) => {
    const firstUnpopped = prevBalloons.find((balloon) => !balloon.popped);
    if (firstUnpopped) {
      popSound.play();
      cheerSound.play();
      setScore((prevScore) => prevScore + 1);

      return prevBalloons.map((balloon) =>
        balloon.id === firstUnpopped.id ? { ...balloon, popped: true } : balloon
      );
    }
    return prevBalloons;
  });
};
```

---

### Event Handling for Mobile vs. Laptop

#### Spacebar for Speech Recognition (Laptop)
- Spacebar is held down to activate recognition and released to stop.

```javascript
useEffect(() => {
  const handleKeyDown = (event) => {
    if (event.code === "Space") startListening();
  };

  const handleKeyUp = (event) => {
    if (event.code === "Space") stopListening();
  };

  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
  };
}, []);
```

#### Mic Button (Mobile)
- For mobile, users press and hold a microphone button to activate speech recognition.

```javascript
const handleMicButtonDown = () => startListening();
const handleMicButtonUp = () => stopListening();
```

---


### More Code Explanation Below
Certainly! Let's go through this code block by block:

### 1. **State Initialization**

```javascript
const [balloons, setBalloons] = useState([]);
const [recognition, setRecognition] = useState(null);
const [listening, setListening] = useState(false);
const [transcript, setTranscript] = useState("");
const [score, setScore] = useState(0);
const [gameOver, setGameOver] = useState(false);
const [showPlayButton, setShowPlayButton] = useState(true);
const [showWaitlist, setShowWaitlist] = useState(false);
const [cooldown, setCooldown] = useState(false);
const [mascotMessage, setMascotMessage] = useState("Welcome! Pop the balloons!");
```

This section defines various states used throughout the game:
   - `balloons`: Stores the array of balloons with properties like `id` and `popped` status.
   - `recognition`: Holds the speech recognition instance.
   - `listening`: Tracks whether speech recognition is active.
   - `transcript`: Stores the latest transcript from speech recognition.
   - `score`: Tracks the current score.
   - `gameOver`: Boolean to indicate if the game is over.
   - `showPlayButton`, `showWaitlist`: Control the visibility of the play button and waitlist screen.
   - `cooldown`: Prevents immediate reactivation of balloon popping after each pop.
   - `mascotMessage`: Displays messages to guide or encourage the player.

### 2. **Audio and Balloon Image Setup**

```javascript
const popSound = new Audio("/burst.wav");
const cheerSound = new Audio("/kids_cheering_short.mp3");

const balloonImages = [
  "/balloon1.png",
  "/balloon2.png",
  "/balloon3.png",
  "/balloon4.png",
  "/balloon5.png",
];
```

Defines audio files for the pop and cheer sounds and an array of balloon images for visual representation.

### 3. **Variables for Spacebar Timing**

```javascript
let spacebarPressTime = 0;
let spacebarReleaseTime = 0;
let recognitionStartTime = 0;
```

These variables help track the duration of spacebar presses, used to start/stop speech recognition, and to measure the time since recognition started.

### 4. **Speech Recognition Initialization**

```javascript
useEffect(() => {
  if (SpeechRecognition) {
    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = true;
    recognitionInstance.lang = "en-IND";
    recognitionInstance.interimResults = true;
```

Inside a `useEffect` hook, this section initializes the `SpeechRecognition` API:
   - `continuous` enables continuous speech recognition.
   - `lang` sets the language.
   - `interimResults` allows real-time transcription updates.

### 5. **Speech Grammar Setup**

```javascript
    recognitionInstance.grammars = new (window.SpeechGrammarList || window.webkitSpeechGrammarList)();
    recognitionInstance.grammars.addFromString(
      "#JSGF V1.0; grammar words; public <word> = pop | stop | bob | papa;",
      1
    );
```

Defines a grammar list that recognizes specific words: "pop," "stop," "bob," and "papa," making it easier to match these words during speech recognition.

### 6. **Speech Recognition Event Handlers**

```javascript
    recognitionInstance.onstart = () => {
      recognitionStartTime = new Date().getTime();
      console.log(`[${new Date().toLocaleTimeString()}] Speech recognition started`);
      setListening(true);
    };
    
    let isProcessingResult = false;
    recognitionInstance.onresult = (event) => {
      if (isProcessingResult) return;
      isProcessingResult = true;

      const currentTranscript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join(" ");

      const resultTime = new Date().getTime();
      const timeToResult = resultTime - recognitionStartTime;

      console.log(`[${new Date().toLocaleTimeString()}] Transcript received: "${currentTranscript}"`);
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
        isProcessingResult = false;
      }, 100);
    };
```

- **`onstart`**: Fires when speech recognition starts, recording the start time.
- **`onresult`**: Runs when speech recognition produces results. It checks the transcript for specific keywords, processes a pop if they are found, and handles potential delays using a flag `isProcessingResult`.

### 7. **Speech Recognition Error Handling and Cleanup**

```javascript
    recognitionInstance.onend = () => {
      console.log(`[${new Date().toLocaleTimeString()}] Speech recognition ended`);
      setListening(false);
    };

    recognitionInstance.onerror = (event) => {
      console.error(`[${new Date().toLocaleTimeString()}] Speech recognition error:`, event.error);
    };

    setRecognition(recognitionInstance);
  }

  return () => {
    stopListening();
  };
}, []);
```

- **`onend`**: Detects when recognition ends, logging it and setting `listening` to false.
- **`onerror`**: Logs any recognition errors.
- **Cleanup**: Ensures recognition stops when the component unmounts.

### 8. **Mic Button Logic**

```javascript
const handleMicButtonDown = () => {
  startListening();
  console.log("Mic button pressed: Starting speech recognition");
};

const handleMicButtonUp = () => {
  stopListening();
  console.log("Mic button released: Stopping speech recognition");
};
```

Starts and stops speech recognition on mic button presses, allowing the player to control recognition on mobile.

### 9. **Spacebar Press/Release Handlers**

```javascript
useEffect(() => {
  const handleKeyDown = (event) => {
    if (event.code === "Space") {
      event.preventDefault();
      spacebarPressTime = new Date().getTime();
      startListening();
    }
  };

  const handleKeyUp = (event) => {
    if (event.code === "Space") {
      spacebarReleaseTime = new Date().getTime();
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
```

Handles starting and stopping recognition based on spacebar presses, with event listeners to prevent default scrolling.

### 10. **Listening Control Functions**

```javascript
const startListening = () => {
  if (recognition && !listening && !gameOver) {
    recognition.start();
  }
};

const stopListening = () => {
  if (recognition && listening) {
    recognition.stop();
    setTranscript("");
  }
};
```

Functions to start and stop speech recognition, ensuring it only runs when appropriate.

### 11. **Balloon Pop Logic**

```javascript
const popBalloon = () => {
  if (cooldown) return;

  setCooldown(true);
  setTimeout(() => setCooldown(false), 1000);

  setBalloons((prevBalloons) => {
    const firstUnpopped = prevBalloons.find((balloon) => !balloon.popped);
    if (firstUnpopped) {
      popSound.play();
      cheerSound.play();
      setScore((prevScore) => prevScore + 1);
      updateMascotMessage("Well Done! Keep going!");
      console.log(`[${new Date().toLocaleTimeString()}] Balloon popped! Current score: ${score + 1}`);

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
```

Handles popping a balloon, incrementing the score, and updating the mascot message. If all balloons are popped, it sets `gameOver` to true.

### 12. **Game Control Functions**

```javascript
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
  startGame();
};

const playAgain = () => {
  setScore(0);
  setGameOver(false);
  setShowWaitlist(false);
  setShowPlayButton(true);
  setBalloons([]);
};

const goToStartScreen = () => {
  stopListening();
  if (gameOver) {
    setGameOver(false);
  } else {
    navigate("/");
 

 }
};
```

Controls starting, resetting, and playing again, managing `score` and `gameOver` states.



### Assets
- **Images**: Balloon images and button icons are stored in the `public` folder (e.g., `/balloon1.png`, `/reset.png`).
- **Audio**: `burst.wav` and `kids_cheering_short.mp3` are stored in the `public` folder.
