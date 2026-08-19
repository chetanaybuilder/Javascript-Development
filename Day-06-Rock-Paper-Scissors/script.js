/**
 * script.js
 * Day-06 Rock Paper Scissors — lightweight game logic and UI wiring.
 */

// DOM references for player controls and display elements
const rockButton = document.querySelector("#rock");
const paperButton = document.querySelector("#paper");
const scissorsButton = document.querySelector("#scissors");

const status = document.querySelector("#status");
const result = document.querySelector("#result");


// Game options
const choices = ["rock", "paper", "scissors"];


// Return a random computer choice from `choices`
const getComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
};


// Simulate thinking delay; resolves with computer choice after 1s
const computerThink = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(getComputerChoice());
        }, 1000);
    });
};


// Play one round: show status, wait for computer, then determine result
const playGame = (playerChoice) => {
    status.textContent = "🤖 Computer is thinking...";
    result.textContent = "";

    computerThink()
        .then((computerChoice) => {
            status.textContent = `You: ${playerChoice} | Computer: ${computerChoice}`;

            // Determine outcome and update result text
            if (playerChoice === computerChoice) {
                result.textContent = "🤝 DRAW!";
            } else if (
                (playerChoice === "rock" && computerChoice === "scissors") ||
                (playerChoice === "paper" && computerChoice === "rock") ||
                (playerChoice === "scissors" && computerChoice === "paper")
            ) {
                result.textContent = "🎉 YOU WIN!";
            } else {
                result.textContent = "😢 YOU LOSE!";
            }
        })
        .catch((error) => {
            // Fail-safe: inform user and log error for debugging
            result.textContent = "Something went wrong!";
            console.error(error);
        });
};


// Attach click handlers to each choice button
rockButton.addEventListener("click", () => playGame("rock"));
paperButton.addEventListener("click", () => playGame("paper"));
scissorsButton.addEventListener("click", () => playGame("scissors"));
