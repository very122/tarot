const startBtn = document.getElementById("start");
const spread = document.getElementById("spread");

let deck = [];

// перемешивание массива
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// взять N карт и удалить их из колоды
function drawCards(count) {
    const drawn = deck.slice(0, count);
    deck = deck.slice(count);
    return drawn;
}

// старт расклада
startBtn.addEventListener("click", () => {
    spread.innerHTML = "";
    deck = shuffle([...cards]);

    const mainCards = drawCards(3);

    mainCards.forEach(card => {
        createCardBlock(card);
    });

    // ---- ДНО КОЛОДЫ ----
    if (deck.length > 0) {
        const bottomCard = drawCards(1)[0];

        const bottomTitle = document.createElement("h2");
        bottomTitle.textContent = "Дно колоды";
        spread.appendChild(bottomTitle);

        createCardBlock(bottomCard);
    }
});

function createCardBlock(card) {
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
        if (deck.length === 0) return;
        if (extraCount >= 3) return;

        const extraCard = drawCards(1)[0];

        const extraImg = document.createElement("img");
        extraImg.src = extraCard.image;
        extraImg.className = "extra-card";

        extras.appendChild(extraImg);

        extraCount++;

        if (extraCount === 3) {
            button.disabled = true;
        }
    });

    cardBlock.appendChild(title);
    cardBlock.appendChild(img);
    cardBlock.appendChild(button);
    cardBlock.appendChild(extras);

    spread.appendChild(cardBlock);
}

