# Web Development 101 - JS Calculator
This JS calculator script that interacts with the HTML DOM tree is the last [JavaScript project](https://www.theodinproject.com/courses/web-development-101/lessons/calculator) I developed in Web Development 101. It features CSS styling, tokenizing and the shunting-yard algorithm. The tokenizer and algorithm are used to parse user input to [Reverse Polish notation](https://en.wikipedia.org/wiki/Reverse_Polish_notation) to preserve order of operations.
## Getting Started
### Prerequisites
- A web browser of your choice with JavaScript enabled.
### Calculate Things
[Use the calculator](https://learnsometing.github.io/odin-project-calculator/) 
### Learning Outcomes
This project opened my eyes to the importance of planning in the development process. My original idea was not planned well, which cost me time and caused me frustration. However, I successfully implemented the shunting-yard algorithm to solve the problems I faced, and learned about stack and queue structures in the process. My first solution to this problem had problematic interactions between the input string and functions that acted on it. Originally, I stored the current formula and the current number being acted on to enable sign changes. This over-complicated things because any time I wanted to add to the string or delete things from it, multiple variables needed to be modified and assigned changing values. Ultimately I caved and decided to research better ways to solve the problem, which led to the implementation of the tokenizing function and the shunting-yard algorithm to streamline the process.  
## Authors
Brian Monaccio
