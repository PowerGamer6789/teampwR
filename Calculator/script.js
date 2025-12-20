const display = document.getElementById("display");

function appendToDisplay(input) {
  display.value += input;
}

function clearDisplay() {
  display.value = "";
}

function deleteOne() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    // block sus characters
    if (/[^0-9+\-*/.]/.test(display.value)) {
      display.value = "Nope";
      return;
    }
    display.value = Function("return " + display.value)();
  } catch {
    display.value = "Error";
  }
}

// Keyboard support (real gamer mode)
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if ("0123456789.-/".includes(key)) {
    appendToDisplay(key);
  }

  // T = +
  if (key === "t" || key === "T") {
    appendToDisplay("+");
  }

  // X = *
  if (key === "x" || key === "X") {
    appendToDisplay("*");
  }

  // C clears all
  if (key === "c" || key === "C") {
    clearDisplay();
  }

  // Backspace deletes one char
  if (key === "Backspace") {
    deleteOne();
  }

  // Enter = equals
  if (key === "Enter") {
    calculate();
  }
});
