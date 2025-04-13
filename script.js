const getCalculatorInputs = function getCalculatorInputs (targetButton) {
    const numberList = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
    const operationList = ["mod", "÷", "×", "–", "+", "( )"];
    const commandList = ["C", "CE", "="];

    // Check if the first input is an operator instead of a number
    if (operationList.includes(targetButton.textContent) && firstOperandHolder === "") return alert("Invalid format.")
    if (commandList.includes(targetButton.textContent) && firstOperandHolder === "") return

    if (numberList.includes(targetButton.textContent)) {
        if (firstOperandHolder !== "" && operatorHolder !== "") {
            secondOperandHolder += targetButton.textContent;
        } else {
            firstOperandHolder += targetButton.textContent;
        }
        
    } else if (operationList.includes(targetButton.textContent) && firstOperandHolder !== "") {
        operatorHolder = targetButton.textContent;
    }

    if (targetButton.textContent === "=") {
        class NumericalData {
            constructor(operator, firstOperand, secondOperand) {
                this.operator = operator;
                this.firstOperand = firstOperand;
                this.secondOperand = secondOperand;
            }
        }
        
        const numericalData = new NumericalData(operatorHolder, Number(firstOperandHolder), Number(secondOperandHolder));
        
        // Reset the contents of the holders
        firstOperandHolder = "";
        operatorHolder = "";
        secondOperandHolder = "";

        firstOperandHolder = operate(numericalData);
    }

    // Populate calculator display with result
    displayCalculatorResult();
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
        if (secondOperand === 0) return "Can't divide by zero."
        return firstOperand / secondOperand;
    }
    
    const modulo = function modulo (firstOperand, secondOperand) {
        if (secondOperand === 0) return "Can't divide by zero."
        return firstOperand % secondOperand;
    }

    switch (numericalData.operator) {
        case "+": return String(add(numericalData.firstOperand, numericalData.secondOperand));
        case "–": return String(subtract(numericalData.firstOperand, numericalData.secondOperand));
        case "×": return String(multiply(numericalData.firstOperand, numericalData.secondOperand));
        case "÷": return String(divide(numericalData.firstOperand, numericalData.secondOperand));
        case "mod": return String(modulo(numericalData.firstOperand, numericalData.secondOperand));
    }
}

const displayCalculatorResult = function displayCalculatorResult () {
    let textDisplay = document.querySelector("p.text-display");

    if (textDisplay.classList.contains("hidden")) {
        textDisplay.classList.remove("hidden");
    }

    textDisplay.textContent = `${firstOperandHolder} ${operatorHolder} ${secondOperandHolder}`;
}

const keyButtons = document.querySelectorAll("button.key");
let operatorHolder = "";
let firstOperandHolder = "";
let secondOperandHolder = "";

keyButtons.forEach( (button) => {
    button.addEventListener("click", () => getCalculatorInputs(button));
});
