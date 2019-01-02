let displayTextElement = document.querySelector('p'),
displayTextString = '';

const operatorRegExp = /[*/^+-]/,
negativeSignRegExp = /(?<=[*/^+-])[-]/,
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

function operate(number1, number2, operator){
    let result;

    number1 = parseFloat(number1.value);
    number2 = parseFloat(number2.value);

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

    if (buttonText == '+/-' || operatorRegExp.test(buttonText) || buttonText == '.' || buttonText == 'Enter'){
        if (displayTextString.length != 0){
            if (!lastCharWasDecimal() && !lastCharWasOperator()){ //pass if the last char was not an op or a dec
                if (buttonText == '+/-'){
                    changeSigns();
                }
                else if (buttonText == 'Enter'){
                    enter();    
                }
                else if (buttonText == '.' || operatorRegExp.test(buttonText)){
                    if (!decimalInCurrentNumber() || operatorRegExp.test(buttonText)){
                        displayTextString += buttonText;
                    }
                }
            }
            else {
                alert('Your formula contains an operator or a decimal point at the end of it.\
                Modify your input to correct this issue and try again.');
            }
        }
    }
    else { //buttons without any logical restrictions on when they are allowed to be pressed.
        if (buttonText == 'Clear'){
            clear();
        }
        else if (buttonText == 'Delete'){
            deleteText();
        }
        else {
            displayTextString += buttonText;
        }
    }

    displayTextElement.innerText = displayTextString;
}

function decimalInCurrentNumber(){
    let numbers = displayTextString.split(operatorRegExp),
    currentNumber = numbers.pop();

    for (let i = 0; i < currentNumber.length; i++){
        if (currentNumber[i] == '.'){
            return true;
        }
    }
    return false;
}

function lastCharWasOperator(){
    let lastCharacter = displayTextString.split('').pop();

    return operatorRegExp.test(lastCharacter);
}

function lastCharWasDecimal(){
    let lastCharacter = displayTextString.split('').pop();

    return lastCharacter == '.';
}

function clear(){    
    displayTextElement.innerText = '';
    displayTextString = '';
}

function deleteText(){
    displayTextString = displayTextString.slice(0, -1);
    displayTextElement.innerText = displayTextString;
}

function changeSigns(){
    let numbers = '',
    tempString = '',
    currentNumber = [];
    if (negativeSignRegExp.test(displayTextString)){
        numbers = displayTextString.split(/[-](?=[*/^+-])/);
    }   
    else{
        numbers = displayTextString.split(operatorRegExp);
    }
    console.log(numbers);
    currentNumber = numbers.pop()

    tempString = displayTextString.slice(0, displayTextString.lastIndexOf(currentNumber.toString()));

    currentNumber *= -1;
    tempString += currentNumber.toString();
    
    displayTextString = tempString;
    displayTextElement.innerText = displayTextString; 
    
}

function enter(){
    
    displayTextString = processRPN(parseInput(displayTextString));
    displayTextElement.innerText = displayTextString;
    
    function Token(type, value){
        this.type = type;
        this.value = value;
    }
    
    function isDigit(char) {
        return /\d/.test(char);
    }
    
    function isOperator(char) {
    return /[+*/^-]/.test(char);
    }
    
    function tokenize(string){
        let result = [],  //array of tokens
        numberBuffer = [];
          
        // converts the input string to an array of characters
        string = string.split("");
    
        string.forEach(function (char, index) {
            if (isDigit(char)) { //numbers
                numberBuffer.push(char);
            }
            else if (char === '.'){ //decimals
                numberBuffer.push(char);
            }
            else {  //operators and negative signs
                if ( (index === 0) || (isOperator(string[index - 1]) && isDigit(string[index + 1])) ){
                    if (char === '-'){
                        numberBuffer.push(char);
                    }
                }           
                else {
                    emptyNumberBufferAsLiteral();
                    let operator = new Token('Operator', char);
                    result.push(operator);
                }
            } 
        });
        if (numberBuffer.length){
            emptyNumberBufferAsLiteral();
        }
        return result;
    
        function emptyNumberBufferAsLiteral(){
            if (numberBuffer.length){
                result.push(new Token('Literal', numberBuffer.join('')));
                numberBuffer = [];
            }
        }
    }
    
    function parseInput(input){
        let outputQueue = [], //Using a queue to collect numbers and operators, because the data in the queue will be processed in FIFO order
            operatorStack = []; //Using a stack to collect operators while tokens are parsed, because we will need to access newly added data first (LIFO)
    
        Array.prototype.peek = function() {
            return this.slice(-1)[0];
        }
    
        const associativity = {
            '^': 'right',
            '*': 'left',
            '/': 'left',
            '+': 'left',
            '-': 'left'
        },
    
        operatorPrecedence = {
            '^': 4,
            '*': 3,
            '/': 3,
            '+': 2,
            '-': 2
        }
    
        Token.prototype.precedence = function() {
            return operatorPrecedence[this.value];
        };
           
        Token.prototype.associativity = function() {
            return associativity[this.value];
        };
    
        let tokens = tokenize(input);
        
        tokens.forEach(token => {
            if (token.type === 'Literal'){
                outputQueue.push(token);
            }
            else {
                while (operatorStack.peek() && ((token.precedence() < operatorStack.peek().precedence()) 
                    || ((token.precedence() == operatorStack.peek().precedence()) && operatorStack.peek().associativity() == 'left'))){
                        outputQueue.push(operatorStack.pop());
                }
                
                operatorStack.push(token);
            }
        });
        
        return outputQueue.concat(operatorStack.reverse()); //gives us tokenized array in RPN
    }

    function processRPN(tokens){
        let tempAnswer,
        finalAnswer;

        while (tokens.length > 1){
            tokens.forEach(token => {
                if (token.type == 'Operator'){
                    tempAnswer = operate(tokens[tokens.indexOf(token) - 2], tokens[tokens.indexOf(token) - 1], token.value);
                    tempAnswer = new Token('Literal', tempAnswer);
                    tokens.splice((tokens.indexOf(token) - 2), 3, tempAnswer);
                }
            });
        }

        finalAnswer = tokens[0].value.toPrecision(4);
        return finalAnswer;
    }
}

createButtons();
labelAndActivateButtons();