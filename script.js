//галерея карт
const container = document.getElementById("cards");
if(container){
    cards.forEach(card =>{
        const link=document.createElement("a");
        link.href=`card.html?id=${card.id}`;
        const img = document.createElement("img");
        img.src=card.image;
        img.style.width="150px";
        link.appendChild(img);
        container.appendChild(link);

    });
}
//страница карты
const params=new URLSearchParams(window.location.search);
const id=params.get("id");
if(id){
    const card = cards.find(c => c.id === id);
    document.getElementById("name").textContent = card.name;
    document.getElementById("image").src=card.image;
    const historyBlock = document.getElementById("history");
    historyBlock.innerHTML = "";
    card.history.forEach(text => { 
        const p = document.createElement("p");
        p.textContent=text;
        historyBlock.appendChild(p);
    });
    const meaningBlock = document.getElementById("meaning");
    meaningBlock.innerHTML = "";
    card.meaning.forEach(text => {
        const p = document.createElement("p");
        p.textContent=text;
        meaningBlock.appendChild(p);

})
}