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

    deck = shuffle([...cards]); // новая колода

    const mainCards = drawCards(3);
    const bottomCards = drawCards(2); // <-- дно колоды

    // === ОСНОВНЫЕ КАРТЫ ===
    mainCards.forEach(card => {
        const cardBlock = document.createElement("div");
        cardBlock.className = "card-block";

        const title = document.createElement("h3");
        title.textContent = card.name;

        const img = document.createElement("img");
        img.src = card.image;
        img.className = "main-card";

        const button = document.createElement("button");
        button.textContent = "Добавить допы";

        const extras = document.createElement("div");
        extras.className = "extras";

        button.addEventListener("click", () => {
            if (deck.length < 3) return;

            const extraCards = drawCards(3);
            extras.innerHTML = "";

            extraCards.forEach(extra => {
                const extraImg = document.createElement("img");
                extraImg.src = extra.image;
                extraImg.className = "extra-card";
                extras.appendChild(extraImg);
            });

            button.disabled = true;
        });

        cardBlock.appendChild(title);
        cardBlock.appendChild(img);
        cardBlock.appendChild(button);
        cardBlock.appendChild(extras);

        spread.appendChild(cardBlock);
    });

    // === ДНО КОЛОДЫ ===
    const bottomBlock = document.createElement("div");
    bottomBlock.className = "bottom-block";

    const bottomTitle = document.createElement("h2");
    bottomTitle.textContent = "Дно колоды";

    const bottomCardsContainer = document.createElement("div");
    bottomCardsContainer.className = "bottom-cards";

    bottomCards.forEach(card => {
        const img = document.createElement("img");
        img.src = card.image;
        img.className = "bottom-card";
        bottomCardsContainer.appendChild(img);
    });

    bottomBlock.appendChild(bottomTitle);
    bottomBlock.appendChild(bottomCardsContainer);

    spread.appendChild(bottomBlock);
});
