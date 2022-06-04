const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard() {
  if (!lockBoard) {
    if (this !== firstCard) {
      this.classList.add("flip");
      if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
      } else {
        secondCard = this;

        checkForMatch();
      }
    }
  }
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disabledCards() : unflipCards();
}

function disabledCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    lockBoard = false;
    resetBoard();
  }, 1500);
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle(){
    cards.forEach((card)=> {
        let randomPos = Math.floor(Math.random()*12);
        card.style.order = randomPos;
    });
})();

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});
