const { ipcRenderer } = require("electron");
const ipc=ipcRenderer; // just for shortened name

document.querySelector("#minimize").addEventListener("click", () => {
  ipc.send("manualMinimize");
});
document.querySelector("#maximize").addEventListener("click", () => {
  ipc.send("manualMaximize");
});
document.querySelector("#close").addEventListener("click", () => {
  ipc.send("manualClose");
});

// Находим элемент валюты
const currencyAmount = document.getElementById('currency-amount');
// Находим изображение хомяка
const homakImg = document.querySelector('.homak');

let currentCurrency = 0;

// Добавляем обработчик события клика на изображение хомяка
homakImg.addEventListener('click', function() {
  // Увеличиваем количество валюты при каждом клике
  currentCurrency += 1;
  // Обновляем отображение количества валюты
  currencyAmount.textContent = currentCurrency;
});