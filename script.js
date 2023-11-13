// variables for control ----------------->

let maxTextLength = 12;

// query selectors ----------------------->

let screenText = document.querySelector('#screen-text');

let digitButtons = document.querySelectorAll('.digit');
let operatorButtons = document.querySelectorAll('.operator');
let plusMinusButton = document.querySelector('#plus-minus');
let equalsButton = document.querySelector('#equals');
let clearButton = document.querySelector('#clear');
let pointButton = document.querySelector('#point');

//

let numberA;
let numberB;
let operator;
let answer;

let readyForNumberB = false;
let readyForAnswer = false;

// event listeners ----------------------->

digitButtons.forEach(digitButton => {
    digitButton.addEventListener('click', e => {
        let digit = digitButton.textContent;
        if (readyForNumberB) {
            numberA = screenText.textContent;
            screenText.textContent = '';
            readyForNumberB = false;
            readyForAnswer = true;
            show('digitIF');
        }
        printDigitToScreen(digit);
        show('digit');
    });
});

operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener('click', e => {
        if (readyForAnswer) {
            printAnswer();
            operator = operatorButton.textContent;
            readyForNumberB = true;
            show('operatorIF');
        }
        readyForNumberB = true;
        operator = operatorButton.textContent;
        show('operator');
    });
});

equalsButton.addEventListener('click', e => {
    if (readyForAnswer && !readyForNumberB) {
        printAnswer();
        operator = '';
        readyForNumberB = true;
        readyForAnswer = false;
        show('equal');
    };
});

plusMinusButton.addEventListener('click', e => {
    if (screenText.textContent > 0) {
        screenText.textContent = '-' + screenText.textContent;
    } else if (screenText.textContent < 0) {
        screenText.textContent = screenText.textContent.slice(1);
    };
});

clearButton.addEventListener('click', e => {
    screenText.textContent = '';
    numberA = 0;
    numberB = 0;
    operator = '';
    answer = 0;
    readyForNumberB = false;
    readyForAnswer = false;
});

pointButton.addEventListener('click', e => {
    screenText.textContent += pointButton.textContent;
})


// functions ----------------------------->

function printDigitToScreen(digit) {
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
    let data = {
        point, 
        numberA, 
        numberB, 
        operator, 
        answer, 
        readyForNumberB, 
        readyForAnswer
    };
    console.table(data);
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
    while (crudeAnswer.length > maxTextLength) {
        if (Number.isInteger(crudeAnswer)) {
            return 'Too big.';
        } else {
            crudeAnswer = crudeAnswer.slice(0, -1);
        }
    }
    return crudeAnswer;
}