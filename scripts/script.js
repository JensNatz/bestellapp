let arrBasket = new Map();
let deliveryCosts = 5;

function renderDishes() {
    let container = document.getElementById('dishes-list');
    let categoriesHTML = '';
    for (let i = 0; i < categoryDB.length; i++) {
        categoriesHTML += generateCategoryHTML(i);
    }
    container.innerHTML = categoriesHTML;
    renderBasketList();
}

function renderBasketList() {
    let basketListContainer = document.getElementById('basket-entrylist');
    let basketSummaryContainer = document.getElementById('basket-summary');
    if (arrBasket.size > 0) {
        basketListContainer.innerHTML = '';
        for (let [dishId, amount] of arrBasket) {
            basketListContainer.innerHTML += generateBasketEntryHTML(dishId, amount);
        }
        basketSummaryContainer.innerHTML = generateBasketSummaryHTML();
        calcBasketSummary();
    } else {
        basketListContainer.innerHTML = '';
        basketSummaryContainer.innerHTML = generateEmptyBasketHTML();
    }
}

function calcTotalEntryPrice(i, amount) {
    return (dishesDB[i].price * amount).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
}

function addDishToBasket(i) {
    if (arrBasket.has(i)) {
        let currentValue = arrBasket.get(i);
        arrBasket.set(i, currentValue + 1);
    } else {
        arrBasket.set(i, 1);
    }
    renderBasketList();
};

function reduceEntryAmount(i) {
    let currentAmount = arrBasket.get(i);
    if (currentAmount > 1) {
        arrBasket.set(i, currentAmount - 1);
    } else {
        arrBasket.delete(i)
    }
    renderBasketList();
}

function calcBasketSummary() {
    let subtotalSum = 0;
    for (let [dishId, amount] of arrBasket) {
        subtotalSum += amount * dishesDB[dishId].price;
    }
    let totalSum = subtotalSum + deliveryCosts;
    document.getElementById('summary-subtotal').innerHTML = subtotalSum.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
    document.getElementById('summary-delivery').innerHTML = deliveryCosts.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
    document.getElementById('summary-total').innerHTML = totalSum.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
}

function setup() {
    renderDishes()
}
window.addEventListener('load', setup);