let favmeals = [
    {
        'name': 'Smash Burger',
        'description': 'mit 100g Rindfleisch Patty, Käse und Hausgemachter Soße',
        'price': '11.90 €',
    },
    {
        'name': 'Cheeseburger',
        'description': 'mit 100g Rindfleisch Patty, Käse und Hausgemachter Soße',
        'price': '9.90 €',
    },
    {
        'name': 'Crispy Chicken Burger',
        'description': 'mit 130g Crispy Chicken, Käse und Hausgemachter Soße',
        'price': '8.70 €',
    }
];

let steak = [
    {
        'name': 'Argentisches Rumpsteak',
        'description': '200g, mit Kräuterbutter & Beilage',
        'price': '28.90 €',
    },
    {
        'name': 'Lammfilet',
        'description': '200g, mit Kräuterbutter & Beilage',
        'price': '21.50 €',
    },
    {
        'name': 'Putensteak',
        'description': '300g, mit Kräuterbutter & Beilage',
        'price': '13.40 €',
    }
];

let basketname = [];
let basketprice = [];
let basketamount = [];

function load() {
    favmeal();
    steakmeal();
}

/*
    * List of Meals  
*/

function favmeal() {
    let fav = document.getElementById('favmeals');
    fav.innerHTML = ``;

    for (let i = 0; i < favmeals.length; i++) {

        fav.innerHTML += templateMeals(i);
    }
}

function templateMeals(i) {
    return `
        <div class="menu-box">
        <div class="product-and-plus">
        <p><b>${favmeals[i]['name']}</b></p>
        <img onclick="addToBasket('${favmeals[i]['name']}','${favmeals[i]['price']}')" class="plus-icon" src="img/plus.png">
        </div>
        <p id="descript${i}">${favmeals[i]['description']}</p>
        <p id="price${i}" class="price">${favmeals[i]['price']}</p>
        </div>`;
}

function steakmeal() {
    let fav = document.getElementById('steak');
    fav.innerHTML = ``;
    fav.innerHTML += `
                        <div class="position-img">
                            <img class="steak-img" src="img/steak.jpg">
                            <div class="steaktext">Steak</div>
                        <div>`;

    for (let i = 0; i < steak.length; i++) {

        fav.innerHTML += templateMeals(i);

    }
}

/*
    * add items to the basket
*/

function addToBasket(name, price) {
    let addtobasket = document.getElementById('shoppingbasket');

    addtobasket.innerHTML = ``;
    let index = basketname.indexOf(name);
    if (index == -1) {
        basketname.push(name);
        basketprice.push(price);
        basketamount.push(1);
    } else {
        basketamount[index]++;
    }

    for (let i = 0; i < basketname.length; i++) {
        addtobasket.innerHTML += templateShoppingCart(i, basketamount[i], basketname[i], basketprice[i]);
        calc(basketamount[i], basketprice[i]);
    }
}

function addToBasketAfterMinusOrPlusAmount(name, price) {
    let addtobasket = document.getElementById('shoppingbasket');

    addtobasket.innerHTML = ``;

    for (let i = 0; i < basketname.length; i++) {
        addtobasket.innerHTML += templateShoppingCart(i, basketamount[i], basketname[i], basketprice[i]);
        calc(basketamount[i], basketprice[i]);
    }
}

function templateShoppingCart(i, amount, name, price) {
    priceOfProduct = parseFloat(price);
    let priceMultiplyByAmount = priceOfProduct * amount;
    priceMultiplyByAmount = priceMultiplyByAmount.toFixed(2);
    return `
    <div class="addtobasket">
    <div class="addtobasket-content">
    <div><span class="addtobasket-numberandname">${amount}</span> <b class="addtobasket-font-size-name">${name}</b></div>
    <div>${priceMultiplyByAmount} €</div>
    </div> 
    <div class="addtobasket-icon">
    <img onclick="plusAmount(${i}, '${name}', ${priceOfProduct})" class="addtobasket-icon-child addtobasket-icon-border addtobasket-hover-plus" src="img/plus-gray.png">
    <img onclick="minusAmount(${i}, '${name}', ${priceOfProduct})" class="addtobasket-icon-child addtobasket-icon-border addtobasket-hover-minus" src="img/minus.png">
    <img onclick="deleteMeal(${i}, '${name}', ${priceOfProduct})" class="addtobasket-delete" src="img/delete.png">
    </div>
    </div>
    <br><br>`;
}

/*
    * calculation basket
*/

function calc() {
    let firstSubtotal = [];

    for (i = 0; i < basketamount.length; i++) {
        let beforeSubtotal = basketamount[i] * parseFloat(basketprice[i]);
        firstSubtotal.push(beforeSubtotal);

        let sum = firstSubtotal.reduce((a, b) => a + b);
        sum = sum.toFixed(2);
        sum = parseFloat(sum);


        let deliverycosts = 1.99;

        let sumtotalwithdeliverycosts = sum + deliverycosts;
        sumtotalwithdeliverycosts = sumtotalwithdeliverycosts.toFixed(2);

        let result = document.getElementById('total');
        result.innerHTML = ``;

        result.innerHTML += templateCalc(sum, deliverycosts, sumtotalwithdeliverycosts);

        minimumAmount(sum);
    }
}

function templateCalc(sum, deliverycosts, sumtotalwithdeliverycosts) {
    let summe = sum.toFixed(2);
    return `
    <div class="sum-box">
    
    <div class="subtotal">
    <div>Zwischensumme</div>
    <div>${summe} €</div>
    </div>
    
    <div class="deliverycosts">
    <div>Lieferkosten</div>
    <div>${deliverycosts} €</div>
    </div>
    
    <div class="total">
    <div><b>Gesamtsumme</b></div> 
    <div><b>${sumtotalwithdeliverycosts} €</b></div>
    </div>
    
    </div>`;
}


