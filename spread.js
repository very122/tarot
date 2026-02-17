const startBtn = document.getElementById("start");
const showBottomBtn = document.getElementById("show-bottom");
const mainCardsContainer = document.getElementById("main-cards");
const bottomCardsContainer = document.getElementById("bottom-cards");

let deck = [];

// перемешивание
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// взять N карт
function drawCards(count) {
    const drawn = deck.slice(0, count);
    deck = deck.slice(count);
    return drawn;
}

// создать карту в конкретный контейнер
function createCardBlock(card, container) {
    const cardBlock = document.createElement("div");
    cardBlock.className = "card-block";

    const title = document.createElement("h3");
    title.textContent = card.name;

    const img = document.createElement("img");
    img.src = card.image;
    img.className = "main-card";

    const button = document.createElement("button");
    button.textContent = "Добавить доп";

    const extras = document.createElement("div");
    extras.className = "extras";

    let extraCount = 0;

    button.addEventListener("click", () => {
        if (deck.length === 0 || extraCount >= 3) return;

        const extraCard = drawCards(1)[0];
        const extraImg = document.createElement("img");
        extraImg.src = extraCard.image;
        extraImg.className = "extra-card";
        extras.appendChild(extraImg);

        extraCount++;
        if (extraCount === 3) button.disabled = true;
    });

    cardBlock.appendChild(title);
    cardBlock.appendChild(img);
    cardBlock.appendChild(button);
    cardBlock.appendChild(extras);

    container.appendChild(cardBlock);
}

// старт расклада
startBtn.addEventListener("click", () => {
    mainCardsContainer.innerHTML = "";
    bottomCardsContainer.innerHTML = "";
    showBottomBtn.disabled = false;

    deck = shuffle([...cards]);

    const mainCards = drawCards(Math.min(3, deck.length));
    mainCards.forEach(card => createCardBlock(card, mainCardsContainer));
});

// показать дно
showBottomBtn.addEventListener("click", () => {
    const bottomCards = drawCards(Math.min(2, deck.length));
    bottomCards.forEach(card => createCardBlock(card, bottomCardsContainer));

    showBottomBtn.disabled = true; // нельзя повторно добавлять дно
});
