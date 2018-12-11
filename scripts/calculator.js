function add(number1, number2){
    let result = number1 + number2;
    return result;
}

console.log(add(100, 2));

function subtract(number1, number2){
    let result = number1 - number2;
    return result;
}

console.log(subtract(1, 100));

function multiply(number1, number2){
    let result = number1 * number2;
    return result;
}

console.log(multiply(1, -2));

function divide(number1, number2){
    let result = number1 / number2;
    return result;
}

console.log(divide(2, 0))

function operate(number1, number2, operator){
    let result = 0;
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
            button.innerText = '(-)';
        }
        else if (button.id == 12){
            button.id = 'clear'
            button.innerText = 'Clear'
        }
        else if (button.id == 13){
            button.id = 'exponent';
            button.innerText = '^';
        }
        else if (button.id ==14){
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
    
createButtons();
labelButtons();