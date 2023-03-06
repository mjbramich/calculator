// Operator Functions
const add = (a , b) => a + b
const subtract = (a, b) => a - b
const multiply = (a, b) => a * b
const divide = (a, b) => a / b

const operate = (a, b, operator ) => operator(a,b)




const displayFinal = () => displayResult.innerHTML = operate
// HTML elements
const btnContainer = document.querySelector('.btn-container')
const displayResult = document.querySelector('.display-res > h1')
const displayOperations = document.querySelector('.display-sum > h2')

// variables to hold buttons press/
let operator 


const array = []
// add event listener to buttons
btnContainer.addEventListener('click', buttonPressed)



function buttonPressed(e) {
    const buttonPress = e.target
        let num1 = 5;
        let num2 = 10;

    //If clear is pressed reset calculator
    if(buttonPress.classList.contains('clear')){
        clearCalc()
    }

    if(buttonPress.classList.contains('operators') && !(buttonPress.classList.contains('clear'))){
        operator = divide
        console.log(e);

        
    }
    else if(!buttonPress.classList.contains('operators') && !(buttonPress.classList.contains('clear'))){
       displayOps(buttonPress.innerHTML)

        

      
       
    }
    
    if(buttonPress.innerHTML == '='){
        console.log(operator);
        console.log(operate(num1, num2, operator))
        
    }
}

const displayOps = (button) => {
    displayOperations.innerHTML += `${button}` 


}


const clearCalc = () => {
        displayResult.innerHTML = ''
        displayOperations.innerHTML = ''
        operator = ''
        num1 = 0
        num2 = 0
        temp = 0
}


// when i press 