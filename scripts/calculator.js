let displayTextElement = document.querySelector('p'),
displayTextString = '';

const operatorRegExp = /[*/^+-]/;

createButtons();
labelAndActivateButtons();

//Calls the relevant math function depending on the operation is required.
function operate(number1, number2, operator){ 
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
//Make the HTML button elements and add them to the correct div element.
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
//Label the buttons, set their IDs and text, and add event listeners to each button. 
function labelAndActivateButtons(){ 
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
//Calls the function corresponding to the button that was just pressed.
function clicked(button){    
    let buttonText = button.innerText;

    switch(buttonText){
        case 'Enter':
            if (!lastCharWasDecimal() && !lastCharWasOperator()) {
                enter();
            } 
            else {
                displayErrorMessages(3)
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
            displayErrorMessages(0);
            return;
        }   
        // If the buttonText is a digit
        if (isDigit(buttonText)) {
            displayTextString += buttonText;
            return;
        }
        if (displayTextString.length == 0) {
            displayErrorMessages(1);
            return;
        }
        // pass if the last char was not an op or a dec
        if (lastCharWasDecimal() || lastCharWasOperator()) {
            displayErrorMessages(3);
            return;
        }

        if (buttonText == '+/-') {
            changeSigns();
        }
        else if (buttonText == '.'){
            if (!decimalInCurrentNumber()){ //Don't want to allow the user to create IP-address like numbers (ex: 1.1.0)
                displayTextString += buttonText;
            }
            else {
                displayErrorMessages(2);    
            }
        } 
        else {
            displayTextString += buttonText;
        }
    }

    function displayErrorMessages(status){
        if (status == 0){
            alert('You have reached the maximum characters allowed. Please Modify your formula or enter it now.');
        }
        else if (status == 1){
            alert('You cannot start the formula with a decimal point or an operator.');
        }
        else if (status == 2){
            alert('The current number in your formula already contains a decimal point. Modify your input to correct this issue and try again.');
        }
        else {
            alert('Your formula contains an operator or a decimal point at the end of it. Modify your input to correct this issue and try again.');
        }
    }

    displayTextElement.innerText = displayTextString;
}
//Clear the display and the string that holds display contents.
function clear(){    
    displayTextElement.innerText = '';
    displayTextString = '';
}
//Delete the last character in the current display text string. 
function deleteText(){  
    displayTextString = displayTextString.slice(0, -1);
    displayTextElement.innerText = displayTextString;
}
//Changes the sign of the current number to negative or positive.
function changeSigns(){ 
    let tokens = [],
    tempString = '',
    newNumber,
    currentNumber;
    
    if (displayTextString.length > 0){
        tokens = tokenize(displayTextString);
    }

    currentNumber = tokens.pop().value;

    newNumber = new Token('Literal', currentNumber * -1);
    
    tokens.push(newNumber);

    tokens.forEach(token =>{
        tempString += token.value.toString();
    })
    
    displayTextString = tempString;
    displayTextElement.innerText = displayTextString;     
}

function enter(){
    
    displayTextString = processRPN(parseInput(displayTextString));
    
    displayTextElement.innerText = displayTextString;
    //Parses the array of tokens to reverse polish notation using a modified form of the shunting-yard algorithm.
    function parseInput(input){ 
        //Using a queue to collect numbers and operators, because the data in the queue will be processed in FIFO order.
        let outputQueue = [], 
        //Using a stack to collect operators while tokens are parsed, because we will need to access newly added tokens first.
            operatorStack = []; 
        //return the top of the stack. 
        Array.prototype.peek = function() { 
            return this.slice(-1)[0];
        }
        //Need to know if the operator is right or left associative when parsing to reverse polish notation.
        const associativity = { 
            '^': 'right',
            '*': 'left',
            '/': 'left',
            '+': 'left',
            '-': 'left'
        },
        //Need to know the order of operations when parsing to reverse polish notation.
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
        //Modified shunting-yard algorithm.
        tokens.forEach(token => {   
            if (token.type === 'Literal'){
                outputQueue.push(token);
            }
            else {
                while (operatorStack.peek() && (token.precedence() < operatorStack.peek().precedence() 
                    || (token.precedence() == operatorStack.peek().precedence() && operatorStack.peek().associativity() == 'left'))){
                        outputQueue.push(operatorStack.pop());
                }
                
                operatorStack.push(token);
            }
        });
        
        return outputQueue.concat(operatorStack.reverse());
    }
    //Evaluates the reverse polish notation array of tokens to give a single answer. 
    function processRPN(tokens){    
        let tempAnswer,
        finalAnswer = '';

        while (tokens.length > 1){  
            for (let i = 0; i < tokens.length; i++){
                if (tokens[i].type == 'Operator'){
                    tempAnswer = operate(tokens[i - 2].value, tokens[i - 1].value, tokens[i].value);
                    tempAnswer = new Token('Literal', parseFloat(tempAnswer));
                    tokens.splice(i - 2, 3, tempAnswer);
                    break;
                }
            }
        }

        if (tokens.length){
            finalAnswer = tokens[0].value.toString();
            
            if (finalAnswer.length > 15){
                finalAnswer = new Number(finalAnswer)
                finalAnswer = finalAnswer.toPrecision(8);    
            }
        }
        return finalAnswer;
    }
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
//converts the string of numbers and operators to tokens for parsing.
function tokenize(string){   
    let result = [],  //array of tokens
    numberBuffer = [];  //array that holds digits and symbols that make up a number literal
      
    // converts the input string to an array of characters
    string = string.split("");

    string.forEach(function (char, index) {
        //numbers
        if (isDigit(char)){
            numberBuffer.push(parseFloat(char));
        }
        //decimals and scientific notation
        else if (char == '.' || char == 'e'){
            numberBuffer.push(char);
        }
        //operators and negative signs
        else {
            parseOperator(char);
        }
        
        function parseOperator(char){
            //  Adds operator (plus or minus sign) to the number buffer if it is part of scientific notation 
            if (string[index - 1] == 'e'){
                numberBuffer.push(char);
            }
            //  Adds operator (minus sign) to the number buffer if it is intended to be a negative sign
            else if (index == 0 || isOperator(string[index - 1]) && isDigit(string[index + 1])){
                numberBuffer.push(char);
            }      
            //  Creates new literal and operator tokens and adds them to the results array. 
            else {  
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