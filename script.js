const choices = ["rock", "paper", "scissors"];
let playerScore = 0;
let computerScore = 0;
let round = 0;

const playerScoreSpan = document.getElementById("player-score");
const computerScoreSpan = document.getElementById("computer-score");
const roundInfo = document.getElementById("round-info");
const playerChoiceSpan = document.getElementById("player-choice");
const computerChoiceSpan = document.getElementById("computer-choice");
const message = document.getElementById("message");
const resetBtn = document.getElementById("reset");

document.querySelectorAll(".choice").forEach(choiceEl => {
    choiceEl.addEventListener("click", () => {
        // prevent playing after 5 rounds
        if (round >= 5) return;

        // player's choice
        const playerChoice = choiceEl.dataset.choice;

        // copy the image from the clicked .choice element into the player selection box
        const playerImg = choiceEl.querySelector('img');
        if (playerImg) {
            playerChoiceSpan.innerHTML = playerImg.outerHTML;
            playerChoiceSpan.classList.remove('question-mark');
        } else {
            playerChoiceSpan.innerHTML = '<span class="question-mark">?</span>';
        }

        // choose a random .choice element for the computer and copy its image
        const choiceEls = Array.from(document.querySelectorAll('.choice'));
        const compEl = choiceEls[Math.floor(Math.random() * choiceEls.length)];
        const computerChoice = compEl.dataset.choice;
        const compImg = compEl.querySelector('img');
        if (compImg) {
            computerChoiceSpan.innerHTML = compImg.outerHTML;
            computerChoiceSpan.classList.remove('question-mark');
        } else {
            computerChoiceSpan.innerHTML = '<span class="question-mark">?</span>';
        }

        // evaluate result, update score and message
        const result = getWinner(playerChoice, computerChoice);
        updateScore(result);
        updateMessage(result);

        // advance round and update UI
        round++;
        roundInfo.textContent = `Round ${round}/5`;

        if (round === 5) {
            declareWinner();
        }
    });
});

resetBtn.addEventListener("click", () => {
    playerScore = 0;
    computerScore = 0;
    round = 0;
    
    playerScoreSpan.textContent = "0";
    computerScoreSpan.textContent = "0";
    roundInfo.textContent = "Round 0/5";
    
    // restore question mark placeholders (use innerHTML so we keep the span class)
    playerChoiceSpan.innerHTML = '<span class="question-mark">?</span>';
    computerChoiceSpan.innerHTML = '<span class="question-mark">?</span>';
    
    message.textContent = "Make your choice!";
});

function getChoiceIcon(choice) {
    const icons = {
        rock: '<svg viewBox="0 0 24 24" width="40" height="40"><path fill="currentColor" d="M12 8.5L9.5 6L7 8.5L4.5 6L2 8.5V12C2 15.31 4.69 18 8 18H9.5V21H14.5V18H16C19.31 18 22 15.31 22 12V8.5L19.5 6L17 8.5L14.5 6L12 8.5M12 16C10.34 16 9 14.66 9 13C9 11.34 10.34 10 12 10C13.66 10 15 11.34 15 13C15 14.66 13.66 16 12 16Z"/></svg>',
        paper: '<svg viewBox="0 0 24 24" width="40" height="40"><path fill="currentColor" d="M14,11.5H16.5V9H14V11.5M8,5A3,3 0 0,1 11,8V11.5H13.5V8A3,3 0 0,1 16.5,5H8M19,12V9L20.25,6.25L17.5,5L16.25,7.75L15,5L12.25,6.25L11,3.5L9.75,6.25L7,5L5.75,7.75L4.5,5L1.75,6.25L3,9V12A6,6 0 0,0 9,18H15A6,6 0 0,0 21,12V9L19,12Z"/></svg>',
        scissors: '<svg viewBox="0 0 24 24" width="40" height="40"><path fill="currentColor" d="M19,3L13,9L15,11L22,4V3M12,12.5A0.5,0.5 0 0,1 11.5,12A0.5,0.5 0 0,1 12,11.5A0.5,0.5 0 0,1 12.5,12A0.5,0.5 0 0,1 12,12.5M6,20A2,2 0 0,1 4,18C4,16.89 4.9,16 6,16A2,2 0 0,1 8,18C8,19.11 7.1,20 6,20M6,8A2,2 0 0,1 4,6C4,4.89 4.9,4 6,4A2,2 0 0,1 8,6C8,7.11 7.1,8 6,8M9.64,7.64C9.87,7.14 10,6.59 10,6A4,4 0 0,0 6,2A4,4 0 0,0 2,6A4,4 0 0,0 6,10C6.59,10 7.14,9.87 7.64,9.64L10,12L7.64,14.36C7.14,14.13 6.59,14 6,14A4,4 0 0,0 2,18A4,4 0 0,0 6,22A4,4 0 0,0 10,18C10,17.41 9.87,16.86 9.64,16.36L12,14L19,21H22V20L9.64,7.64Z"/></svg>'
    };
    return icons[choice] || '<span class="question-mark">?</span>';
}

function updateScore(result) {
    if (result === "player") {
        playerScore++;
        playerScoreSpan.textContent = playerScore;
    } else if (result === "computer") {
        computerScore++;
        computerScoreSpan.textContent = computerScore;
    }
}

function updateMessage(result) {
    if (result === "player") {
        message.textContent = "You win this round!";
    } else if (result === "computer") {
        message.textContent = "Computer wins this round!";
    } else {
        message.textContent = "It's a tie!";
    }
}

function getWinner(player, computer) {
    if (player === computer) return "tie";
    if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) return "player";
    return "computer";
}

function declareWinner() {
    if (playerScore > computerScore) {
        message.textContent = "Congratulations! You Won The Game!";
    } else if (computerScore > playerScore) {
        message.textContent = "Game Over! Computer Wins The Game!";
    } else {
        message.textContent = "It's a Tie Game!";
    }
}