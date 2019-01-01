let inputString = '';

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
    
    return outputQueue.concat(operatorStack.reverse());    
}