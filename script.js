const clearHolderValues = function clearHolderValues () {
    operatorHolder = "";
    firstOperandHolder = "";
    secondOperandHolder = "";
    isEquationEvaluated = false;
}

const operate = function operate (numericalData) {
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
        return firstOperand / secondOperand;
    }
    
    const modulo = function modulo (firstOperand, secondOperand) {
        return firstOperand % secondOperand;
    }

    const formatStringPrecision = function formatStringPrecision (numberValue) {
        // Set numberValue to fixed-notation of 10 decimal places,
        // Then parse the string as float to remove trailing zeroes,
        // Then convert the floating value to string.
        return String(Number.parseFloat(numberValue.toFixed(10)));
    }

    switch (numericalData.operator) {
        case "+": return formatStringPrecision(add(numericalData.firstOperand, numericalData.secondOperand));
        case "–": return formatStringPrecision(subtract(numericalData.firstOperand, numericalData.secondOperand));
        case "×": return formatStringPrecision(multiply(numericalData.firstOperand, numericalData.secondOperand));
        case "÷": return formatStringPrecision(divide(numericalData.firstOperand, numericalData.secondOperand));
        case "mod": return formatStringPrecision(modulo(numericalData.firstOperand, numericalData.secondOperand));
    }
}

const populateCalculatorDisplay= function populateCalculatorDisplay(choice) {
    let textDisplay = document.querySelector("p.text-display");

    // Set text display to hidden if C is clicked or first operand is empty
    if (choice === "clear" || firstOperandHolder === "") {
        textDisplay.classList.add("hidden")
        textDisplay.textContent = "0";
    } else {
        textDisplay.classList.remove("hidden");
        textDisplay.textContent = `${firstOperandHolder} ${operatorHolder} ${secondOperandHolder}`;
    }
}

