const add = (n1, n2) => n1 + n2;
const substract = (n1, n2) => n1 - n2;
const multiply = (n1, n2) => n1 * n2;
const divide = (n1, n2) => n1 / n2;

const operate = function (operator, n1, n2) {
  switch (operator) {
    case "+":
      return add(n1, n2);
    case "-":
      return substract(n1, n2);
    case "*":
      return multiply(n1, n2);
    case "/":
      return divide(n1, n2);
    default:
      throw new SyntaxError("Invalid operator");
  }
};

const buttons = document.querySelectorAll(".btn");
const numberElem = document.querySelector(".number");

let firstNumber, secondNumber, operator;

buttons.forEach((item) => {
  item.onclick = () => {
    const operators = ["+", "-", "*", "/"];

    switch (item.textContent) {
      case "C":
        clearCalculator();
        break;
      case "+/-":
        changeSign();
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        setOperator(item.textContent);
        break;
      case "=":
        doCalculation();
        break;
      case "DEL":
        backspace();
        break;
      default:
        updateDisplay(item.textContent);
        break;
    }
  };
});

const clearCalculator = function () {
  numberElem.textContent = "";
  firstNumber = undefined;
  secondNumber = undefined;
  operator = undefined;
};

const changeSign = function () {
  const parsedNumber = parseFloat(numberElem.textContent);
  if (isNaN(parsedNumber) || parsedNumber === 0) {
    return;
  }

  numberElem.textContent = parsedNumber * -1;
  if (firstNumber) {
    firstNumber = parsedNumber * -1;
  }
};

const updateDisplay = function (n) {
  if (n === "." && numberElem.textContent.includes(".")) {
    return;
  }

  if (numberElem.textContent === "0" && n !== ".") {
    numberElem.textContent = "";
  }
  if (
    firstNumber &&
    !operator &&
    parseFloat(numberElem.textContent) === firstNumber
  ) {
    numberElem.textContent = "";
    firstNumber = undefined;
  }

  numberElem.textContent +=
    n === "." && numberElem.textContent === "" ? "0." : n;
};

const setOperator = function (op) {
  if (numberElem.textContent === "") {
    return;
  }

  if (operator && firstNumber) {
    doCalculation();
  }

  firstNumber = firstNumber || parseFloat(numberElem.textContent);
  operator = op;
  numberElem.textContent = "";
};

const doCalculation = function () {
  if (!firstNumber || !operator || numberElem.textContent === "") {
    return;
  }

  // get second number
  secondNumber = parseFloat(numberElem.textContent);

  const result = operate(operator, firstNumber, secondNumber);
  const resultRounded = Math.round(result * 10000) / 10000; // round to 4 decimals

  numberElem.textContent = resultRounded;
  firstNumber = resultRounded;
  secondNumber = undefined;
  operator = undefined;
};

const backspace = function () {
  const slicedString = numberElem.textContent.slice(0, numberElem.textContent.length - 1);
  numberElem.textContent = slicedString;
}