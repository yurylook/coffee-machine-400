'use strict'

const COFFEE_ITEMS = document.body.querySelectorAll(".container .coffee-item");
const COFFEE_BALANCE_DISPLAY = document.body.querySelector(".coffee-balance");
const PROGRESS = document.body.querySelector(".progress");
const COFFEE_CUP = document.body.querySelector(".coffee-cup img");
const CHANGE_BOX = document.body.querySelector(".coffee-change");
const CHANGE_BUTTON = document.body.querySelector(".btn");
const CASH_BILLS =  document.body.querySelectorAll(".wallet img");
let progressBar = document.body.querySelector(".progress-bar");
let moneyBalance = document.body.querySelector(".coffee-balance input");
let displayText = document.body.querySelector(".display-text");
let coffeePreparation = 0;
console.log(CASH_BILLS);

for(let coffeeItem of COFFEE_ITEMS) {
    coffeeItem.onclick = function() {
        let activeBalance = +moneyBalance.value - (+this.getAttribute("cost"));
        let coffeeName = this.getAttribute("name");
        let src = this.querySelector("img").src;
        if (!coffeePreparation)
        getCoffee(activeBalance, coffeeName, src);
    }
}

const getCoffee = function(activeBalance, coffeeName, src) {
    let counter = 0;
    if(activeBalance >= 0) {
        coffeePreparation = 1;
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
        coffeePreparation = 0;
    }
}

const generateRandomNumber = function (min, max) {
    return Math.round(min + Math.random() * (max - min));
  }

function createRandomImages(num) {
  let coin = document.createElement ("div");
  coin.className = "coin";
  coin.innerHTML = `<img src="./img/${num}rub.png"  >`;
  let changeBoxCoord = CHANGE_BOX.getBoundingClientRect();
  coin.style.top = generateRandomNumber( 0, changeBoxCoord.height - 55 ) + "px";
  coin.style.left = generateRandomNumber( 0, changeBoxCoord.width - 55 ) + "px";
  CHANGE_BOX.append(coin);
  coin.onclick =function () {
    this.remove();
  }
}

function returnChange(balance){
    if ( balance >= 10) {
    createRandomImages(10);
    balance-=10;
    moneyBalance.value = balance;
    returnChange(balance);
    } else if ( balance >= 5 ) {
    createRandomImages(5);
    balance -=5;
    moneyBalance.value = balance;
    returnChange(balance);
    } else if ( balance >= 2 ) {
    createRandomImages(2);
    balance -=2;
    moneyBalance.value = balance;
    returnChange(balance);
    } else if ( balance == 1 ) {
    balance -=1;
    createRandomImages(1);
    moneyBalance.value = balance;
    }
}

CHANGE_BUTTON.onclick = () => {
    if (+moneyBalance.value > 0) returnChange(+moneyBalance.value);
}

for (const bill of CASH_BILLS) {
        bill.onmousedown = dragBill;
    }

function dragBill(event) {
    event.preventDefault();
    const bill = this;
    bill.style.transform = "rotate(90deg)";
    const billCoords = bill.getBoundingClientRect();
    bill.style.position = "absolute";
    bill.style.top = event.clientY - billCoords.width/2 + "px";
    bill.style.left = event.clientX - billCoords.height/2 + "px";

    window.onmousemove = function(event) {
        bill.style.top = event.clientY - billCoords.width/2 + "px";
        bill.style.left = event.clientX - billCoords.height/2 + "px";
    }

    bill.onmouseup = function(event) {
        window.onmousemove = null;
        bill.onmouseup = null;
        bill.hidden = true;
        const elementBelow = document.elementFromPoint(event.clientX, event.clientY); //Считываем элемент под курсором
        bill.hidden = false;
        let billValue = bill.getAttribute("value");
        if ( elementBelow.classList.contains("bill-acc")) {
            moneyBalance.value = Number(moneyBalance.value) + Number(billValue);
            bill.remove();
        } else bill.style.transform = "rotate(0deg)";
    }
}