const processCalculatorInput = function processCalculatorInput (targetButtonInput) {
    class Expression {
        constructor(firstOperand, operator, secondOperand) {
            this.firstOperand = firstOperand;
            this.operator = operator;
            this.secondOperand = secondOperand;
        }
    }

    const numberList = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
    const operationList = ["mod", "÷", "×", "–", "+", "( )"];
    const commandList = ["C", "CE", "="];

    // Early return if input is anything but a number
    if (operationList.includes(targetButtonInput) && firstOperandHolder === "") return alert("Invalid format.");
    if (commandList.includes(targetButtonInput) && firstOperandHolder === "") return;

    // First operand
    if (numberList.includes(targetButtonInput) && operatorHolder === "") {
        const maxDigits = 15;
        // Considers decimal part as not included in the 15 digit limit.
        if (firstOperandHolder.includes(".") && firstOperandHolder.length > maxDigits) return alert("Can't enter more than 15 digits");
        if (!firstOperandHolder.includes(".") && firstOperandHolder.length >= maxDigits) return alert("Can't enter more than 15 digits.");
        // Prevent trailing zeroes before decimal point
        if (targetButtonInput === "0" && firstOperandHolder.at(0) === "0" && !firstOperandHolder.includes(".")) return;
        // Prevent multiple decimal points
        if (targetButtonInput === "." && firstOperandHolder.includes(".")) return;
        // Overwrites the evaluated result when user clicks a new number
        if (isExpressionEvaluated) {     
            // Prepends zero if operand holder does not have decimal point
            if (targetButtonInput === "." && !firstOperandHolder.includes(".")) {
                firstOperandHolder = "0" + targetButtonInput;
            } else {
                firstOperandHolder = targetButtonInput;
            }

            isExpressionEvaluated = false;  
        } else {
            if (targetButtonInput === "." && firstOperandHolder === "") {
                firstOperandHolder = "0" + targetButtonInput;
            } else if (targetButtonInput !== "0" && targetButtonInput !== "." && firstOperandHolder === "0") {
                firstOperandHolder = targetButtonInput;
            } else {
                firstOperandHolder += targetButtonInput;
            } 
        }
    }

    // Operator
    if (operationList.includes(targetButtonInput)) {
        if ((operatorHolder === "mod" || operatorHolder === "÷") && secondOperandHolder === "0") return alert("Can't divide by zero.");
        // Chain operation
        if (firstOperandHolder !== ""  && operatorHolder !== "" && secondOperandHolder !== "") {
            const calculatorExpression = new Expression(Number(firstOperandHolder), operatorHolder, Number(secondOperandHolder));
            
            clearHolderValues();
            firstOperandHolder = operate(calculatorExpression);
            isExpressionEvaluated = true;
        }

        operatorHolder = targetButtonInput;
    }

    // Second Operand
    if (numberList.includes(targetButtonInput) && operatorHolder !== "") {
        // Considers decimal part as not included in the 15 digit limit.
        if (secondOperandHolder.includes(".") && secondOperandHolder.length > 15) return alert("Can't enter more than 15 digits");
        if (!secondOperandHolder.includes(".") && secondOperandHolder.length >= 15) return alert("Can't enter more than 15 digits.");
        // Prevent trailing zeroes before decimal point
        if (targetButtonInput === "0" && secondOperandHolder.at(0) === "0" && !secondOperandHolder.includes(".")) return;
        // Prevent multiple decimal points
        if (targetButtonInput === "." && secondOperandHolder.includes(".")) return;

        if (targetButtonInput === "." && secondOperandHolder === "") {
            secondOperandHolder = "0" + targetButtonInput;
        } else if (targetButtonInput !== "0" && targetButtonInput !== "." && secondOperandHolder === "0") {
            secondOperandHolder = targetButtonInput;
        } else {
            secondOperandHolder += targetButtonInput;
        }
    }

    // Equal Button
    if (targetButtonInput === "=" && firstOperandHolder !== "" && operatorHolder !== "") {
        if (secondOperandHolder === "") return alert("Invalid format.");
        if ((operatorHolder === "mod" || operatorHolder === "÷") && secondOperandHolder === "0") return alert("Can't divide by zero.");

        const calculatorExpression = new Expression(Number(firstOperandHolder), operatorHolder, Number(secondOperandHolder));
        
        clearHolderValues();
        firstOperandHolder = operate(calculatorExpression);
        isExpressionEvaluated = true;
    }

    // Clear: Clear all inputs of the calculator
    if (targetButtonInput === "C") {
        clearHolderValues();
        return populateCalculatorDisplay("clear");
    }

    // Clear Entry: Removes the last input from the expression
    if (targetButtonInput == "CE") {
        if (operatorHolder === "" && secondOperandHolder === "") {
            firstOperandHolder = firstOperandHolder.slice(0, firstOperandHolder.length - 1);
        } else if (firstOperandHolder !== "" && secondOperandHolder === "") {
            operatorHolder = operatorHolder.slice(0, operatorHolder.length - 1);
        } else if (firstOperandHolder !== "" && operatorHolder !== "") {
            secondOperandHolder = secondOperandHolder.slice(0, secondOperandHolder.length - 1);
        }
    }

    populateCalculatorDisplay();
}

const keyButtons = document.querySelectorAll("button.key");
let operatorHolder = "";
let firstOperandHolder = "";
let secondOperandHolder = "";
let isExpressionEvaluated = false;

keyButtons.forEach( (button) => {
    button.addEventListener("click", () => processCalculatorInput(button.textContent));
});

// Keyboard support
window.addEventListener("keydown", (event) => {
    let keyboardInput = event.key;
    
    if (event.key === "%") keyboardInput = "mod";
    if (event.key === "/") keyboardInput = "÷";
    if (event.key === "*") keyboardInput = "×";
    if (event.key === "-") keyboardInput = "–";
    if (event.key === "Enter") keyboardInput = "=";
    if (event.key === "Backspace") keyboardInput = "CE";
    if (event.key === "Delete") keyboardInput = "C";

    processCalculatorInput(keyboardInput);
});