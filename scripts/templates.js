function generateCategoryHTML(i) {
    return `
        <div class="dish-category" id="category-${i}">
            <img class="category-image" src="./assets/img/${categoryDB[i].image}" alt="" class="category-image">
            <h3 class="category-name">${categoryDB[i].name}</h3>
            <p class="category-description">${categoryDB[i].description}</p>
            <div class="category-dishes-list">
                ${generateDishcardsHTML(i)}        
            </div>
        </div>
    `;
};

function generateCategoryMenuEntriesHTML(i) {
    return `
        <a href="#category-${i}" class="category-menu-entry">
            ${categoryDB[i].name}
        </a>
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
            <img src="assets/icons/add.png" class="addToBasket-btn" onclick="addDishToBasket(${i})"/>
        </div>
    `;
};

function renderDeliveryOptionsSwitchHTML(){
    return `<label class="switch">
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
    `;
};

function generateBasketEntryHTML(dishId, amount) {
    return `<div class="basket-entry" id="basket-entry-${dishId}">
                <div class="entry-info">
                    <div class="entry-dish">
                        <div class="entry-amount-controls">
                            <img src="./assets/icons/remove.png" class="entry-controlbtn" onclick="reduceEntryAmount(${dishId})">
                            <span class="entry-amount">${amount}</span>
                            <img src="./assets/icons/add.png" class="entry-controlbtn" onclick="addDishToBasket(${dishId})">
                        </div>
                        <span class="entry-dishname">${dishesDB[dishId].name}</span>
                    </div>
                    <span class="entry-totalprice">${calcTotalEntryPrice(dishId, amount)}</span>
                </div>
            </div>`;
};

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
    return `<button id="basket-orderbtn" class="basket-orderbtn primary-orderbtn" onclick="placeOrder()"></button>`;
};

function generateEmptyBasketHTML() {
    return `<div class="basket-emptymessage">
                <img class="emptymessage-icon" src="./assets/icons/cart.png">
                <h4 class="emptymessage-claim">Lust auf Lecker?</h4>
                <p class="emptymessage-text">Suche dir leckere Speisen aus der Karte aus und bestelle direkt!</p>
            </div>`;
};
