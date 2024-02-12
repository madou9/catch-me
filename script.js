// Select elements from the DOM
const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');

// Define game variables
let lastHole;
let timeUp = false;
let score = 0;

// Function to generate a random time between min and max
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// Function to select a random hole
function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    // If the same hole is selected, recursively call the function to find a different one
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

// Function to show a mole in a random hole
function peep() {
  if (timeUp) return; // Exit the function if time is up
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    // Call peep recursively to show another mole
    peep();
  }, time);
}

// Function to start the game
function startGame() {
  score = 0;
  updateScore(0);
  timeUp = false;
  peep();
  setTimeout(() => {
    timeUp = true;
    alert('Time\'s up!');
  }, 10000); // Set the game duration to 10 seconds
}

// Function to handle clicking on a mole
function bonk(e) {
  if (!e.isTrusted) return; // Exit if the click event is not trusted (e.g., simulated)
  score++;
  updateScore(score);
  this.parentNode.classList.remove('up');
}

// Function to update the score displayed on the scoreboard
function updateScore(newScore) {
  scoreBoard.textContent = newScore;
}

// Add event listeners to moles
moles.forEach(mole => mole.addEventListener('click', bonk));

