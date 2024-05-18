document.addEventListener("DOMContentLoaded", function () {
  // Применение масок
  const gosNumberInput = document.getElementById("gosNumber");
  const passportInput = document.getElementById("passport");

  if (gosNumberInput) {
    gosNumberInput.addEventListener("input", function () {
      let value = this.value.replace(/\D/g, "");
      if (value.length > 3) {
        value = value.slice(0, 1) + value.slice(1, 4);
      }
      this.value = value.toUpperCase();
    });
  }

  if (passportInput) {
    passportInput.addEventListener("input", function () {
      let value = this.value.replace(/\D/g, "");
      if (value.length > 7) {
        value = value.slice(0, 4) + " " + value.slice(4);
      }
      this.value = value;
    });
  }

  // Проверка и загрузка данных из localStorage
  const form = document.getElementById("myForm");
  const inputs = form.querySelectorAll("input");

  inputs.forEach((input) => {
    const storedValue = localStorage.getItem(input.name);
    if (storedValue) {
      input.value = storedValue;
    }
  });

  // Сохранение данных в localStorage при изменении
  form.addEventListener("input", (event) => {
    localStorage.setItem(event.target.name, event.target.value);
  });

  // Валидация формы при отправке
  form.addEventListener("submit", function (event) {
    let isValid = true;

    inputs.forEach((input) => {
      if (!input.checkValidity()) {
        isValid = false;
        input.classList.add("error");
      } else {
        input.classList.remove("error");
      }
    });

    if (!isValid) {
      event.preventDefault();
      alert("Пожалуйста, заполните все поля корректно.");
    }
  });

  // Очистка формы и localStorage при нажатии на кнопку "Отменить"
  const cancelButton = document.getElementById("cancelButton");
  if (cancelButton) {
    cancelButton.addEventListener("click", function () {
      inputs.forEach((input) => {
        input.value = "";
        localStorage.removeItem(input.name);
        input.classList.remove("error");
      });
    });
  }
});
