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
    let buttonsContainer = document.getElementById("buttons"),
        button;
    for (let numButtons = 0; numButtons < 20; numButtons++){
        button = document.createElement('button');
        button.innerText = numButtons;
        buttonsContainer.appendChild(button);
    }
}
    
createButtons();