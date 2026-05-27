let totalBalance = 10000;
let pin = "4321";

let balanceVisible = true;

function checkPin() {

    let userPin = prompt("Enter PIN:");

    if (userPin == pin) {
        return true;
    } 
    else {
        alert("Wrong PIN!");
        return false;
    }
}

function updateBalance() {

    if (balanceVisible) {
        document.getElementById("money").innerText = "Balance: Rs. " + totalBalance;
    }
}

function addMoney() {

    $("#cash").show();

    if (!checkPin()) return;

    let amount = Number(document.getElementById("cash").value);

    if (amount > 0) {

        totalBalance += amount;

        document.getElementById("status").innerText =
        "Deposit Successful ✔";
    } 
    
    else {

        document.getElementById("status").innerText =
        "Enter valid amount";
    }

    updateBalance();
}

function takeMoney() {

    $("#cash").show();

    if (!checkPin()) return;

    let amount = Number(document.getElementById("cash").value);

    if (amount <= 0) {

        document.getElementById("status").innerText =
        "Enter valid amount";
    }

    else if (amount % 100 != 0) {

    document.getElementById("status").innerText =
    "Amount must be multiple of 100";
    }

    else if (amount > totalBalance) {

        document.getElementById("status").innerText =
        "Insufficient balance";
    }

    else {

        totalBalance -= amount;

        document.getElementById("status").innerText =
        "Please collect cash ✔";
    }

    updateBalance();
}

$("#eyeIcon").click(function () {
    balanceVisible = false;
    if (balanceVisible) {

        $("#money").text("Balance: Rs. *****");

        $("#eyeIcon")
        .removeClass("fa-eye")
        .addClass("fa-eye-slash");
    }

    else {
        balanceVisible = true;
        $("#money").text(
            "Balance: Rs. " + totalBalance
        );

        $("#eyeIcon")
        .removeClass("fa-eye-slash")
        .addClass("fa-eye");
    }
});