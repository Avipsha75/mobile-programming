let totalBalance = 10000;
let pin = "4321";

function checkPin() {
    let userPin = prompt("Enter PIN:");

    if (userPin == pin) {
        return true;
    } else {
        alert("Wrong PIN!");
        return false;
    }
}

function updateBalance() {
    document.getElementById("money").innerText =
        "Balance: Rs. " + totalBalance;
}

function addMoney() {

    if (!checkPin()) return;

    let amount = Number(document.getElementById("cash").value);

    if (amount > 0) {
        totalBalance += amount;
        document.getElementById("status").innerText = "Deposit Successful ✔";
    } else {
        document.getElementById("status").innerText = "Enter valid amount";
    }

    updateBalance();
}

function takeMoney() {

    if (!checkPin()) return;

    let amount = Number(document.getElementById("cash").value);

    if (amount <= 0) {
        document.getElementById("status").innerText = "Enter valid amount";
    }
    else if (amount > totalBalance) {
        document.getElementById("status").innerText = "Insufficient balance";
    }
    else {
        totalBalance -= amount;
        document.getElementById("status").innerText = "Please collect cash ✔";
    }

    updateBalance();
}