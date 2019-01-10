let displayTextElement = document.querySelector('p'),
displayTextString = '';

const operatorRegExp = /[*/^+-]/;

function operate(number1, number2, operator){ //Calls the relevant math function depending on what operation is required.
    let result;

    if (operator == '^'){
        result = exponent(number1, number2);
    }
    else if (operator == '*'){
        result = multiply(number1, number2);
    }
    else if (operator == '/') {
        result = divide(number1, number2);
    }
    else if (operator == '+'){
        result = add(number1, number2);
    }
    else {
        result = subtract(number1, number2);
    }  

    function exponent(number1, number2){
        return number1 ** number2;
    }
    
    function multiply(number1, number2){
        return number1 * number2;
    }
    
    function divide(number1, number2){
        return number1 / number2;
    }
    
    function add(number1, number2){
        return number1 + number2;
    }
    
    function subtract(number1, number2){
        return number1 - number2;
    }

    return result;
}

function createButtons(){ //Make the HTML button elements and add them to the correct div element. 
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

function labelAndActivateButtons(){ //Label the buttons, set their IDs and text, and add event listeners to each button. 
    let buttons = document.querySelectorAll('button');

    function labelButtons(){
        buttons.forEach((button) => {
            switch(button.id){
                case '10':
                button.id = 'decimal';
                button.innerText = '.';
                break;

                case '11':
                button.id = 'exponent';
                button.innerText = '^';
                break;

                case '12':
                button.id = 'clear';
                button.innerText = 'Clear';
                break;

                case '13':
                button.id = 'delete'
                button.innerText = 'Delete'
                break;

                case '14':
                button.id = 'sign change';
                button.innerText = '+/-';
                break;

                case '15':
                button.id = 'multiply';
                button.innerText = '*';
                break;

                case '16':
                button.id = 'subtract';
                button.innerText = '-';
                break;

                case '17':
                button.id = 'add';
                button.innerText = '+';
                break;

                case '18':
                button.id = 'divide';
                button.innerText = '/';
                break;

                case '19':
                button.id = 'enter';
                button.innerText = 'Enter';
                break;

                default:               
                button.innerText = button.id;
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

function clicked(button){   //Calls the function corresponding to the button that was just pressed. 
    let buttonText = button.innerText;

    switch(buttonText){
        case 'Enter':
            if (!lastCharWasDecimal() && !lastCharWasOperator()) {
                enter();
            } 
            break;

        case 'Delete':
            deleteText();
            break;

        case 'Clear':
            clear();
            break;

        default:
            parseButtonText(buttonText);
    }

    function parseButtonText(buttonText) {
        if (displayTextString.length >= 15) {
            alert('You have reached the maximum characters allowed. Please Modify your formula or enter it now.');
            return;
        }
        // If the buttonText is a digit
        if (/\d/.test(buttonText)) {
            displayTextString += buttonText;
            return;
        }
        if (displayTextString.length == 0) {
            alert('You cannot start the formula with a decimal point or an operator.');
            return;
        }
        // pass if the last char was not an op or a dec
        if (lastCharWasDecimal() || lastCharWasOperator()) {
        alert('Your formula contains an operator or a decimal point at the end of it. Modify your input to correct this issue and try again.');
                return;
        }
        if (buttonText == '+/-') {
            changeSigns();
        }
        else if (buttonText == '.' || operatorRegExp.test(buttonText)) {
            if (!decimalInCurrentNumber() || operatorRegExp.test(buttonText)) {
                displayTextString += buttonText;
            }
        }
    }

    displayTextElement.innerText = displayTextString;
}

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

function tokenize(string){  //converts the string of numbers and operators to tokens for parsing. 
    let result = [],  //array of tokens
    numberBuffer = [];  //array that holds digits and symbols that make up a number literal
      
    // converts the input string to an array of characters
    string = string.split("");

    string.forEach(function (char, index) {
        if (isDigit(char)) { //numbers
            numberBuffer.push(parseFloat(char));
        }
        else if (char === '.'){ //decimals
            numberBuffer.push(char);
        }
        else {  //operators and negative signs
            if ( (index === 0) || (isOperator(string[index - 1]) && isDigit(string[index + 1])) ){ //Adds negative signs to the number literal.
                if (char === '-'){
                    numberBuffer.push(char);
                }
            }           
            else {  //Creates operator tokens. 
                emptyNumberBufferAsLiteral();
                let operator = new Token('Operator', char);
                result.push(operator);
            }
        } 
    });
    if (numberBuffer.length){   //Empties the numberBuffer at the end of the string.
        emptyNumberBufferAsLiteral();
    }
    return result;

    function emptyNumberBufferAsLiteral(){  //Create a token from the characters held in the number buffer. 
        if (numberBuffer.length){
            result.push(new Token('Literal', parseFloat(numberBuffer.join(''))));
            numberBuffer = [];
        }
    }
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

function clear(){   //Clear the display and the string that holds display contents. 
    displayTextElement.innerText = '';
    displayTextString = '';
}

function deleteText(){  //Delete the last character in the current display text string. 
    displayTextString = displayTextString.slice(0, -1);
    displayTextElement.innerText = displayTextString;
}

function changeSigns(){ //Changes the sign of the current number to negative or positive.
    let numbers = [],
    tempString = '',
    currentNumber = [];
    
    if (displayTextString.length > 0){
        numbers = tokenize(displayTextString);
    }

    currentNumber = numbers.pop().value;

    tempString = displayTextString.slice(0, displayTextString.lastIndexOf(currentNumber.toString()));

    currentNumber *= -1;
    tempString += currentNumber.toString();
    
    displayTextString = tempString;
    displayTextElement.innerText = displayTextString;     
}

function enter(){
    
    displayTextString = processRPN(parseInput(displayTextString));
    displayTextElement.innerText = displayTextString;
    
    function parseInput(input){ //Parses the array of tokens to reverse polish notation using a modified form of the shunting-yard algorithm.
        let outputQueue = [], //Using a queue to collect numbers and operators, because the data in the queue will be processed in FIFO order.
            operatorStack = []; //Using a stack to collect operators while tokens are parsed, because we will need to access newly added tokens first.
    
        Array.prototype.peek = function() { //return the top of the stack. 
            return this.slice(-1)[0];
        }
    
        const associativity = { //Need to know if the operator is right or left associative when parsing to reverse polish notation.
            '^': 'right',
            '*': 'left',
            '/': 'left',
            '+': 'left',
            '-': 'left'
        },
    
        operatorPrecedence = {  //Need to know the order of operations when parsing to reverse polish notation.
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
        
        tokens.forEach(token => {   //Modified shunting-yard algorithm.
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
        
        return outputQueue.concat(operatorStack.reverse());
    }

    function processRPN(tokens){    //Evaluates the reverse polish notation array of tokens to give a single answer. 
        let tempAnswer,
        finalAnswer = '';

        while (tokens.length > 1){  
            tokens.forEach(token => {
                if (token.type == 'Operator'){
                    let operatorIndex = tokens.indexOf(token);

                    tempAnswer = operate(tokens[operatorIndex - 2].value, tokens[operatorIndex - 1].value, token.value);
                    tempAnswer = new Token('Literal', parseFloat(tempAnswer));
                    tokens.splice(operatorIndex - 2, 3, tempAnswer);
                }
            });
        }

        if (tokens.length){
            finalAnswer = tokens[0].value.toPrecision(4);   
        }
        return finalAnswer.toString();
    }
}

createButtons();
labelAndActivateButtons();