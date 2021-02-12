
window.addEventListener('DOMContentLoaded', calcImpact, false);

var values = {
    'soap': 1,
    'blanket': 5,
    'firstaid': 10,
    'learn': 15,
    'hygiene': 20,
    'food': 30,
    'support': 40,
    'shelter': 50
};

var spendAmounts = [1, 5, 10, 15, 20];

function calcImpact(event) {
    var threshold = 5;
    var amountField = document.getElementById('amount');
    var button = document.querySelector('.input-container button');

    const getSpend = _.debounce(calcSpend, 100);

    if (button) {
        button.addEventListener('click', calcSpendBreakdown);
    } else {
        amountField.addEventListener('keyup', getSpend);
    }

    function calcSpendBreakdown() {
        var amount = parseInt(document.getElementById('amount').value, 10);
        amount = Math.trunc(amount);
        var spendItems = [0, 0, 0, 0, 0];
        var lowestPricedItem = spendAmounts[0];
        var remainder;

        if (amount < threshold) {
            resetFields();
        }

        while (amount > lowestPricedItem) {
            for (var i = 0; i < spendAmounts.length; i++) {
                console.log('i ', i);
                remainder = amount - spendAmounts[i];
                if (remainder >= lowestPricedItem) {
                    spendItems[i] += 1;
                    amount = amount - spendItems[i];
                }
                console.log('Amount left ', amount);
                console.log('Current spend item ', spendItems[i]);
                console.log(spendItems);
            }
        }

        updateFields(spendItems);

    }

    function resetFields() {
        var numberFields = document.querySelectorAll('.impact-calculator .number');
        for (var i = 0; i < numberFields.length; i++) {
            numberFields[i].textContent = 0;
        }
    }

    function updateFields(spendItems) {
        var numberFields = document.querySelectorAll('.impact-calculator .number');

        for (var i = 0; i < numberFields.length; i++) {
            numberFields[i].textContent = spendItems[i];
        }
    }

    function calcSpend(event) {
        var amount = getAmount();

        if (amount < threshold) {
            console.log('too small');
            return;
        } else

            if (!button) {
                console.log('keypress');
                calcSpendBreakdown(amount);
            }
    }

    function getAmount(event) {
        var amount = parseInt(document.getElementById('amount').value, 10);
        var firstField = document.getElementById('1');
        amount = Math.trunc(amount);

        if (isNaN(amount)) { return; }

        return amount;
    }


    function setDefaults() {
        var numberFields = document.querySelectorAll('.impact-calculator .number');

        for (var i = 0; i < numberFields.length; i++) {
            numberFields[i].textContent = 0;
        }

    }

    setDefaults();
}    