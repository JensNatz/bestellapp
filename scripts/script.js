let arrBasket = new Map();
let deliveryCosts = 5;
let currentDeliveryCosts = deliveryCosts;
let maxAmountOfDishesPerOrder = 10;

function renderDishes() {
    let container = document.getElementById('dishes-list');
    let categorieNavigationContainer = document.getElementById('category-list');
    for (let i = 0; i < categoryDB.length; i++) {
        container.innerHTML += generateCategoryHTML(i);
        categorieNavigationContainer.innerHTML += generateCategoryMenuEntriesHTML(i);
    }
    renderBasketList();
};

function renderBasketList() {
    let deliveryOptionsSwitchContainer = document.getElementById('basket-deliveryoptions');
    let basketListContainer = document.getElementById('basket-entrylist');
    let basketSummaryContainer = document.getElementById('basket-summary');
    let basketOrderbuttonContainer = document.getElementById('basket-orderbutton-container');
    if (arrBasket.size > 0) {
        document.getElementById('basket-empty-info').innerHTML = '';
        basketListContainer.innerHTML = '';
        for (let [dishId, amount] of arrBasket) {
            basketListContainer.innerHTML += generateBasketEntryHTML(dishId, amount);
        }
        deliveryOptionsSwitchContainer.innerHTML = renderDeliveryOptionsSwitchHTML();
        basketSummaryContainer.innerHTML = generateBasketSummaryHTML();
        basketOrderbuttonContainer.innerHTML = generateOrderButtonHTML();
        calcBasketSummary();
    } else {
        clearBasketList()
        currentDeliveryCosts = deliveryCosts;
    }
    saveToLocalStorage("basket", [...arrBasket]);
};

function clearBasketList(){
    document.getElementById('basket-deliveryoptions').innerHTML = '';
    document.getElementById('basket-entrylist').innerHTML = '';
    document.getElementById('basket-summary').innerHTML = '';
    document.getElementById('basket-empty-info').innerHTML = generateEmptyBasketHTML();
    document.getElementById('basket-orderbutton-container').innerHTML = ''
    document.getElementById('bottom-basket-orderbutton').innerHTML = 'Warenkorb'
};

function calcTotalEntryPrice(i, amount) {
    return (dishesDB[i].price * amount).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
};

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
};

function calcBasketSummary() {
    let subtotalSum = 0;
    for (let [dishId, amount] of arrBasket) {
        subtotalSum += amount * dishesDB[dishId].price;
    }
    let totalSum = subtotalSum + currentDeliveryCosts;
    document.getElementById('summary-subtotal').innerHTML = subtotalSum.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
    document.getElementById('summary-delivery').innerHTML = currentDeliveryCosts.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
    document.getElementById('summary-total').innerHTML = totalSum.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
    renderOrderButton(totalSum);
};

function renderOrderButton(totalSum){
    let orderButton = document.getElementById('basket-orderbtn')
    let orderButtonButtom = document.getElementById('bottom-basket-orderbutton')
    let totalAmountOfDishesInBasket = [...arrBasket.values()].reduce((acc, value) => acc + value, 0);
    if (totalAmountOfDishesInBasket <= maxAmountOfDishesPerOrder){
        orderButton.innerHTML = `Bezahlen (${totalSum.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })})`;
        orderButtonButtom.innerHTML = `Warenkorb (${totalSum.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })})`;
        orderButton.disabled = false;
    } else {
        orderButton.innerHTML = `Maxmimal ${maxAmountOfDishesPerOrder} Gerichte pro Bestellung`;
        orderButton.disabled = true;
    }
};

function switchDeliveryOptions(){
    if (currentDeliveryCosts > 0){
        currentDeliveryCosts = 0;
    }else {
        currentDeliveryCosts = deliveryCosts;
    }
    calcBasketSummary();
};

function placeOrder(){
    toogleSuccessOverlayVisibilty();
    arrBasket.clear();
    renderBasketList();
};

function toogleBasketVisibilty(){
    document.getElementById('basket-wrapper').classList.toggle('basket-wrapper-show');
    document.body.classList.toggle('prevent-scrolling');
};

function toogleSuccessOverlayVisibilty(){
    document.getElementById('success-overlay').classList.toggle('show-success-overlay');
};

function loadBasketFromLocalStorage(key){
    let basketFromStorage = getFromLocalStorage(key);
    if (basketFromStorage && basketFromStorage.length > 0) {
        arrBasket = new Map(basketFromStorage);
    } 
};

function saveToLocalStorage(key, object) {
    localStorage.setItem(key, JSON.stringify(object));
};

function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
};

function adjustBasketHeight(){
    if(window.scrollY <= 80 && window.innerWidth > 840){
        let basket = document.getElementById('basket');
        let scrollPosition = Math.trunc(window.scrollY).toString();
        basket.style.height = `calc(100dvh - 80px + ${scrollPosition}px)`;
    }
};

function removeScrollingPreventionFromBody(){
    if(window.innerWidth > 840){
        document.body.classList.remove('prevent-scrolling');
        document.getElementById('basket-wrapper').classList.remove('basket-wrapper-show')
    }
};

function setup() {
    loadBasketFromLocalStorage('basket');
    renderDishes();
};

window.addEventListener('load', setup);
window.addEventListener("scroll", adjustBasketHeight);
window.addEventListener('resize', removeScrollingPreventionFromBody);