function minimumAmount(amount) {
    let minimumForDeliver = document.getElementById('minimumamount');
    let minimumForButton = document.getElementById('minimumbutton');
    let missingamount = document.getElementById('missingamount');
    if (amount < 10.00) {
        let difference = 10.00 - amount;
        difference = difference.toFixed(2);
        missingamount.innerHTML = templateMinimumAmountDifference(difference);

        minimumForDeliver.innerHTML = templateMinimumAmount();

        minimumForButton.innerHTML = `<div class="buttonbasket">Bestellen</div>`;
    } else {
        minimumForDeliver.innerHTML = ``;
        missingamount.innerHTML = ``;
        minimumForButton.innerHTML =
            `<div class="buttonbasketsecond">Bestellen</div>`;
    }

}

function templateMinimumAmountDifference(difference) {
    return `<div class="differencebasket">
    <div class="difference">Benötigter Betrag, um den Mindestbestellwert zu erreichen</div>
    <div>${difference} €<div>
    <div>`;
}

function templateMinimumAmount() {
    return `<div class="minten">Leider kannst Du noch nicht bestellen.</div> 
    <div class="minten">Burger Heaven liefert erst ab einem </div>
    <div class="minten">Mindestbestellwert von 10,00 €</div>
    <div class="minten">(exkl. Lieferkosten)</div>`;
}

function plusAmount(i, name, price) {
    basketamount[i]++;
    addToBasketAfterMinusOrPlusAmount(name, price);
}

function minusAmount(i, name, price) {
    if (basketamount[i] > 1) {
        basketamount[i]--;
        addToBasketAfterMinusOrPlusAmount(name, price);
    } else {
        basketname.splice(i, 1);
        basketprice.splice(i, 1);
        basketamount.splice(i, 1);

        let afterDeleteMeal = document.getElementById('shoppingbasket');
        let total = document.getElementById('total');
        let buttonWithMinimum = document.getElementById('minimumbutton');
        let withMinimum = document.getElementById('minimumamount');
        let withMissingAmount = document.getElementById('missingamount');
        if (basketname.length == 0) {
            total.innerHTML = ``;
            buttonWithMinimum.innerHTML = ``;
            withMinimum.innerHTML = ``;
            withMissingAmount.innerHTML = ``;
            afterDeleteMeal.innerHTML = `<div class="shoppingbasket-child">
                                    <img src="img/shopping-bag.png" class="shopping-basket-icon">
                                    <div><span class="shopping-basket-text"><b>Fülle deinen Warenkorb</b></span></div>
                                    <div class="shopping-basket-textsmall">Füge leckere Gerichte aus der Karte hinzu und bestelle</div>
                                    </div>`;
        } else {
            addToBasketAfterMinusOrPlusAmount(name, price);
        }
    }
}

function deleteMeal(i, name, price) {
    basketname.splice(i, 1);
    basketprice.splice(i, 1);
    basketamount.splice(i, 1);

    let afterDeleteMeal = document.getElementById('shoppingbasket');
    let total = document.getElementById('total');
    let buttonWithMinimum = document.getElementById('minimumbutton');
    let withMinimum = document.getElementById('minimumamount');
    let withMissingAmount = document.getElementById('missingamount');
    if (basketname.length == 0) {
        total.innerHTML = ``;
        buttonWithMinimum.innerHTML = ``;
        withMinimum.innerHTML = ``;
        withMissingAmount.innerHTML = ``;
        afterDeleteMeal.innerHTML = `<div class="shoppingbasket-child">
                                    <img src="img/shopping-bag.png" class="shopping-basket-icon">
                                    <div><span class="shopping-basket-text"><b>Fülle deinen Warenkorb</b></span></div>
                                    <div class="shopping-basket-textsmall">Füge leckere Gerichte aus der Karte hinzu und bestelle</div>
                                    </div>`;
    } else {
        addToBasketAfterMinusOrPlusAmount(name, price);
    }
}

/*
    * function for mobile view
*/

function openbasketmobile() {
    let closeBasketLeft = document.getElementById('basketleft');
    let closeImpressum = document.getElementById('impressum');
    let openBasketRight = document.getElementById('basketright');
    let closeBasketMobile = document.getElementById('basket-mobile');
    let xmark = document.getElementById('xmark');
    let footerContainer = document.getElementById('footer');
    closeBasketLeft.classList.add('hide-mobile');
    closeImpressum.classList.add('hide-mobile');
    xmark.classList.remove('hide');
    openBasketRight.classList.remove('hide-mobile');
    closeBasketMobile.classList.add('hide-mobile');
    closeBasketMobile.classList.remove('basket-mobile');
    footerContainer.classList.add('hide-mobile');
}

function closebasketmobile() {
    let closeBasketLeft = document.getElementById('basketleft');
    let closeImpressum = document.getElementById('impressum');
    let openBasketRight = document.getElementById('basketright');
    let closeBasketMobile = document.getElementById('basket-mobile');
    let xmark = document.getElementById('xmark');
    let footerContainer = document.getElementById('footer');
    closeBasketLeft.classList.remove('hide-mobile');
    closeImpressum.classList.remove('hide-mobile');
    openBasketRight.classList.add('hide-mobile');
    closeBasketMobile.classList.remove('hide-mobile');
    closeBasketMobile.classList.add('basket-mobile');
    xmark.classList.add('hide');
    footerContainer.classList.remove('hide-mobile');
}
