let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");
const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");
const productTitle = document.getElementById("product-title");
const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-title-error");
const productCostError = document.getElementById("product-cost-error");
const amount = document.getElementById("amount");
const expenditureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance-amount");
const list = document.getElementById("list");
let tempAmount = 0;

// *****установка части бюджета

// кнопка  addEventListener - обработчик события - "click", - клик левой кнопкой мыши () => {} - стрел функция 
totalAmountButton.addEventListener("click", () => {
  // 0         ваш бюджет  -  value указывает значение атрибута
  tempAmount = totalAmount.value;
  // *****пустой или отрицательный ввод

  //  if если  - (условие равен или)
  if (tempAmount === "" || tempAmount < 0) {
    // p зннач не может пустым - classList - объект с методами для добавления/удаления одного класса - remove позволяет удалить элемент - id р тега
    errorMessage.classList.remove("hide");
  } else {
    // .add - добавляет новый элемент
    errorMessage.classList.add("hide");
    // *****установка бюджета
          // innerHTML - позволяет получить HTML-содержимое элемента в виде строки
    amount.innerHTML = tempAmount;
    // *****установка баланса
                // innerText - свойство, позволяющее задавать или получать текстовое содержимое элемента и его потомков
    balanceValue.innerText = tempAmount - expenditureValue.innerText;
    // *****очистить поле ввода
    totalAmount.value = "";
  }
});

// *****функция редактирования, удаления, добавления кнопок
const disableButtons = (bool) => {
  // getElementsByClassName - Возвращает массивоподобный объект всех дочерних элементов соответствующих всем из указанных имён классов
  let editButtons = document.getElementsByClassName("edit");
  // Array.from - позволяет вам создавать массивы из: массивоподобных объектов - array.forEach - метод для перебора массива
  Array.from(editButtons).forEach((element) => {
    // disabled - атрибут можно установить, чтобы удержать пользователя от использования элемента до тех пор, пока не будет выполнено какое-либо другое условие (например, выбор флажка и т. д.)
    element.disabled = bool;
  });
};

// *****функция изменить элементы ввода списка
const modifyElement = (element, edit = false) => {
  let parentDiv = element.parentElement;
  let currentBalance = balanceValue.innerText;
  let currentExpense = expenditureValue.innerText;
  // querySelector - возвращает первый элемент ( Element ) документа, который соответствует указанному селектору или группе селекторов. Если совпадений не найдено, возвращает значение null
  let parentAmount = parentDiv.querySelector(".amount").innerText;
  if (edit) {
    let parentText = parentDiv.querySelector(".product").innerText;
    productTitle.value = parentText;
    userAmount.value = parentAmount;
    disableButtons(true);
  }
  balanceValue.innerText = parseInt(currentBalance) + parseInt(parentAmount);
  expenditureValue.innerText =
    parseInt(currentExpense) - parseInt(parentAmount);
  parentDiv.remove();
};

//  *****функция создать список
const listCreator = (expenseName, expenseValue) => {
  // createElement - позволяет создать и вернуть новый элемент (пустой узел Element) с указанным именем тега.
  let sublistContent = document.createElement("div");
  sublistContent.classList.add("sublist-content", "flex-space");
  // appendChild - добавляет узел в конец списка дочерних элементов указанного родительского узла
  list.appendChild(sublistContent);
  sublistContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`;
  let editButton = document.createElement("button");
  editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
  editButton.style.fontSize = "1.2em";
  editButton.addEventListener("click", () => {
    modifyElement(editButton, true);
  });
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
  deleteButton.style.fontSize = "1.2em";
  deleteButton.addEventListener("click", () => {
    modifyElement(deleteButton);
  });
  sublistContent.appendChild(editButton);
  sublistContent.appendChild(deleteButton);
  document.getElementById("list").appendChild(sublistContent);
};

// *****функция список расходов
checkAmountButton.addEventListener("click", () => {
  // пустой чек
  if (!userAmount.value || !productTitle.value) {
    productTitleError.classList.remove("hide");
    // return завершает выполнение текущей функции и возвращает её значение.
    return false;
  }
  // кнопка включения
  disableButtons(false);
  // расход
  let expenditure = parseInt(userAmount.value);
  // общий расход + новый
  let sum = parseInt(expenditureValue.innerText) + expenditure;
  expenditureValue.innerText = sum;
  // общий баланс и общий расход
  const totalBalance = tempAmount - sum;
  balanceValue.innerText = totalBalance;
  // создать список
  listCreator(productTitle.value, userAmount.value);
  // пустой ввод
  productTitle.value = "";
  userAmount.value = "";
});
