let logCount = 1;

// ดึง element 
const historyBox = document.querySelector("textarea");
const currentAcc = document.getElementById("currentacc");
const currentCash = document.getElementById("currentcash");
const amountInput = document.getElementById("ha");
const operationSelect = document.getElementById("operationSelect");
const inBalance = document.getElementById("inbalance");
const outBalance = document.getElementById("outbalance");
const currencySelect = document.getElementById("currencySelect");

historyBox.value = `${logCount}, Current account balance: ${parseFloat(currentAcc.value).toFixed(2)}, Current cash balance: ${parseFloat(currentCash.value).toFixed(2)}`;

// Proceed
function proceedOperation() {
  const mode = operationSelect.value;
  const amount = parseFloat(amountInput.value);
  let acc = parseFloat(currentAcc.value);
  let cash = parseFloat(currentCash.value);

  if (isNaN(amount) || amount <= 0) {
    alert("กรอกจำนวนเงินให้ถูกต้อง");
    return;
  }

  if (mode === "Deposit") {
    if (amount > cash) {
      alert("เงินสดไม่พอฝากจ้า");
      return;
    }
    acc += amount;
    cash -= amount;
  } else if (mode === "Withdraw") {
    if (amount > acc) {
      alert("เงินในบัญชีไม่พอถอนน้า");
      return;
    }
    acc -= amount;
    cash += amount;
  }

  currentAcc.value = acc.toFixed(2);
  currentCash.value = cash.toFixed(2);

  logCount++;
  historyBox.value += `\n${logCount}, ${mode} ${amount.toFixed(2)}. Current account balance: ${acc.toFixed(2)}, Current cash balance: ${cash.toFixed(2)}`;
}

// Change
function updateBalance() {
  const acc = parseFloat(currentAcc.value);
  const cash = parseFloat(currentCash.value);

  logCount++;
  historyBox.value += `\n${logCount}, Balance updated manually. Current account balance: ${acc.toFixed(2)}, Current cash balance: ${cash.toFixed(2)}`;
}

// Convert
function convertCurrency() {
  const input = parseFloat(inBalance.value);
  let output = 0;

  if (isNaN(input) || input <= 0) {
    alert("กรอกจำนวนเงินให้ถูกต้อง");
    return;
  }

  if (currencySelect.value === "USD") {
    output = input * 0.03; // THB -> USD
  } else {
    output = input * 33;   // USD -> THB
  }

  outBalance.value = output.toFixed(2);

  logCount++;
  historyBox.value += `\n${logCount}, Converted ${input.toFixed(2)} to ${output.toFixed(2)} ${currencySelect.value}`;
}
