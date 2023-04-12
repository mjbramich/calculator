// Operator Functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const operate = (a, b, operator) => operator(a, b);
// change operator from a string to a function call
const changeOperator = (operator) => {
  switch (operator) {
    case '+':
      return add;

    case '-':
      return subtract;

    case '*':
      return multiply;

    case '/':
      return divide;
  }
};


const displayFinal = () => (displayResult.innerHTML = operate);

// HTML elements
const btnContainer = document.querySelector('.btn-container');
const displayResult = document.querySelector('.display-res > h1');
const displayOperations = document.querySelector('.display-sum > h2');
const DISPLAY_LIMIT = 14
const decimalBtn = document.querySelector('.decimal')
let DECIMAL_ALLOWED = true
// variables to hold buttons press/
let displayValue = {
  one: [],
  two: [],
};
let num1, num2
let firstOperator = ''
let lastOperator=''
let operator = '';

// add event listener to buttons
btnContainer.addEventListener('click', buttonPressed);

function buttonPressed(e) {
  const buttonPress = e.target;

  decimalBtn.disabled = DECIMAL_ALLOWED ? false : true
  
  //If clear is pressed reset calculator
  if (buttonPress.classList.contains('clear')) {

    if(buttonPress.classList.contains('ce')){
      backspaceClear()
    }else{
      clearCalc();
    }
  }
  // when a operator button is pressed
  else if ( buttonPress.classList.contains('operators') && !buttonPress.classList.contains('clear')) {
    changeMode(e, 'operator');
  }
  // for when a number button is pressed
  else if (buttonPress.classList.contains('numbers')) {
    changeMode(e, 'numbers');
  }
  //when equals button is pressed
  else if (buttonPress.classList.contains('equals')) {
    changeMode(e, 'equals');
  }
  
}

// clear result and update result
const updateResult = (value) => (displayResult.innerHTML = value);
const clearResult = () => (displayResult.innerHTML = '');

//clear displayOps && update display
const clearDisplayOps = () => (displayOperations.innerHTML = '');
const updateDisplayOps = (value) => {
  const operators = ['+', '-', '*', '/'];
  const lastChar = displayOperations.innerHTML.slice(-1);
  console.log(displayOperations.innerHTML.length);

  if (operators.includes(value) && operators.includes(lastChar)) {
    displayOperations.innerHTML = `${displayOperations.innerHTML.slice(0, -1)}${value}`;
  }else {
    displayOperations.innerHTML += value;
  }

  limitDisplay()
};


const changeMode = (e, mode) => {
    let buttonPress = e.target;

    if (mode === 'operator') {
        lastOperator = operator;
        operator = buttonPress.innerHTML;
        DECIMAL_ALLOWED = true;
        updateDisplayOps(`${buttonPress.innerHTML}`);

        if (displayValue.two.length) {
            if (displayResult.innerHTML) {
                num1 = parseFloat(displayResult.innerHTML);
            } else {
                num1 = parseFloat(displayValue.one.join(''));
            }

            num2 = parseFloat(displayValue.two.join(''));
            clearDisplayOps();
            updateDisplayOps(`${num1} ${lastOperator} ${num2}`);
            updateResult(
                operate(num1, num2, changeOperator(lastOperator)).toFixed(1)
            );
        } else if (displayResult.innerHTML) {
            num1 = parseFloat(displayResult.innerHTML);

            clearDisplayOps();
            updateDisplayOps(`${num1} ${buttonPress.innerHTML} `);
        } else {
            num1 = parseFloat(displayValue.one.join(''));
            clearDisplayOps();
            updateDisplayOps(`${num1} ${buttonPress.innerHTML} `);
        }

        displayValue.two = [];
    } else if (mode === 'numbers') {
        updateDisplayOps(buttonPress.innerHTML);

        // getting array of buttons pressed before a operator is pressed.
        if (buttonPress.classList.contains('numbers') && operator == '') {
            if (buttonPress.innerHTML !== '.') {
                displayValue.one.push(buttonPress.innerHTML);
            } else if (
                DECIMAL_ALLOWED === true &&
                buttonPress.innerHTML === '.'
            ) {
                displayValue.one.push('.');

                DECIMAL_ALLOWED = false;
            }
        }
        //if an operator has been selected
        else if (operator) {
            if (buttonPress.innerHTML !== '.') {
                displayValue.two.push(buttonPress.innerHTML);
            } else if (
                DECIMAL_ALLOWED === true &&
                !displayValue.two.includes('.')
            ) {
                displayValue.two.push('.');

                DECIMAL_ALLOWED = false;
            }

            if (displayResult.innerHTML) {
                // parseFloat of 3. = 3, so we just join the string.
                if (displayValue.two.includes('.')) {
                    num2 = displayValue.two.join('');
                } else {
                    num2 = parseFloat(displayValue.two.join(''));
                }

                num1 = parseFloat(displayResult.innerHTML);
                clearDisplayOps();
                updateDisplayOps(`${num1} ${operator} ${num2}`);
            }
        }
    } else if (mode === 'equals') {
        if (displayValue.two.length) {
            num2 = parseFloat(displayValue.two.join(''));
            updateResult(
                operate(num1, num2, changeOperator(operator)).toFixed(1)
            );
            clearDisplayOps();
            updateDisplayOps(`${num1} ${operator} ${num2} `);

            // after result clear array for next number
            displayValue.two = [];
            DECIMAL_ALLOWED = true;
        }
    }
};

const backspaceClear = () => {

  // if num1? pop num1 else pop num2
  const lastChar = displayOperations.innerHTML.slice(-1)
  if(lastChar === operator || lastChar === ' '){
    displayOperations.innerHTML = displayOperations.innerHTML.slice(0,-2)  
  }else{
    displayOperations.innerHTML = displayOperations.innerHTML.slice(0,-1)
    
  }
  
}

const clearCalc = () => {
  clearDisplayOps();
  clearResult();
  operator = '';
  displayValue.one = [];
  displayValue.two = [];
  num1 = 0
  num2 = 0
  DECIMAL_ALLOWED = true
};




const limitDisplay = () => {
  if(displayResult.innerHTML.length >= DISPLAY_LIMIT){
    displayOperations.innerHTML = 'EXCEEDED DISPLAY LIMIT';
    displayResult.innerHTML = ''
    
  }
}
