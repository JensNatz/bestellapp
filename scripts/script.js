let arrBasket = new Map();
let deliveryCosts = 5;

function renderDishes(){
    let container = document.getElementById('dishes-list');
    let categoriesHTML = '';
    for (let i= 0; i < categoryDB.length; i++) {
        categoriesHTML+= generateCategoryHTML(i);
    }
    container.innerHTML = categoriesHTML;
}

function generateCategoryHTML(i){
    return `
        <div class="dish-category">
            <img src="" alt="" class="category-image">
            <h3 class="category-name">${categoryDB[i].name}</h3>
            <p class="category-description">${categoryDB[i].description}</p>
            <div class="category-dishes-list">
                ${generateDishcardsHTML(i)}        
            </div>
        </div>
    `;
}

function generateDishcardsHTML(categoryId){
    let dishCardsHTML = '';
    for (let i = 0; i < dishesDB.length; i++) {
        if(dishesDB[i].category == categoryId ){
            dishCardsHTML += generateDishcardHTML(i);
        }
    };
    return dishCardsHTML;
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
    return `<div class="basket-entry" id="basket-entry-${dishId}">
                <span class="entry-amount">${amount}</span>
                <span class="entry-dishname">${dishesDB[dishId].name}</span>
                <span class="entry-totalprice">${calcTotalEntryPrice(dishId, amount)}</span>
                <div class="entry-controls">
                    <span class="entry-controlbtn" onclick="reduceEntryAmount(${dishId})">-</span>
                    <span class="entry-controlbtn" onclick="addDishToBasket(${dishId})">+</span>
                </div>
            </div>`;
}

function calcTotalEntryPrice(i, amount){
    return (dishesDB[i].price*amount).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
}

function addDishToBasket(i){
    if (arrBasket.has(i)){
        let currentValue = arrBasket.get(i);
        arrBasket.set(i, currentValue + 1);
    } else {
        arrBasket.set(i, 1);
    }
    renderBasketList();
    calcBasketSummary()
};

function reduceEntryAmount(i){
    let currentAmount = arrBasket.get(i);
    if(currentAmount > 1){
        arrBasket.set(i, currentAmount-1);
    }else {
        arrBasket.delete(i)
    }
    renderBasketList();
    calcBasketSummary()
}

function calcBasketSummary(){
    let subtotalSum = 0;
    for (let [dishId, amount] of arrBasket) {
        subtotalSum += amount*dishesDB[dishId].price; 
    }
    let totalSum = subtotalSum+deliveryCosts;
    document.getElementById('summary-subtotal').innerHTML = subtotalSum.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
    document.getElementById('summary-delivery').innerHTML = deliveryCosts.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
    document.getElementById('summary-total').innerHTML = totalSum.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
}

function setup() {
    renderDishes()
}
window.addEventListener('load', setup);

//TO DO:
