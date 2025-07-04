// Global variables
let randomNumber;
let attempts;
let wins = 0;
let losses = 0;
let previousGuesses = [];

// Event Listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);

// Initialize game when page loads
initializeGame();

function initializeGame() {
  randomNumber = Math.floor(Math.random() * 99) + 1;
  console.log("Random number: " + randomNumber);

  attempts = 0;
  previousGuesses = [];

  // Hiding the Reset button
  document.querySelector("#resetBtn").style.display = "none";

  // Showing and enabling the Guess button
  document.querySelector("#guessBtn").style.display = "inline";
  document.querySelector("#guessBtn").disabled = false;

  // Resetting the input textbox
  let playerGuess = document.querySelector("#playerGuess");
  playerGuess.focus(); // add focus
  playerGuess.value = ""; // clear box

  // Clearing feedback
  let feedback = document.querySelector("#feedback");
  feedback.textContent = "";

  // Clearing previous guesses
  document.querySelector("#guessList").textContent = "";

  // Update stats display
  document.querySelector("#stats").textContent = `🏆 Wins: ${wins} | ❌ Losses: ${losses}`;
}

function checkGuess() {
  let guess = parseInt(document.querySelector("#playerGuess").value);
  let feedback = document.querySelector("#feedback");

  // Validate input
  if (isNaN(guess) || guess < 1 || guess > 99) {
    feedback.textContent = "❗ Please enter a number between 1 and 99.";
    feedback.style.color = "red";
    return;
  }

  // Clear previous feedback
  feedback.textContent = "";
  feedback.style.color = "";

  // Count attempt and show guess
  attempts++;
  previousGuesses.push(guess);
  document.querySelector("#guessList").textContent = "Previous guesses: " + previousGuesses.join(", ");

  // Check win condition
  if (guess === randomNumber) {
    feedback.textContent = `🎉 You got it! It took you ${attempts} attempt(s).`;
    feedback.style.color = "green";
    wins++;
    gameOver();
  }
  // Check loss condition
  else if (attempts === 7) {
    feedback.textContent = `❌ Game over! The number was ${randomNumber}.`;
    feedback.style.color = "red";
    losses++;
    gameOver();
  }
  // Otherwise, give hint
  else if (guess < randomNumber) {
    feedback.textContent = "🔼 Too low! Try a higher number.";
    feedback.style.color = "black";
  } else {
    feedback.textContent = "🔽 Too high! Try a lower number.";
    feedback.style.color = "black";
  }

  // Reset input
  document.querySelector("#playerGuess").value = "";
  document.querySelector("#playerGuess").focus();
}

function gameOver() {
  // Disable Guess button, show Reset
  document.querySelector("#guessBtn").disabled = true;
  document.querySelector("#resetBtn").style.display = "inline";

  // Update score display
  document.querySelector("#stats").textContent = `🏆 Wins: ${wins} | ❌ Losses: ${losses}`;
}
