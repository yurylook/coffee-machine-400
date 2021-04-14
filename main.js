'use strict'

const COFFEE_ITEMS = document.body.querySelectorAll(".container .coffee-item");
const COFFEE_BALANCE_DISPLAY = document.body.querySelector(".coffee-balance");
let moneyBalance = document.body.querySelector(".coffee-balance input");
let displayText = document.body.querySelector(".display-text");

moneyBalance.value = "300";
for(let coffeeItem of COFFEE_ITEMS) {
    coffeeItem.onclick = function() {
        let activeBalance = +moneyBalance.value - (+this.getAttribute("cost"));
        let coffeeName = this.getAttribute("name");
        getCurrentBalance(activeBalance, coffeeName);
    }
}

const getCurrentBalance = function(activeBalance, coffeeName) {
    if(activeBalance >= 0) {
        moneyBalance.value =  activeBalance;
        displayText.innerHTML = "Ваш " + coffeeName + " готовится.";
        COFFEE_BALANCE_DISPLAY.style.border = "solid 2px green ";
    } else {
        displayText.innerHTML = "Недостаточно средств";
        COFFEE_BALANCE_DISPLAY.style.border = "solid 2px red";
    }
}