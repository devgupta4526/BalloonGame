

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

#### 5. **Delay in Speech Recognition after Popping Two Balloon**
   - **Issue**: There’s a noticeable delay in processing after popping two balloons in quick succession.
   - **Solution**: Implement timing information in the `onresult` event to log when results are received. Additionally, consider adding a delay or visual feedback if a response isn't received within a certain time.

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

### Assets
- **Images**: Balloon images and button icons are stored in the `public` folder (e.g., `/balloon1.png`, `/reset.png`).
- **Audio**: `burst.wav` and `kids_cheering_short.mp3` are stored in the `public` folder.
