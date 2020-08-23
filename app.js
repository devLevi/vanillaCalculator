let historyValue = document.getElementById('history-value').innerText
var outputValue = document.getElementById('output-value').innerText

function getHistory() {
  return document.getElementById('history-value').innerText
}

function printHistory(num) {
  return (document.getElementById('history-value').innerText = num)
}

function getOutput() {
  return document.getElementById('output-value').innerText
}

function printOutput(num) {
  num == ''
    ? (document.getElementById('output-value').innerText = num)
    : (document.getElementById('output-value').innerText = getFormattedNumber(
        num
      ))
}

function getFormattedNumber(num) {
  let n = Number(num)
  let value = n.toLocaleString('en')
  return value
}

function reverseNumberFormat(num) {
  return Number(num.replace(/,/g, ''))
}

let operator = document.getElementsByClassName('operator')

function clearValue() {
  printHistory('')
  printOutput('')
}

function backspace() {
  let output = reverseNumberFormat(getOutput()).toString()
  if (output) {
    output = output.substr(0, output.length - 1)
    printOutput(output)
  }
}

// clear()
// backspace()

for (var i = 0; i < operator.length; i++) {
  operator[i].addEventListener('click', function () {
    if (this.id == 'clear') {
      clearValue()
    } else if (this.id == 'backspace') {
      backspace()
    } else {
      var output = getOutput()
      var history = getHistory()
      if (output == '' && history != '') {
        if (isNaN(history[history.length - 1])) {
          history = history.substr(0, history.length - 1)
        }
      }
      if (output != '' || history != '') {
        output = output == '' ? output : reverseNumberFormat(output)
        history = history + output
        if (this.id == '=') {
          var result = eval(history)
          printOutput(result)
          printHistory('')
        } else {
          history = history + this.id
          printHistory(history)
          printOutput('')
        }
      }
    }
  })
}

let number = document.getElementsByClassName('number')

for (let i = 0; i < number.length; i++) {
  number[i].addEventListener('click', function () {
    let output = reverseNumberFormat(getOutput())
    if (output != NaN) {
      output = output + this.id
      printOutput(output)
    }
  })
}