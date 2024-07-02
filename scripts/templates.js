function generateCategoryHTML(i) {
    return `
        <div class="dish-category">
            <img class="category-image" src="./assets/img/${categoryDB[i].image}" alt="" class="category-image">
            <h3 class="category-name">${categoryDB[i].name}</h3>
            <p class="category-description">${categoryDB[i].description}</p>
            <div class="category-dishes-list">
                ${generateDishcardsHTML(i)}        
            </div>
        </div>
    `;
};

function generateDishcardsHTML(categoryId) {
    let dishCardsHTML = '';
    for (let i = 0; i < dishesDB.length; i++) {
        if (dishesDB[i].category == categoryId) {
            dishCardsHTML += generateDishcardHTML(i);
        }
    };
    return dishCardsHTML;
};

function generateDishcardHTML(i) {
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
};

function renderDeliveryOptionsSwitchHTML(){
    return `
            <label class="switch">
                <input type="checkbox">
                    <span class="slider round">
                        <div class="slider-content" onclick="switchDeliveryOptions()">
                            <div class="slider-text">
                                <span>Lieferung</span>
                                 <span>ca. 45 Min.</span>
                            </div>
                            <div class="slider-text">
                                <span>Abholung</span>
                                <span>15 Min.</span>
                            </div>
                        </div>
                    </span>
                </label>
    `; d
}

function generateBasketEntryHTML(dishId, amount) {
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

function generateBasketSummaryHTML() {
    return `<div class="summary-entry">
                <span>Zischensumme</span>
                <span id="summary-subtotal"></span>
            </div>
            <div class="summary-entry">
                <span>Lieferkosten</span>
                <span id="summary-delivery"></span>
            </div>
                <div class="summary-entry summary-total">
                <span>Gesamt</span>
                <span id="summary-total"></span>
            </div>`;
};

function generateOrderButtonHTML(){
    return `<button id="basket-orderbtn" class="basket-orderbtn"></button>`;
};

function generateEmptyBasketHTML() {
    return `<h4>Lust auf Lecker?</h4>
            <p>Suche dir leckere Speisen aus der Karte aus und bestelle direkt.</p>`;
};
