const calculator = {
  displayValue: '0', //  a string value representing the input of the user or the result of an operation
  firstOperand: null, //  the first operand for any expression
  waitingForSecondOperand: false, // for checking if the first operand and operator have been inputted
  operator: null, //  the operator for the expression
}

inputDigit = (digit) => {
  const { displayValue, waitingForSecondOperand } = calculator
  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit
    calculator.waitingForSecondOperand = false
  } else {
    calculator.displayValue =
      displayValue === '0' ? digit : displayValue + digit
  }
  console.log(calculator)
}

inputDecimal = (dot) => {
  if (calculator.waitingForSecondOperand === true) {
    calculator.displayValue = '0.'
    calculator.waitingForSecondOperand = false
  }
  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot
  }
}

handleOperator = (nextOperator) => {
  const { firstOperand, displayValue, operator } = calculator
  const inputValue = parseFloat(displayValue)
  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator
    console.log(calculator)
    return
  }
  if (firstOperand === null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator)
    calculator.displayValue = String(result)
    calculator.firstOperand = result
  }
  calculator.waitingForSecondOperand = true
  calculator.operator = nextOperator
  console.log(calculator)
}

calculate = (firstOperand, secondOperand, operator) => {
  if (operator === '+') {
    return firstOperand + secondOperand
  } else if (operator === '-') {
    return firstOperand - secondOperand
  } else if (operator === '*') {
    return firstOperand * secondOperand
  } else if (operator === '/') {
    return firstOperand / secondOperand
  }

  return secondOperand
}

resetCalculator = () => {
  calculator.displayValue = '0'
  calculator.firstOperand = null
  calculator.waitingForSecondOperand = false
  calculator.operator = null
  console.log(calculator)
}

updateDisplay = () => {
  const display = document.querySelector('.calculator-screen')
  display.value = calculator.displayValue
}

updateDisplay()

const keys = document.querySelector('.calculator-keys')
keys.addEventListener('click', (event) => {
  if (target.classList.contains('operator')) {
    handleOperator(target.value)
    updateDisplay()
    return
  }
  if (target.classList.contains('decimal')) {
    inputDecimal(target.value)
    updateDisplay()
    return
  }
  if (target.classList.contains('all-clear')) {
    resetCalculator()
    updateDisplay()
    return
  }
  inputDigit(target.value)
  updateDisplay()
})
