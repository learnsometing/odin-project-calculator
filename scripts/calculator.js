let result,
text = document.querySelector('p'),
textString = text.innerText,
textArray,
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
        changeSigns();
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
            storeFormulaInArray();
        }  
    }
}

function clearDisplay(){    
    text.innerText = '';
    textString = '';
}

function deleteText(){
    let lastIndex = textString.length - 1;

    textString = textString.slice(0, lastIndex);
    text.innerText = textString;
}

function changeSigns(){
    let lastArrayIndex = textArray.length - 1,
    lastTypedChar = textArray[lastArrayIndex],
    signOfLastTypedNumber;

    if (!(operatorRegExp.test(lastTypedChar)) || lastTypedChar != '.'){
        signOfLastTypedNumber = Math.sign(lastTypedChar);
        if (signOfLastTypedNumber == 1 || signOfLastTypedNumber == -1){
            lastTypedChar = operate(lastTypedChar, '*', -1);
        }
    }

    textArray.splice(lastIndex, 1, lastTypedChar);
    console.log(textArray);

}

function storeFormulaInArray(){
    let lastIndex = textString.length - 1,
    tempArray = [],
    tempString = '';

    for (let i = 0; i < textString.length; i++){
        let textCharacter = textString.charAt(i),
            charIsOperator = operatorRegExp.test(textCharacter);

        if (charIsOperator || i == lastIndex){
            if (i == lastIndex && !charIsOperator){
                tempString += textCharacter;
            }

            tempArray.push(tempString);
            tempString = '';

            if (charIsOperator){
                tempArray.push(textCharacter);
            }                    
        }
        else{
            tempString += textCharacter;
        }
    }
    console.log(tempArray);
    textArray = tempArray;
    return tempArray;
}

function enter(){
    // let firstCharacter = textString[0],
    // lastCharacter = textString[lastIndex],
    // multipleOperators = /[*/^+-](?=[*/^+-])/;

    // const firstCharIsOperator = operator.test(firstCharacter),
    // multipleOperatorsInARow = multipleOperators.test(textString),
    // lastCharIsOperator = operator.test(lastCharacter);

    // if (firstCharIsOperator || multipleOperatorsInARow || lastCharIsOperator){
    //     alert ('The formula you entered contains errors. Please re-enter your formula.');
    // }

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
            mult = '*'
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
            else{ //subtraction
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

    doTheMath(textArray);
}

createButtons();
labelAndActivateButtons();