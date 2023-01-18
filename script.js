const calScreen = document.querySelector("#calculation");
const resultScreen = document.querySelector("#result");

const operatorButtons = document.querySelectorAll(".operator");

const buttons = document.querySelectorAll(".button");
const addButton = document.querySelector("#add");
const subtractButton = document.querySelector("#subtract");
const multiplyButton = document.querySelector("#multiply");
const divideButton = document.querySelector("#divide");
const percentButton = document.querySelector("#percent");
const floatButton = document.querySelector("#float");

const clearButton = document.querySelector("#clear");
const deleteButton = document.querySelector("#delete");
const operateButton = document.querySelector("#operate");

const numberButtons = document.querySelectorAll(".number");

let calculation = "";

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

let operator = "";
let firstNumber = "";
let secondNumber = "";
let ans = 0;
let result = 0;

function calculate() {
    let found = false;

    for(let i = 0; i < calculation.length; i++) {
        if (isOperator(calculation[i])) {
            operator = calculation[i];
            found = true;
            continue;
        }

        if (calculation[i] === "%") {
            result /= 100;
            continue;
        }

        if (!found) {
            firstNumber += calculation[i];
            result = firstNumber;
        }
        else {
            secondNumber += calculation[i];
            if (isOperator(calculation[i+1]) || i == calculation.length - 1 || calculation[i+1] === "%") {
                firstNumber = +firstNumber; 
                secondNumber = +secondNumber;

                if (operator === "+")
                    result = add(firstNumber, secondNumber);
                else if (operator === "-")
                    result = subtract(firstNumber, secondNumber);
                else if (operator === "*")
                    result = multiply(firstNumber, secondNumber);
                else if (operator === "/")
                    result = divide(firstNumber, secondNumber);
                
                firstNumber = result; 
                secondNumber = "";

                found = false;
            } 
        }
    }
    return result;
}

function isOperator(a) {
    if (a === "+" || a === "-" || a === "*" || a === "/")
        return true;

    return false;
}

function clear() {
    calculation = "";
    operator = "";
    firstNumber = "";
    secondNumber = "";
    result = 0;
}

function operate() {
    // error 
    if (calculation.length > 20) {
        calScreen.textContent = "";
        resultScreen.textContent = "Math Error";
        clear();
        return;
    }

    let floatError = [...calculation].reduce(function(numOfFpts, c) { 
        if(c === ".")
            numOfFpts++; 
        return numOfFpts;
    }, 0);
    
    let operatorError = function(calculation) {
        let count = 0;
        for (let i = 0; i < calculation.length-1; i++) {
            if (isOperator(calculation[i]) || calculation[i] === "%") {
                count++;
                if (isOperator(calculation[i+1]) || calculation[i+1] === "%")
                    return true;
            }
        }
        if (calculation[calculation.length-1] === "%")
            count++;
            
        if (count == calculation.length)
            return true;
        return false;
    }

    if ((isOperator(calculation[calculation.length-1])) || floatError 
        || operatorError(calculation) || (calculation.includes("/0"))) {
        calScreen.textContent = "";
        resultScreen.textContent = "Syntax Error";
        clear();
        return;
    }

    if (isOperator(calculation[0]))
        firstNumber = ans;
    else {
        firstNumber = "";
        secondNumber = "";
    }

    result = calculate();
    ans = result;

    resultScreen.textContent = result;
    calculation = "";
}

operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculation += button.textContent;
        calScreen.textContent = calculation;
    })
})

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (calculation.length > 17)
            calculation = calculation.slice(1);

        calculation += button.id;
        calScreen.textContent = calculation;
    })
})

clearButton.addEventListener("click", () => {
    clear();
    calScreen.textContent = calculation;
    resultScreen.textContent = "0";
})

deleteButton.addEventListener("click", () => { 
    calculation = calculation.slice(0, calculation.length - 1)
    calScreen.textContent = calculation;
})

buttons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
        button.style.backgroundColor = "rgb(90, 90, 90)";
    })
    button.addEventListener("mousedown", () => {
        button.style.backgroundColor = "rgb(70, 70, 70)";
    })
    button.addEventListener("mouseout", () => {
        button.style.backgroundColor = "white";
    })
})

operateButton.addEventListener("click", operate);

