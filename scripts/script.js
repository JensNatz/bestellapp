let arrBasket = new Map();

function renderDishes(){
    let container = document.getElementById('dishes-list');
    for (let i = 0; i < dishesDB.length; i++) {        
        let dishCard = generateDishcardHTML(i);
        container.innerHTML += dishCard;
    }
}

function generateDishcardHTML(i){
    return `
        <div class="dish-card">
            <img src="assets/img/${dishesDB[i].image}" alt="" class="dish-image">
            <div class="dish-info">
                <h2 class="dish-name">${dishesDB[i].name}</h2>
                <span class="dish-price">${dishesDB[i].price.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</span>
                <p class="dish-description">${dishesDB[i].description}</p>
            </div>
            <img src="assets/icons/plus.png" class="addToBasket-btn" onclick="addDishToBasket(${i})"/>
        </div>
    `;
}


function renderBasketList(){
    let basketListContainer = document.getElementById('basket-entrylist');
    basketListContainer.innerHTML = '';
    for (let [dishId, amount] of arrBasket) {
        basketListContainer.innerHTML += generateBasketEntryHTML(dishId, amount);
    }
}

function generateBasketEntryHTML(dishId, amount){
    return `<div class="basket-entry">
                <span class="entry-amount">${amount}</span>
                <span class="entry-dishname">${dishesDB[dishId].name}</span>
                <span class="entry-totalprice">${calcTotalEntryPrice(dishId, amount)}</span>
            </div>`;
}

function calcTotalEntryPrice(dishId, amount){
    return `$$$`;
}

function addDishToBasket(i){
    if (arrBasket.has(i)){
        let currentValue = arrBasket.get(i);
        arrBasket.set(i, currentValue + 1);
    } else {
        arrBasket.set(i, 1);
    }
    renderBasketList();
};

function setup() {
    renderDishes()
}
window.addEventListener('load', setup);

//TO DO:
// - in addDishToBasekt funktion prüfen, ob gericht schon in Basket ist, wenn ja, +1, sonst hinzufügen
// renderBasket funktion schreiben, die aus allen elemten im Basket einen Eintrag in den Warenkorb mit einer For-Schleife erzeugt, die werte 
