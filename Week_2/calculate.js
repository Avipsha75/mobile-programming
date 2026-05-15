function showResult(sign) {

    let a = parseFloat(document.getElementById("num1").value);
    let b = parseFloat(document.getElementById("num2").value);

    let total;

    if (sign == '+') {
        total = a + b;
    }

    else if (sign == '-') {
        total = a - b;
    }

    else if (sign == '*') {
        total = a * b;
    }

    else if (sign == '/') {
        total = a / b;
    }

    document.getElementById("answer").innerHTML = "Answer: " + total;
}