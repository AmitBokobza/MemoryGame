let icons = ["assets/card1.png", "assets/card1.png", "assets/card2.png", "assets/card2.png", "assets/card3.png", "assets/card3.png", "assets/card4.png", "assets/card4.png", "assets/card5.png", "assets/card5.png", "assets/card6.png", "assets/card6.png", "assets/card7.png", "assets/card7.png", "assets/card8.png", "assets/card8.png", "assets/card9.png", "assets/card9.png", "assets/card10.png", "assets/card10.png", "assets/card11.png", "assets/card11.png", "assets/card12.png", "assets/card12.png"];
let shuffledIcons = [];
let firstCard = null;
let secondCard = null;
let lockScreen = false;
let matches = 0;
const board = document.querySelector(".board");

function shuffle(arr) {
    return arr.sort(() => 0.5 - Math.random())
};

function setCards() {
    matches = 0;
    let cardNum = document.getElementById("cardCount").value;
    shuffledIcons = shuffle(icons.slice(0, cardNum));
    board.innerHTML = "";

    for (let i = 0; i < shuffledIcons.length; i++) {
        const card = document.createElement("div");
        card.classList.add("card");

        const image = document.createElement("img");
        image.classList.add("card-image");
        image.src = `${shuffledIcons[i]}`;

        card.appendChild(image);
        card.addEventListener("click", flipCard);
        board.appendChild(card);
    }
}

function flipCard() {
    if (lockScreen == true) return;

    if (this === firstCard) return;

    this.classList.add("flipped");

    const img = this.querySelector(".card-image");
    if (img) img.style.visibility = "visible";

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockScreen = true;

    checkMatch();
}

function checkMatch() {
    if (firstCard.innerHTML === secondCard.innerHTML) {
        matches++;
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);

       resetLocks();
    }
    else {
        setTimeout(() => {
            if (firstCard){
                firstCard.classList.remove("flipped");
                firstCard.querySelector(".card-image").style.visibility = "hidden";
            }
            if (secondCard){
                secondCard.classList.remove("flipped");
                secondCard.querySelector(".card-image").style.visibility = "hidden";
            }
            resetLocks();
        }, 1000);

        
    }

    if (matches == shuffledIcons.length / 2) {
        setTimeout(() => {
            alert("You Win!");
        }, 250);
    }
};

function resetLocks(){
    lockScreen = false;
    firstCard = null;
    secondCard = null;
}