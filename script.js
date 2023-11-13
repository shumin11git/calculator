// variables for control ----------------->

let maxTextLength = 10;
let showCount = 0;

// query selectors ----------------------->

let screenText = document.querySelector('#screen-text');

let digitButtons = document.querySelectorAll('.digit');
let operatorButtons = document.querySelectorAll('.operator');
let plusMinusButton = document.querySelector('#plus-minus');
let equalsButton = document.querySelector('#equals');
let clearButton = document.querySelector('#clear');
let pointButton = document.querySelector('#point');
let buttonKeys = document.querySelectorAll('.key');


let functionsForKeys = {
    '%': handleOperator,
    '/': handleOperator,
    '*': handleOperator,
    '-': handleOperator,
    '+': handleOperator,
    '=': handleEquals,
    '1': handleDigit,
    '2': handleDigit,
    '3': handleDigit,
    '4': handleDigit,
    '5': handleDigit,
    '6': handleDigit,
    '7': handleDigit,
    '8': handleDigit,
    '9': handleDigit,
    '0': handleDigit,
    '.': handlePoint,
    'Backspace': handleClear,
    'Enter': handleEquals
};

//

let numberA;
let numberB;
let operator;
let answer;

let readyForNumberB = false;
let readyForAnswer = false;

// event listeners ----------------------->

digitButtons.forEach(digitButton => {
    digitButton.addEventListener('click', handleDigit);
});

operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener('click', handleOperator);
});

equalsButton.addEventListener('click', handleEquals);

clearButton.addEventListener('click', handleClear);

pointButton.addEventListener('click', handlePoint);

plusMinusButton.addEventListener('click', handlePlusMinus);

window.addEventListener('keydown', handleKey);

// functions ----------------------------->

function printDigitToScreen(digit) {
    screenText.textContent = screenText.textContent.toString();
    if (screenText.textContent.length <= maxTextLength) {
        screenText.textContent += digit;
    }
}

function printAnswer() {
    numberB = screenText.textContent;
    answer = getAnswer(numberA, operator, numberB);
    screenText.textContent = answer;
    numberA = answer;
    numberB = 0;
    show('printAnswer')
}

function show(point) {
    let onScreen = screenText.textContent;
    let data = {
        showCount,
        point, 
        onScreen,
        numberA, 
        numberB, 
        operator, 
        answer, 
        readyForNumberB, 
        readyForAnswer
    };
    console.table(data);
    showCount++;
}

// events

function handleDigit(e) {
    let digit;
    e.type === 'keydown' ? 
        digit = e.key : 
        digit = e.target.textContent ;
    if (readyForNumberB) {
        numberA = screenText.textContent;
        screenText.textContent = '';
        readyForNumberB = false;
        readyForAnswer = true;
        show('digitB');
    }
    printDigitToScreen(digit);
    show('digit');
}

function handleOperator(e) {
    let givenOperator;
    e.type === 'keydown' ? 
        givenOperator = e.key : 
        givenOperator = e.target.textContent ;
    if (readyForAnswer) {
        printAnswer();
        operator = givenOperator;
        readyForNumberB = true;
        show('operatorB');
    }
    readyForNumberB = true;
    operator = givenOperator;
    show('operator');
}

function handleEquals(e) {
    if (operator === '') {
        readyForAnswer = false;
        return;
    };
    if (readyForAnswer && !readyForNumberB) {
        printAnswer();
        operator = '';
        readyForNumberB = true;
        readyForAnswer = false;
        show('equal');
    };
}

function handleClear(e) {
    if (e.key === 'Backspace') {
        screenText.textContent = screenText.textContent.slice(0, -1);
        return;
    }
    screenText.textContent = '';
    numberA = '';
    numberB = '';
    operator = '';
    answer = '';
    readyForNumberB = false;
    readyForAnswer = false;
}

function handlePoint(e) {
    console.log(e.type);
    if (!screenText.textContent.includes('.')) {
        screenText.textContent += '.';
    }
}

function handlePlusMinus(e) {
    if (screenText.textContent.length >= maxTextLength - 1) return;
    if (screenText.textContent > 0 || screenText.textContent === '') {
        screenText.textContent = '-' + screenText.textContent;
    } else if (screenText.textContent < 0|| screenText.textContent === '-') {
        screenText.textContent = screenText.textContent.slice(1);
    };
}

function handleKey(e) {
    if (e.key in functionsForKeys) {
        return functionsForKeys[e.key](e);
    }
}



// arithmetic operations ------------------>

function operate(a, operator, b) {
    switch(operator) {
        case '+':
            return +a + +b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return b == 0 ? 'Illegal ;)' : a / b ;
        case '%':
            return (a * b) / 100;
    }
}

function getAnswer(a, operator, b) {
    let crudeAnswer = operate(a, operator, b);
    if (typeof crudeAnswer !== 'number' ||
        crudeAnswer.length <= maxTextLength) {
        return crudeAnswer;
    }
    while (crudeAnswer.toString().length > maxTextLength) {
        if (Number.isInteger(crudeAnswer)) {
            return 'Too big.';
        } else {
            crudeAnswer = Number(crudeAnswer.toString().slice(0, -1));
        }
    }
    return crudeAnswer;
}