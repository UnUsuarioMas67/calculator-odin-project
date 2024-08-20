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

let firstNumber, secondNumber, operator;
