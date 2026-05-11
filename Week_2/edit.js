function calculate() {
    let s1 = Number(document.getElementById("sub1").value);
    let s2 = Number(document.getElementById("sub2").value);
    let s3 = Number(document.getElementById("sub3").value);
    let s4 = Number(document.getElementById("sub4").value);
    let s5 = Number(document.getElementById("sub5").value);
    let s6 = Number(document.getElementById("sub6").value);
    let s7 = Number(document.getElementById("sub7").value);
    let s8 = Number(document.getElementById("sub8").value);
    
    let total_marks = s1 + s2 + s3 + s4 + s5 + s6 + s7 + s8;

    let division = "";
    let color = "";

    if (total_marks > 700) {
        division = "Distinction";
        color = "green";
    }

    else if (total_marks > 600) {
        division = "First Division";
        color = "black";
    }

    else if (total_marks > 500) {
        division = "Second Division";
        color = "black";
    }

    else if (total_marks > 400) {
        division = "Third Division";
        color = "black";
    }

    else {
        division = "Fail";
        color = "red";
    }

    document.getElementById("result").innerHTML = "Total Marks = " + total_marks + "<br>" + division;
    document.getElementById("result").style.color = color;
}

