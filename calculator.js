document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let displayValue = '0';
    let firstValue = null;
    let operator = null;
    let waitingForSecondValue = false;

    function updateDisplay() {
        display.innerText = displayValue;
    }

    function handleNumber(value) {
        if (waitingForSecondValue) {
            displayValue = value;
            waitingForSecondValue = false;
        } else {
            displayValue = displayValue === '0' ? value : displayValue + value;
        }
    }

    function handleOperator(nextOperator) {
        const value = parseFloat(displayValue);

        if (firstValue === null) {
            firstValue = value;
        } else if (operator) {
            const result = performCalculation(firstValue, value, operator);
            displayValue = String(result);
            firstValue = result;
        }

        waitingForSecondValue = true;
        operator = nextOperator;
    }

    function performCalculation(first, second, operator) {
        switch (operator) {
            case '+':
                return first + second;
            case '-':
                return first - second;
            case '*':
                return first * second;
            case '/':
                return second !== 0 ? first / second : 'Error';
            case '%':
                return first % second;
            default:
                return second;
        }
    }

    function handleClear() {
        displayValue = '0';
        firstValue = null;
        operator = null;
        waitingForSecondValue = false;
    }

    function handleDelete() {
        displayValue = displayValue.slice(0, -1) || '0';
    }

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const { value } = button.dataset;

            if (!isNaN(value) || value === '.') {
                handleNumber(value);
            } else if (value === 'AC') {
                handleClear();
            } else if (value === 'DEL') {
                handleDelete();
            } else if (value === '=') {
                if (operator && !waitingForSecondValue) {
                    handleOperator(operator);
                    operator = null;
                }
            } else {
                handleOperator(value);
            }

            updateDisplay();
        });
    });

    updateDisplay();
});
