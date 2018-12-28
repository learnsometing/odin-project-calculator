let result;
    
function add(number1, number2){
    result = number1 + number2;
    return result;
}

// console.log(add(100, 2));

function subtract(number1, number2){
    result = number1 - number2;
    return result;
}

// console.log(subtract(1, 100));

function multiply(number1, number2){
    result = number1 * number2;
    return result;
}

// console.log(multiply(1, -2));

function divide(number1, number2){
    result = number1 / number2;
    return result;
}

// console.log(divide(2, 0));

function exponent(number1, number2){
    result = number1 ** number2;
    return result;
}

// console.log(exponent(2, 2));

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
    else if (operator == '^'){
        result = exponent(number1, number2);
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

function clicked(button){
    let buttonText = button.innerText,
    text = document.querySelector('p'),
    textString = text.innerText,
    textRect = text.getBoundingClientRect(),
    textWidth = textRect.width,
    display = document.getElementById('display'),
    displayRect = display.getBoundingClientRect(),
    displayWidth = displayRect.width;

    if (buttonText == 'Clear'){
        clearDisplay();
    }
    else if (buttonText == 'Delete'){
        deleteText();
    }
    else if (buttonText == 'Enter'){
        enter();
    }
    else{
        if (textWidth == displayWidth){ //need to check the width of the text vs the width of the rectangle here.
            alert('You have reached the maximum character limit. Enter your input or modify it to stay within the display.');
        }
        else {
            textString += buttonText;
            text.innerText = textString;
        }  
    }
}

function clearDisplay(){
    let text = document.querySelector('p');
    
    text.innerText = '';
}

function deleteText(){
    let text = document.querySelector('p');
        textString = text.innerText,
        lastIndex = textString.length - 1;

        textString = textString.slice(0, lastIndex);
        text.innerText = textString;
}

function enter(){
    let text = document.querySelector('p'),
        textString = text.innerText;

    function convertToArray(){
        firstCharacter = textString[0],
        lastIndex = textString.length - 1,
        lastCharacter = textString[lastIndex],
        textArray = [],
        tempString = '',
        operator = /[*/^+-]/,
        multipleOperators = /[*/^+-](?=[*/^+-])/;

        const firstCharIsOperator = operator.test(firstCharacter),
            multipleOperatorsInARow = multipleOperators.test(textString),
            lastCharIsOperator = operator.test(lastCharacter);

        if (firstCharIsOperator || multipleOperatorsInARow || lastCharIsOperator){
            alert ('The formula you entered contains errors. Please re-enter your formula.');
        }
        else {
            for (let i = 0; i < textString.length; i++){
                let textCharacter = textString.charAt(i),
                    charIsOperator = operator.test(textCharacter);

                if (charIsOperator || i == lastIndex){
                    if (!(i == lastIndex)){
                        textArray.push(tempString);
                        tempString = '';
                    }

                    textArray.push(textCharacter);
                }
                else{
                    tempString += textCharacter;
                }
            }
        }
        console.log(textArray);

        return textArray;
    }

    function doTheMath(array){
        let finalAnswer,
            tempAnswer,
            operatorIndex,
            firstOperandIndex,
            secondOperandIndex,
            firstOperand,
            secondOperand,
            operator,
            operators = /[*^/+-]/,
            exp = '^',
            mult = '*'
            div = '/',
            plus = '+',
            minus = '-';

        while(operators.test(array)){
            if (array.includes(exp)){
                operatorIndex = array.indexOf(exp);
            }
            else if (array.includes(mult)){
                operatorIndex = array.indexOf(mult);
            }
            else if (array.includes(div)){
                operatorIndex = array.indexOf(div);
            }
            else if (array.includes(plus)){
                operatorIndex = array.indexOf(plus);
            }
            else{ //minus
                operatorIndex = array.indexOf(minus);
            }
            console.log(operatorIndex);

            firstOperandIndex = operatorIndex - 1;
            secondOperandIndex = operatorIndex + 1;

            firstOperand = parseFloat(array[firstOperandIndex]);
            secondOperand = parseFloat(array[secondOperandIndex]);
            operator = array[operatorIndex];

            tempAnswer = operate(firstOperand, operator, secondOperand);
            array.splice(firstOperandIndex, 3, tempAnswer);
        }

        console.log(array);

        finalAnswer = array.toString();
        console.log(finalAnswer);
        Math.round(finalAnswer);

        console.log(finalAnswer);

        text.innerText = finalAnswer;
        return finalAnswer;

    }

    doTheMath(convertToArray());
}

createButtons();
labelButtons();
activateButtons();