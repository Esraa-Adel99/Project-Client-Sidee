document.getElementById("restart").addEventListener("click", restart);
const cardsEl = document.getElementById("cards");
const scoreboardEl = document.getElementById("scoreboard");

const icons = "ABCDEF";
let cards;
let playCount = 0;
let gameTime = 0;
let gameTimer;
const chosenCards = [];
const matchedCards = [];
let disableClick = false;
const WINNER = true;

updateScoreBoard();
initializeGame(icons);

function initializeGame(icons) {
	cards = Array.from(icons + icons);
	cards.sort(() => Math.random() - 0.5);

	cards.forEach((card) => {
		cardEl = document.createElement("div");
		cardEl.className = "card hidden";
		cardEl.textContent = card;
		cardsEl.appendChild(cardEl);
		cardEl.addEventListener("click", selectCard);
	});
	gameTimer = setInterval(incrementTime, 1000);
}

function restart() {
	cardsEl.childNodes.forEach((child) => {
		child.removeEventListener("click", selectCard);
	});
	cardsEl.innerHTML = "";
	cards.length = 0;
	chosenCards.length = 0;
	matchedCards.length = 0;
	disableClick = false;
	clearInterval(gameTimer);
	playCount = 0;
	gameTime = 0;
	updateScoreBoard();
	initializeGame(icons);
}
function isCardShowing(card) {
	return !Object.values(card.classList).includes("hidden");
}
function selectCard() {
	if (disableClick || isCardShowing(this)) return;
	chosenCards.push(this);
	this.classList.remove("hidden");
	checkSelection();
	if (checkWin()) gameOver();
}
function checkSelection() {
	if (chosenCards.length !== 2) return;
	incrementPlayCount();
	disableClick = true;
	if (chosenCards[0].textContent === chosenCards[1].textContent) {
		matchedCards.push(chosenCards[0]);
		chosenCards.forEach((card) => {
			card.removeEventListener("click", selectCard);
			card.classList.add("found");
		});
		chosenCards.length = 0;
		disableClick = false;
	} else {
		setTimeout(() => {
			chosenCards[0].classList.add("hidden");
			chosenCards[1].classList.add("hidden");
			chosenCards.length = 0;
			disableClick = false;
		}, 1000);
	}
}
function checkWin() {
	// Matched cards length must be double when using emojis
	return cards.length === matchedCards.length * 2;
}
function gameOver() {
	clearInterval(gameTimer);
	updateScoreBoard(WINNER);
}
function incrementPlayCount() {
	playCount++;
	updateScoreBoard();
}
function incrementTime() {
	gameTime++;
	updateScoreBoard();
}
function updateScoreBoard(isWinner = false) {
	if (isWinner) {
		scoreboardEl.innerText = `Congrats! You took ${minsAndSecs(
			gameTime
		)} to find all pairs in ${playCount} attemps! Click RESTART to play again.`;
	} else {
		scoreboardEl.innerText = `Attempts: ${playCount} Time ${minsAndSecs(
			gameTime
		)}`;
	}
}
function minsAndSecs(seconds) {
	return `${parseInt(seconds / 60)}:${seconds % 60 < 10 ? "0" : ""}${
		seconds % 60
	}`;
}
