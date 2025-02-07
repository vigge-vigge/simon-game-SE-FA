// Game State
const gameState = {
  score: 0,                      // Initialize score to 0
  level: 1,                      // Initialize level to 1
  pattern: [],                   // Empty array to hold the game's pattern of button presses
  playerPattern: [],             // Empty array to hold the player's attempts at replicating the pattern
  availableButtons: ['circle1', 'circle2', 'circle3', 'circle4'], // List of button IDs the player can press
  stepIndex: 0,                  // Keeps track of the current step (index) in the pattern for displaying it to the player
};

// Attach functions to the window for testing purposes
window.gameState = gameState;                      // Makes the `gameState` object accessible from the window for testing
window.initiateNewGame = initiateNewGame;          // Makes the `initiateNewGame` function accessible globally
window.refreshScore = refreshScore;                // Makes the `refreshScore` function accessible globally
window.refreshLevel = refreshLevel;                // Makes the `refreshLevel` function accessible globally
window.startNewSequence = startNewSequence;        // Makes the `startNewSequence` function accessible globally
window.processUserInput = processUserInput;        // Makes the `processUserInput` function accessible globally
window.highlightButton = highlightButton;          // Makes the `highlightButton` function accessible globally
window.triggerGameOver = triggerGameOver;          // Makes the `triggerGameOver` function accessible globally

// Initialize Game Functionality
document.addEventListener("DOMContentLoaded", () => {
  const newGameButton = document.querySelector(".start-btn"); // Get the "Start New Game" button element
  const playAgainButton = document.querySelector(".game-over .start-btn"); // Get the "Play Again" button on the Game Over screen

  newGameButton.addEventListener("click", initiateNewGame); // Attach event listener to the "Start New Game" button
  playAgainButton.addEventListener("click", initiateNewGame); // Attach event listener to the "Play Again" button

  // Attach event listeners to circles (buttons) for player input
  const circles = document.querySelectorAll(".circle"); // Get all elements with class "circle" (the buttons)
  circles.forEach(circle => {
    circle.addEventListener("click", processUserInput); // For each circle, add an event listener for the click event
  });
});

// Start a New Game
function initiateNewGame() {
  gameState.score = 0;                    // Reset score to 0
  gameState.level = 1;                    // Reset level to 1
  gameState.pattern = [];                 // Clear the game pattern
  gameState.playerPattern = [];           // Clear the player's pattern
  gameState.stepIndex = 0;                // Reset the step index
  refreshScore();                         // Update the score display
  refreshLevel();                         // Update the level display

  // Hide the game-over screen when starting a new game
  document.getElementById('game-over').style.display = 'none';

  startNewSequence(); // Start the first sequence in the game
}

// Update Score Display
function refreshScore() {
  document.getElementById("score-display").textContent = gameState.score; // Update the score displayed on the page
}

// Update Level Display
function refreshLevel() {
  document.getElementById("level-display").textContent = `Level: ${gameState.level}`; // Update the level displayed on the page
}

// Start a New Sequence for the Player
function startNewSequence() {
  gameState.playerPattern = []; // Clear the player's pattern for the new sequence
  const randomCircle = gameState.availableButtons[Math.floor(Math.random() * gameState.availableButtons.length)]; // Randomly select one button from available buttons
  gameState.pattern.push(randomCircle); // Add the random button to the game pattern
  displaySequence(); // Display the pattern to the player
}

// Display the Sequence to the Player
function displaySequence() {
  gameState.stepIndex = 0; // Reset the step index to 0
  const interval = setInterval(() => {
    highlightButton(gameState.pattern[gameState.stepIndex]); // Highlight the current button in the pattern
    gameState.stepIndex++; // Move to the next step in the pattern
    if (gameState.stepIndex === gameState.pattern.length) { // If all steps in the pattern have been shown
      clearInterval(interval); // Stop displaying the sequence
    }
  }, 800); // Delay between each step of the pattern (800 ms)
}

// Process User Input (Button Click)
function processUserInput(event) {
  const selectedButton = event.target.id; // Get the ID of the button clicked by the player
  highlightButton(selectedButton); // Highlight the button to show feedback
  gameState.playerPattern.push(selectedButton); // Add the player's choice to their pattern
  verifyUserInput(); // Check if the player's pattern matches the game pattern
}

// Highlight Button for Feedback
function highlightButton(buttonId) {
  const button = document.getElementById(buttonId); // Get the button element by ID
  button.classList.add("light"); // Add a "light" class to highlight the button (e.g., change color)
  setTimeout(() => {
    button.classList.remove("light"); // Remove the "light" class after 400 ms to stop highlighting the button
  }, 400); // Timeout duration for the highlight effect
}

// Verify if User's Pattern Matches the Game's Pattern
function verifyUserInput() {
  const lastInputIndex = gameState.playerPattern.length - 1; // Get the last button clicked by the player
  if (gameState.pattern[lastInputIndex] === gameState.playerPattern[lastInputIndex]) { // Check if the last player input matches the game pattern
    if (gameState.pattern.length === gameState.playerPattern.length) { // If the player has matched the entire pattern
      gameState.score++; // Increase the score
      gameState.level++; // Increase the level
      refreshScore(); // Update the score display
      refreshLevel(); // Update the level display
      setTimeout(startNewSequence, 1000); // Wait for 1 second before starting a new sequence
    }
  } else {
    triggerGameOver(); // If the player made a mistake, trigger the game over function
  }
}

// Trigger Game Over if User Makes an Error
function triggerGameOver() {
  document.getElementById('final-score').textContent = gameState.score; // Display the final score
  document.getElementById('final-level').textContent = gameState.level; // Display the final level

  // Display the Game Over Screen
  document.getElementById('game-over').style.display = 'block';
}
