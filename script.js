
const numbersButton = document.querySelectorAll("[data-number]")
const operationButton = document.querySelectorAll("[data-operation]")
const equal = document.getElementById("equality")
const previousDisplayInputElement = document.getElementById("calc-input-1")
const currentDisplayInputElement = document.getElementById("calc-input-2")
const lastDisplayInputElement = document.getElementById("calc-input-3")
const deleteBtn = document.getElementById("delete")
const clearBtn = document.getElementById("clear")

let prevDisplay = ""
let currentDisplay = ""
let result = null
let lastOperation = ""
let haveDot = false

numbersButton.forEach(number => {
    number.addEventListener("click", (e) => {
        if (e.target.innerText === "." && !haveDot) {
          haveDot = true;
        }else if (e.target.innerText === "." && haveDot) {
          return;
        }
        currentDisplay += e.target.innerText;
        currentDisplayInputElement.value = currentDisplay;
    });
});
 operationButton.forEach(operation => {
  operation.addEventListener("click", (e) => {
    if (!currentDisplay) return;
    haveDot = false;
    const operationName = e.target.innerText;
    if (prevDisplay && currentDisplay && lastOperation){
      mathematicsOperation();
    }else {
      result = parseFloat(currentDisplay);
    }
    clearVar(operationName);
    lastOperation = operationName;
  })
 })
 function clearVar(name = "") {
    prevDisplay += `${currentDisplay} ${name} `;
    previousDisplayInputElement.value = prevDisplay;
    currentDisplayInputElement.value = "";
    currentDisplay = "";
    lastDisplayInputElement.value = result;
 }
 
 
  function mathematicsOperation() {
   if (lastOperation === "x"){
     result = parseFloat(result) * parseFloat(currentDisplay)
   }else if (lastOperation === "+") {
    result = parseFloat(result) + parseFloat(currentDisplay)
   }else if (lastOperation === "-") {
    result = parseFloat(result) - parseFloat(currentDisplay)
   }else if (lastOperation === "/") {
    result = parseFloat(result) / parseFloat(currentDisplay)
   }else if(lastOperation === "%"){
    result = parseFloat(result) % parseFloat(currentDisplay)
   };
  };

  equal.addEventListener("click", (e) => {
    if (!currentDisplay || !prevDisplay) return;
    haveDot = false;
    mathematicsOperation();
    clearVar();
    currentDisplayInputElement.value = result;
    lastDisplayInputElement.value = "";
    currentDisplay = result;
    prevDisplay = "";
  })
  clearBtn.addEventListener("click", (e) => {
    previousDisplayInputElement.value = ""
    currentDisplayInputElement.value = ""
    lastDisplayInputElement.value = ""
    prevDisplay = ""
    currentDisplay = ""
    result = ""
  })
  deleteBtn.addEventListener("click", (e) => {
    currentDisplayInputElement.value = ""
    currentDisplay = ""
  });

  window.addEventListener("keydown", (e) => {
    if (
      e.key === "0" ||
      e.key === "1" ||
      e.key === "2" ||
      e.key === "3" ||
      e.key === "4" ||
      e.key === "5" ||
      e.key === "6" ||
      e.key === "7" ||
      e.key === "8" ||
      e.key === "9" ||
      e.key === "." 
    ){
      KeyboardButton(e.key)
    }else if(
      e.key === "+" ||
      e.key === "-" ||
      e.key === "/" ||
      e.key === "%"
    ){
      operationButtons(e.key)
    }else if (e.key === "*"){
      operationButtons("x")
    }else if(e.key === "Enter" || e.key === "=") {
      equal.click()
    }
  });

  function KeyboardButton(key) {
    numbersButton.forEach(numberButton => {
      if (numberButton.innerText === key){
        numberButton.click()
      }
    })
  }

  function operationButtons(key) {
    operationButton.forEach (operation => {
      if (operation.innerText === key) [
        operation.click()
      ]
    })
  }