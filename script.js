const add = function add (firstOperand, secondOperand) {
    return firstOperand + secondOperand;
}

const subtract = function subtract (firstOperand, secondOperand) {
    return firstOperand - secondOperand;
}

const multiply = function multiply (firstOperand, secondOperand) {
    return firstOperand * secondOperand;
}

const divide = function divide (firstOperand, secondOperand) {
    if (secondOperand === 0) return "Can't divide by zero."
    return firstOperand / secondOperand;
}

const operate = function operate (operator, firstOperand, secondOperand) {
    switch (operator) {
        case "+": return add(firstOperand, secondOperand);
        case "-": return subtract(firstOperand, secondOperand);
        case "*": return multiply(firstOperand, secondOperand);
        case "/": return divide(firstOperand, secondOperand);
    }
}

console.log(operate("+", 3, 5));
console.log(operate("-", 3, 5));
console.log(operate("*", 3, 5));
console.log(operate("/", 1, 0));
console.log(operate("/", 0, 1));