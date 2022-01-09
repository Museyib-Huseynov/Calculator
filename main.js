
function myFunc(val) {
  var result = document.getElementById("res");
  if (result.innerHTML.length > 10) {
    result.setAttribute("style", "font-size: 20px; line-height: 100px;");
  } else {
    result.setAttribute("style", "font-size: 40px; line-height: 60px;");
  }
  result.innerHTML = result.innerHTML + val;
}

function calc() {
  var result = document.getElementById("res");
  var digitNumber = eval(result.innerHTML).toString().length;

  var float = eval(result.innerHTML).toString().includes("."); //true or false
  if (!float && digitNumber < 9) {
    result.innerHTML = eval(result.innerHTML);
  } else if (float && digitNumber > 11) {
    result.innerHTML = eval(result.innerHTML).toFixed(6);
  } else if (digitNumber > 9) {
    result.innerHTML = eval(result.innerHTML).toExponential(2);
  } else {
    result.innerHTML = eval(result.innerHTML)
  }
  // if (digitNumber > 9) {
  //   result.innerHTML = (eval(result.innerHTML).toExponential(2));
  // } else {
  //   result.innerHTML = eval(result.innerHTML);
  // }
}

function reset() {
  var result = document.getElementById("res");
  result.innerHTML = '';
}

window.addEventListener('keypress', function(e) {
  var keyCode = e.which;
  var valueEntered = String.fromCharCode(keyCode);
  if (Number.isInteger(parseInt(valueEntered)) ||
      valueEntered == '+' ||
      valueEntered == '-' ||
      valueEntered == '*' ||
      valueEntered == '/' ||
      valueEntered == '.') {
    myFunc(valueEntered);
  } else if (keyCode == 13 || valueEntered == "=") {
      e.preventDefault();
      calcNew();
  }
})

window.addEventListener('keydown', function(e) {
  var keyCode = e.which;
  if (keyCode == 46) {
    reset();
  } else if (keyCode == 8) {
    clearOne();
  }
})

function reCalculate() {
  var a = document.getElementById("res").innerHTML;
  var mathOperator, secondElement;
  if (a.includes("+")) {
    mathOperator = a[a.indexOf("+")];
    secondElement = a.slice(a.indexOf("+") + 1);
  } else if (a.includes("-")) {
    mathOperator = a[a.indexOf("-")];
    secondElement = a.slice(a.indexOf("-") + 1);
  } else if (a.includes("*")) {
    mathOperator = a[a.indexOf("*")];
    secondElement = a.slice(a.indexOf("*") + 1);
  } else if (a.includes("/")) {
    mathOperator = a[a.indexOf("/")];
    secondElement = a.slice(a.indexOf("/") + 1);
  }
  return [mathOperator, secondElement]
}


function calcNew() {
  var index, untilMath, checkOp, afterMath;
  var result = document.getElementById("res");
  if (result.innerHTML.includes("sqrt")) {
    result.innerHTML = result.innerHTML.replace("sqrt", "Math.sqrt");
    index = result.innerHTML.indexOf('Math.sqrt');
    untilMath = result.innerHTML.slice(0, index);
    checkOp = untilMath.slice(-1);
    afterMath = result.innerHTML.slice(index);
    if (checkOp != '' && checkOp != '+' && checkOp != '-' && checkOp != '*' && checkOp != '/') {
      untilMath = untilMath.concat('*');
      result.innerHTML = untilMath + afterMath;
    }
  }
  if (result.innerHTML.includes("sin")) {
    result.innerHTML = result.innerHTML.replace("sin(", "Math.sin((Math.PI/180)*");
    index = result.innerHTML.indexOf('Math.sin');
    untilMath = result.innerHTML.slice(0, index);
    checkOp = untilMath.slice(-1);
    afterMath = result.innerHTML.slice(index);
    if (checkOp != '' && checkOp != '+' && checkOp != '-' && checkOp != '*' && checkOp != '/') {
      untilMath = untilMath.concat('*');
      result.innerHTML = untilMath + afterMath;
    }
  }
  if (result.innerHTML.includes("cos")) {
    result.innerHTML = result.innerHTML.replace("cos(", "Math.cos((Math.PI/180)*");
    index = result.innerHTML.indexOf('Math.cos');
    untilMath = result.innerHTML.slice(0, index);
    checkOp = untilMath.slice(-1);
    afterMath = result.innerHTML.slice(index);
    if (checkOp != '' && checkOp != '+' && checkOp != '-' && checkOp != '*' && checkOp != '/') {
      untilMath = untilMath.concat('*');
      result.innerHTML = untilMath + afterMath;
    }
  }
  if (((result.innerHTML.includes("+")) && (!result.innerHTML.includes("e"))) ||
      (result.innerHTML.slice(1).includes("-") && (!result.innerHTML.includes("e"))) ||
      result.innerHTML.includes("*") ||
      result.innerHTML.includes("/") ||
      result.innerHTML.includes("sqrt") ||
      result.innerHTML.includes("sin") ||
      result.innerHTML.includes("cos")) {
    reCalc = reCalculate();
    calc();
  } else {
    var digitNumber = eval(result.innerHTML + reCalc[0] + reCalc[1]).toString().length;
    if (digitNumber > 9) {
      result.innerHTML = eval(result.innerHTML + reCalc[0] + reCalc[1]).toExponential(2);
    } else {
      result.innerHTML = eval(result.innerHTML + reCalc[0] + reCalc[1]);
    }
  }
}

function clearOne() {
  var result = document.getElementById("res");
  result.innerHTML = result.innerHTML.slice(0, -1);
}

// slide to left using pure js, but can't slide back with slide effect
// function slide() {
//   var advanced = document.getElementById('advanced');
//   if (advanced.style.display != "block") {
//     advanced.style.display = "block";
//     advanced.style.animation = "slide 1s"
//   } else {
//     advanced.style.animation = "slide 1s reverse"
//     advanced.style.display = "none";
//   }
// }

$("#adv").click(function() {
  $("#advanced").animate({width: 'toggle'}, 500);
})


function toRadians(angle) {
  return angle * (Math.PI / 180);
}
