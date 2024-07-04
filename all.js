let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");
const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");
const productTitle = document.getElementById("product-title");
const expenditureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance-amount");
const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-title-error");

let tempAmount = 0;
let totalExpense = 0;

// Set Budget Functions
totalAmountButton.addEventListener("click", () => {
  tempAmount = parseInt(totalAmount.value);

  // Bad Input
  if (isNaN(tempAmount) || tempAmount < 0) {
    errorMessage.classList.remove("hide");
  } else {
    errorMessage.classList.add("hide");

    // Set Budget
    document.getElementById("amount").innerText = tempAmount.toLocaleString();
    updateBalance();

    // Clear Input
    totalAmount.value = "";
  }
});

// Disable edit and delete button function
const disableButtons = (bool) => {
  let editButtons = document.getElementsByClassName("edit");
  Array.from(editButtons).forEach((element) => {
    element.disabled = bool;
  });
};

// Modify list elements function
const modifyElement = (element, edit = false) => {
  let parentDiv = element.parentElement;
  let parentAmount = parseInt(parentDiv.querySelector(".amount").innerText);

  if (edit) {
    let parentText = parentDiv.querySelector(".product").innerText;
    productTitle.value = parentText;
    userAmount.value = parentAmount;
    disableButtons(true);
  }

  totalExpense -= parentAmount;
  parentDiv.remove();
  updateBalance();
};

// Update balance function
const updateBalance = () => {
  const balance = tempAmount - totalExpense;
  expenditureValue.innerText = totalExpense.toLocaleString();
  balanceValue.innerText = balance.toLocaleString(); // 將數字加上千分位符號
};

// Create list function
const listCreator = (expenseName, expenseValue) => {
  let subListContent = document.createElement("div");
  subListContent.classList.add("sublist-content", "flex-space");

  let product = document.createElement("p");
  product.classList.add("product");
  product.innerText = expenseName;

  let amount = document.createElement("p");
  amount.classList.add("amount");
  amount.innerText = expenseValue.toLocaleString(); // 將數字加上千分位符號

  subListContent.appendChild(product);
  subListContent.appendChild(amount);

  let editButton = document.createElement("button");
  editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
  editButton.style.fontSize = "1.2rem";
  editButton.addEventListener("click", () => {
    modifyElement(editButton, true);
  });

  let deleteButton = document.createElement("button");
  deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
  deleteButton.style.fontSize = "1.2rem";
  deleteButton.addEventListener("click", () => {
    modifyElement(deleteButton);
  });

  subListContent.appendChild(editButton);
  subListContent.appendChild(deleteButton);
  document.getElementById("list").appendChild(subListContent);

  totalExpense += parseInt(expenseValue);
  updateBalance();
};

// Add expenses function
checkAmountButton.addEventListener("click", () => {
  // Check if empty
  if (!userAmount.value || !productTitle.value) {
    productTitleError.classList.remove("hide");
    return false;
  }

  // Enable buttons
  disableButtons(false);

  // Expense
  let expenditure = parseInt(userAmount.value);

  // Create list
  listCreator(productTitle.value, expenditure);

  // Clear input
  productTitle.value = "";
  userAmount.value = "";
});
