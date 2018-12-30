let displayTextElement = document.querySelector('p'),
displayTextString = '',
lastIndex,
displayTextArray = [],
currentNumber = '';

const operatorRegExp = /[*/^+-]/,
exponentialRegExp = /e(?=[+-])/;

function exponent(number1, number2){
    let result = number1 ** number2;
    return result;
}

function multiply(number1, number2){
    let result = number1 * number2;
    return result;
}

function divide(number1, number2){
    let result = number1 / number2;
    return result;
}

function add(number1, number2){
    let result = number1 + number2;
    return result;
}

function subtract(number1, number2){
    let result = number1 - number2;
    return result;
}

function operate(number1, operator, number2){
    let result;

    if (operator == '^'){
        result = exponent(number1, number2);
    }
    else if (operator == '*'){
        result = multiply(number1, number2)
    }
    else if (operator == '/') {
        result = divide(number1, number2)
    }
    else if (operator == '+'){
        result = add(number1, number2)
    }
    else {
        result = subtract(number1, number2)
    }  

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
    const display = document.getElementById('display'),
    displayRectangle = display.getBoundingClientRect(),
    displayWidth = displayRectangle.width,
    displayTextRectangle = displayTextElement.getBoundingClientRect(),
    displayTextWidth = displayTextRectangle.width;

    let buttonText = button.innerText;

    if (buttonText == 'Clear'){
        clear();
    }
    else if (buttonText == 'Delete'){
        deleteText();
    }
    else if (buttonText == 'Enter'){
        if (!operatorRegExp.test(displayTextString[lastIndex])){
            displayTextArray.push(currentNumber);
            enter();
        }
    }
    else {  //numbers, decimals, change signs and operators.
        if (displayTextWidth < displayWidth){
            if (operatorRegExp.test(buttonText)){ // ^, *, /, +, and -
                if (!displayTextString == '' && !operatorRegExp.test(displayTextString[lastIndex])){ //prevent users from starting the string with an operator, or stringing multiple operators together
                    displayTextString += buttonText;
                    displayTextArray.push(currentNumber);
                    currentNumber = '';
                    displayTextArray.push(buttonText);
                }
            }
            else if (buttonText == '+/-'){
                if (currentNumber != ''){
                    changeSigns();
                }
            }
            else if (buttonText == '.'){    //decimal points
                if (!displayTextString == '' && !containsDecimals()){
                    displayTextString += buttonText;
                    currentNumber += buttonText;
                }
            }
            else {  //numbers
                displayTextString += buttonText;
                currentNumber += buttonText;
            }  
            displayTextElement.innerText = displayTextString;
            lastIndex = displayTextString.length - 1;
        }
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

function clear(){    
    displayTextElement.innerText = '';
    displayTextString = '';
    currentNumber = '';
    displayTextArray = [];
}

function deleteText(){
    displayTextString = displayTextString.slice(0, lastIndex);
    lastIndex = displayTextString.length - 1;
    currentNumber = currentNumber.slice(0, currentNumber.length - 1);
    displayTextElement.innerText = displayTextString;
}

function changeSigns(){
    let temporaryString,
    temporaryNumber;

    temporaryNumber = operate(currentNumber, '*', -1);
    temporaryString = displayTextString.replace(currentNumber, temporaryNumber.toString());

    currentNumber = temporaryNumber.toString();
    displayTextString = temporaryString;
    lastIndex = displayTextString.length - 1;
    displayTextElement.innerText = displayTextString;
}

function enter(){
    doTheMath(displayTextArray);

    function doTheMath(array){
        let finalAnswer,
            tempAnswer,
            operatorIndex,
            firstOperandIndex,
            secondOperandIndex,
            firstOperand,
            secondOperand,
            operator;

        
            while(operatorRegExp.test(array)){
                if (!exponentialRegExp.test(array)){
                    if (array.includes('^')){
                        operatorIndex = array.indexOf('^');
                    }
                    else if (array.includes('*')){
                        operatorIndex = array.indexOf('*');
                    }
                    else if (array.includes('/')){
                        operatorIndex = array.indexOf('/');
                    }
                    else if (array.includes('+')){
                        operatorIndex = array.indexOf('+');
                    }
                    else{ 
                        if ((array.length == 1) && (Math.sign(array[0]) == -1)){
                            break;
                        }
                        else {
                            operatorIndex = array.indexOf('-');
                        }
                    }
                }
                else {
                    break;
                }

                firstOperandIndex = operatorIndex - 1;
                secondOperandIndex = operatorIndex + 1;

                firstOperand = parseFloat(array[firstOperandIndex]);
                secondOperand = parseFloat(array[secondOperandIndex]);
                operator = array[operatorIndex];

                tempAnswer = operate(firstOperand, operator, secondOperand).toPrecision(4);
                array.splice(firstOperandIndex, 3, tempAnswer);
            }

            finalAnswer = array.toString();

            clear();
            displayTextElement.innerText = finalAnswer;
            return finalAnswer;

        }
}

createButtons();
labelAndActivateButtons();