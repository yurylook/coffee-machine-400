'use strict'

const COFFEE_ITEMS = document.body.querySelectorAll(".container .coffee-item");
const COFFEE_BALANCE_DISPLAY = document.body.querySelector(".coffee-balance");
const PROGRESS = document.body.querySelector(".progress");
const COFFEE_CUP = document.body.querySelector(".coffee-cup img");
//const COFFEE_CUP_IMG = COFFEE_CUP.querySelector(".coffee-cup img");
let progressBar = document.body.querySelector(".progress-bar");
let moneyBalance = document.body.querySelector(".coffee-balance input");
let displayText = document.body.querySelector(".display-text");


for(let coffeeItem of COFFEE_ITEMS) {
    coffeeItem.onclick = function() {
        let activeBalance = +moneyBalance.value - (+this.getAttribute("cost"));
        let coffeeName = this.getAttribute("name");
        let src = this.querySelector("img").src;
        console.log (src);
        getCoffee(activeBalance, coffeeName, src);
    }
}

const getCoffee = function(activeBalance, coffeeName, src) {
    let counter = 0;
    if(activeBalance >= 0) {
        moneyBalance.value =  activeBalance;
        PROGRESS.classList.remove("d-none");
        displayText.innerHTML = "Ваш " + coffeeName + " готовится.";
        moneyBalance.style.background = "";
        let counterInterval = setInterval(function() {
            if (counter >= 100 ) {
                clearInterval( counterInterval);
                displayText.innerHTML = "Ваш " + coffeeName + " готов.";
                COFFEE_CUP.classList.remove ("d-none");
                COFFEE_CUP.src = src;
                getDisplaySetting ();
            } else {
                counter++;
                progressBar.style.width = counter +"%";
            }
        }, 100)

    } else {
        displayText.innerHTML = "Недостаточно средств";
        moneyBalance.style.background = "red";
    }
}

const getDisplaySetting = function() {
    COFFEE_CUP.onclick = () => {
        COFFEE_CUP.classList.add ("d-none");
        displayText.innerHTML = "Выберите кофе";
        PROGRESS.classList.add("d-none");
        progressBar.style.width = "0%";
    }
}
