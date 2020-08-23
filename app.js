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
  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot
  }
}

handleOperator = (nextOperator) => {
  const { firstOperand, displayValue, operator } = calculator
  const inputValue = parseFloat(displayValue)
  if (firstOperand === null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue
  }
  calculator.waitingForSecondOperand = true
  calculator.operator = nextOperator
  console.log(calculator)
}

updateDisplay = () => {
  const display = document.querySelector('.calculator-screen')
  display.value = calculator.displayValue
}

updateDisplay()

const keys = document.querySelector('.calculator-keys')
keys.addEventListener('click', (event) => {
  const { target } = event
  if (!target.matches('button')) {
    return
  }
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
    console.log('clear', target.value)
    return
  }
  inputDigit(target.value)
  updateDisplay()
})
