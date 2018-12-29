let result,
text = document.querySelector('p'),
textString = text.innerText,
currentNumber = '',
lastIndex,
textArray = [],
textRect = text.getBoundingClientRect(),
textWidth = textRect.width,
display = document.getElementById('display'),
displayRect = display.getBoundingClientRect(),
displayWidth = displayRect.width;

const operatorRegExp = /[*/^+-]/;


function add(number1, number2){
    result = number1 + number2;
    return result;
}

function subtract(number1, number2){
    result = number1 - number2;
    return result;
}

function multiply(number1, number2){
    result = number1 * number2;
    return result;
}

function divide(number1, number2){
    result = number1 / number2;
    return result;
}

function exponent(number1, number2){
    result = number1 ** number2;
    return result;
}

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

    Math.round(result).toPrecision(4);
    return result;
}

/**********************************************************************************************************************************/

function createButtons(){
    let numbersContainer = document.getElementById("numbers"),
        operatorsContainer = document.getElementById('operators'),
        button;

    for (let numButtons = 0; numButtons < 20; numButtons++){
        button = document.createElement('button');
        button.id = numButtons;

        if (button.id < 15){
            numbersContainer.appendChild(button);
        }
        else {
            operatorsContainer.appendChild(button);
        }
    }
}

function labelAndActivateButtons(){
    let buttons = document.querySelectorAll('button');

    function labelButtons(){
        buttons.forEach((button) => {
            if (button.id < 10){
                button.innerText = button.id;
            }
            else if (button.id == 10){
                button.id = 'decimal';
                button.innerText = '.';
            }
            else if (button.id == 11){
                button.id = 'exponent'
                button.innerText = '^'
            }
            else if (button.id == 12){
                button.id = 'clear';
                button.innerText = 'Clear';
            }
            else if (button.id == 13){
                button.id = 'delete'
                button.innerText = 'Delete'
            }
            else if (button.id == 14){
                button.id = 'sign change';
                button.innerText = '+/-';
            }
            else if (button.id == 15){
                button.id = 'multiply';
                button.innerText = '*'
            }
            else if (button.id == 16){
                button.id = 'subtract';
                button.innerText = '-'
            }
            else if (button.id == 17){
                button.id = 'add';
                button.innerText = '+';
            }
            else if (button.id == 18){
                button.id = 'divide';
                button.innerText = '/';
            }
            else {
                button.id = 'enter';
                button.innerText = 'Enter';
            }
        });
    }

    function activateButtons(){
        buttons.forEach((button) => {
            button.addEventListener('click', (e) => {clicked(button);});
        });
    }

    labelButtons();
    activateButtons();
}

function clicked(button){
    let buttonText = button.innerText;

    if (buttonText == 'Clear'){
        clearDisplay();
    }
    else if (buttonText == 'Delete'){
        deleteText();
    }
    else if (buttonText == '+/-'){
        if (currentNumber != ''){
            changeSigns();
        }
    }
    else if (buttonText == 'Enter'){
        textArray.push(currentNumber);
        enter();
    }
    else {  //numbers and operators
        if (operatorRegExp.test(buttonText)){
            if (!textString == '' && !operatorRegExp.test(textString[lastIndex])){ //prevent users from starting the string with an operator, or stringing multiple operators together
                textString += buttonText;
                textArray.push(currentNumber);
                currentNumber = '';
                textArray.push(buttonText);
            }
        }
        else if (buttonText == '.'){
            if (!textString == '' && !containsDecimals()){
                textString += buttonText;
                currentNumber += buttonText;
            }
        }
        else {
            textString += buttonText;
            currentNumber += buttonText;
        }  
        text.innerText = textString;
        lastIndex = textString.length - 1;
    }
}

function containsDecimals(){
    for (let i = 0; i < currentNumber.length; i++){
        if (currentNumber.charAt(i) == '.'){
            return true;
        }
    }

    return false;
}

function clearDisplay(){    
    text.innerText = '';
    textString = '';
    currentNumber = '';
    textArray = [];
}

function deleteText(){
    textString = textString.slice(0, lastIndex);
    lastIndex = textString.length - 1;
    text.innerText = textString;
    // currentNumber = currentNumber.slice(0, currentNumber.length - 1);
}

function changeSigns(){
    let newString,
    tempNumber;

    tempNumber = operate(currentNumber, '*', -1);
    newString = textString.replace(currentNumber,tempNumber);

    currentNumber = tempNumber;
    textString = newString;
    text.innerText = textString;
}

function enter(){
    doTheMath(textArray);

    function doTheMath(array){
        let finalAnswer,
            tempAnswer,
            operatorIndex,
            firstOperandIndex,
            secondOperandIndex,
            firstOperand,
            secondOperand,
            operator,
            exp = '^',
            mult = '*',
            div = '/',
            plus = '+',
            minus = '-';

        while(operatorRegExp.test(array)){
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
            else{ 
                if ((array.length == 1) && (Math.sign(array[0]) == -1)){
                    break;
                }
                else {
                    operatorIndex = array.indexOf(minus);
                }
            }

            firstOperandIndex = operatorIndex - 1;
            secondOperandIndex = operatorIndex + 1;

            firstOperand = parseFloat(array[firstOperandIndex]);
            secondOperand = parseFloat(array[secondOperandIndex]);
            operator = array[operatorIndex];

            tempAnswer = operate(firstOperand, operator, secondOperand);
            array.splice(firstOperandIndex, 3, tempAnswer);
        }

        finalAnswer = array.toString();

        textString = '';
        text.innerText = finalAnswer;
        return finalAnswer;

    }
}

createButtons();
labelAndActivateButtons();