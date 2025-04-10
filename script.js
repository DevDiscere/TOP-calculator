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

console.log(add(3, 5));
console.log(subtract(3, 5));
console.log(multiply(3, 5));
console.log(divide(1, 0));
console.log(divide(0, 1));