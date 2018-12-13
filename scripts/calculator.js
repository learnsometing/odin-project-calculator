let result;
    
function add(number1, number2){
    result = number1 + number2;
    return result;
}

console.log(add(100, 2));

function subtract(number1, number2){
    result = number1 - number2;
    return result;
}

console.log(subtract(1, 100));

function multiply(number1, number2){
    result = number1 * number2;
    return result;
}

console.log(multiply(1, -2));

function divide(number1, number2){
    result = number1 / number2;
    return result;
}

console.log(divide(2, 0))

function operate(number1, operator, number2){
    if (operator == '+'){
        result = add(number1, number2)
    }
    else if (operator == '-'){
        result = subtract(number1, number2)
    }
    else if (operator == '*'){
        result = multiply(number1, number2)
    }
    else {
        result = divide(number1, number2)
    }
    return result;
}

function createButtons(){
    let numbersContainer = document.getElementById("numbers"),
        operatorsContainer = document.getElementById('operators'),
        button;
    for (let numButtons = 0; numButtons < 20; numButtons++){
        button = document.createElement('button');
        button.id = numButtons
        if (button.id < 15){
            numbersContainer.appendChild(button);
        }
        else {
            operatorsContainer.appendChild(button);
        }
        
    }
    
}

function labelButtons(){
    let buttons = document.querySelectorAll('button');

    buttons.forEach((button) => {
        if (button.id < 10){
            button.innerText = button.id;
        }
        else if (button.id == 10){
            button.id = 'decimal';
            button.innerText = '.';
        }
        else if (button.id == 11){
            button.id = 'negative-sign';
            button.innerText = '(- )';
        }
        else if (button.id == 12){
            button.id = 'clear'
            button.innerText = 'Clear'
        }
        else if (button.id == 13){
            button.id = 'exponent';
            button.innerText = '^';
        }
        else if (button.id == 14){
            button.id = 'delete'
            button.innerText = 'Delete'
        }
        else if (button.id == 15){
            button.id = 'divide';
            button.innerText = '/';
        }
        else if (button.id == 16){
            button.id = 'multiply';
            button.innerText = '*'
        }
        else if (button.id == 17){
            button.id = 'subtract';
            button.innerText = '-'
        }
        else if (button.id == 18){
            button.id = 'add';
            button.innerText = '+';
        }
        else {
            button.id = 'enter';
            button.innerText = 'Enter'
        }
    });
}

function activateButtons(){
    let buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {clicked(button);});
    });
}

function clicked(input){
    let button = input,
    buttonText = button.innerText,
    display = document.getElementById('display'),
    displayText;

    if (buttonText == 'Clear'){
        clearDisplay();
    }
    else if (buttonText == 'Delete'){
        deleteText();
    }
    else if (buttonText == 'Enter'){
        //call operate() method
    }
    else{
        displayText = document.createElement('p');
        displayText.textContent = buttonText;
        display.appendChild(displayText);
    }  
}

function clearDisplay(){
    let display = document.getElementById('display'),
        paragraph = document.querySelector('p');
    
    if (display.contains(paragraph)){
        let displayText = document.querySelectorAll('p');
        displayText.forEach((paragraph) => {
            display.removeChild(paragraph);
        });
    }
}

function deleteText(){
    let display = document.getElementById('display'),
        paragraph = document.querySelector('p');
    
    if (display.contains(paragraph)){
        let lastChild = display.lastChild;
        display.removeChild(lastChild);
    }
}

createButtons();
labelButtons();
activateButtons();