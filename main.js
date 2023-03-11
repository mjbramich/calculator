// Operator Functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const operate = (a, b, operator) => operator(a, b);


const displayFinal = () => (displayResult.innerHTML = operate);
// HTML elements
const btnContainer = document.querySelector('.btn-container');
const displayResult = document.querySelector('.display-res > h1');
const displayOperations = document.querySelector('.display-sum > h2');
const DISPLAY_LIMIT = 15
// variables to hold buttons press/

let displayValue = {
  one: [],
  two: [],
};
let num1, num2
let operator = '';

// add event listener to buttons
btnContainer.addEventListener('click', buttonPressed);

function buttonPressed(e) {
  const buttonPress = e.target;

  //If clear is pressed reset calculator
  if (buttonPress.classList.contains('clear')) {

    if(buttonPress.classList.contains('ce')){
      backspaceClear()
    }else{
      clearCalc();
    }
  }
  // when a operator button is pressed
  else if (
    buttonPress.classList.contains('operators') && !buttonPress.classList.contains('clear')) {
    operator = buttonPress.innerHTML;
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

  // User divides by zero display a message
  // if(operator === '/' &&    === 0){
  //   return displayOperations.innerHTML = 'YOU CANNOT DO THAT'
  // }
  limitDisplay()
  
  

  if (operators.includes(value) && operators.includes(lastChar)) {
    displayOperations.innerHTML = `${displayOperations.innerHTML.slice(0, -1)} ${value}`;
  }else {
    displayOperations.innerHTML += value;
  }
};


const changeMode = (e, mode) => {
  let buttonPress = e.target;

  if (mode === 'operator') {
    updateDisplayOps(` ${buttonPress.innerHTML} `)

    num1 = parseInt(displayValue.one.reduce((acc, cur) => acc + cur, 0));

    if (displayResult.innerHTML) {
        num1 = parseInt(displayResult.innerHTML);
        clearDisplayOps();
        updateDisplayOps(`${num1} ${buttonPress.innerHTML} `);
    

    }

    if(displayValue.two.length){
      num2 = parseInt(displayValue.two.reduce((acc,cur) => acc + cur,0))
      updateResult(operate(num1, num2, changeOperator(operator)).toFixed(4));
      clearDisplayOps()
      updateDisplayOps(`${num1} ${operator} ${num2} `)
      displayValue.two = []
    
    }
    

  } else if (mode === 'numbers') {

    updateDisplayOps(buttonPress.innerHTML);

    // getting array of buttons pressed before a operator is pressed.
    if (buttonPress.classList.contains('numbers') && operator == '') {
      displayValue.one.push(buttonPress.innerHTML);
    }

    //if an operator has been selected
    else if (operator) {
      displayValue.two.push(buttonPress.innerHTML);

      
      if (displayResult.innerHTML) {
        num2 = parseInt(displayValue.two.reduce((acc,cur) => acc + cur,0))
        console.log(num2);
        num1 = parseInt(displayResult.innerHTML);
        clearDisplayOps();
        updateDisplayOps(`${num1} ${operator} ${num2} `);
      }


    }

    
  } else if (mode === 'equals') {
   
    if(displayValue.two.length){
      num2 = parseInt(displayValue.two.reduce((acc,cur) => acc + cur,0))
      updateResult(operate(num1, num2, changeOperator(operator)).toFixed(4));
      clearDisplayOps()
      updateDisplayOps(`${num1} ${operator} ${num2} `)
      
    // after result clear array for next number
    displayValue.two = []
    }
};

}



const backspaceClear = () => {
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
};

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


const limitDisplay = () => {
  if(displayOperations.innerHTML.length > DISPLAY_LIMIT){
    displayOperations.innerHTML = 'EXCEEDED DISPLAY LIMIT';
    setTimeout(clearCalc, 2500);
  }
}



// const operatorButtons = Array.from(document.querySelectorAll('.operators'));

// // Function for when a operator button is clicked, cant click same button.
// const disableButtons = () => {
//   operatorButtons.forEach((btn) => {
//     if (!btn.classList.contains('clear') && btn.innerHTML === operator) {
//       btn.disabled = true;
//     } else {
//       btn.disabled = false;
//     }
//   });
// };
