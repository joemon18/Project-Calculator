const numbers = document.querySelectorAll(".numbers");
const symbols = document.querySelectorAll(".symbols");
let display = document.getElementById('display');
let firstOperand = '';
let secondOperand = '';
let operation = null;
let shouldResetDisplay = false;

function appendNumber(number) {
    if (shouldResetDisplay) {
        firstOperand = '';
        secondOperand = '';
        operation = null;
        shouldResetDisplay = false;
    }
    if (operation === null) {
        firstOperand += number;
    } else {
        secondOperand += number;
    }
    updateDisplay();
}

function setOperation(op) {
    if (firstOperand === '') return;
    if (secondOperand !== '') calculateResult();
    operation = op;
    if (shouldResetDisplay) {
        shouldResetDisplay = false;
    }
    updateDisplay();
}

function calculateResult() {
    let result;
    const first = parseFloat(firstOperand);
    const second = parseFloat(secondOperand);

    switch (operation) {
        case '+':
            result = first + second;
            break;
        case '-':
            result = first - second;
            break;
        case '*':
            result = first * second;
            break;
        case '/':
            result = second !== 0 ? first / second : 'Error';
            break;
        case '%':
            result = second !== 0 ? first % second : 'Error';
            break;
        default:
            return;
    }

    display.value = result;
    firstOperand = result.toString();
    secondOperand = '';
    operation = null;
    shouldResetDisplay = true;
}

function clearDisplay() {
    firstOperand = '';
    secondOperand = '';
    operation = null;
    display.value = '';
    shouldResetDisplay = false;
}



function clearLastInput() {
    if (shouldResetDisplay) {
        clearDisplay();
        return;
    }
    if (operation === null) {
        firstOperand = firstOperand.slice(0, -1);
    } else if (secondOperand !== '') {
        secondOperand = secondOperand.slice(0, -1);
    } else {
        operation = null;
    }
    updateDisplay();
}

function updateDisplay() {
    display.value = `${firstOperand}${operation !== null ? ` ${operation} ` : ''}${secondOperand}`;
}


numbers.forEach((number) => {
    let displayNumbers = number.innerText;
    number.addEventListener("click", () => {
        appendNumber(displayNumbers);
    })
})


symbols.forEach((symbol) => {
    let op = symbol.innerText;
    symbol.addEventListener("click", () => {
        setOperation(op);
    })
})