
import { validState,validDescription,validCities,ValidPostelCode } from "./validate.js";
import addItem from "./addItem.js";
import showTableData from "./showTable.js";
import prefilledData from "./prefilled.js";
import deleteItem from "./deleteItem.js";


const states = ["Punjab", "Haryana", "Himachal", "Maharashtra", "Kerala", "Uttar Pradesh", "Gujarat", "Rajasthan", "Bihar", "West Bengal"];
  
// show the states in drop down
const stateDropdown = document.getElementById("state");
states.forEach(state => {
    const option = document.createElement("option");
    option.value = state;
    option.textContent = state;
    stateDropdown.appendChild(option);
});

//blur events
const state = document.getElementById("state");
state.addEventListener("blur",validState);

const description = document.getElementById("description");
description.addEventListener("blur",validDescription);

const citie = document.getElementById("citie");
citie.addEventListener("blur",validCities);

const postelCode = document.getElementById("postelCode");
postelCode.addEventListener("blur",ValidPostelCode);

// add modal open
  const budgetModal = document.getElementById("addModal");
  budgetModal.addEventListener("click", function () {
    const modalElement = document.getElementById("addItemModal");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();

    const registrationForm = document.getElementById("registrationForm");
    registrationForm.addEventListener("submit", function (event) {
      event.preventDefault();
      addItem();
      modal.hide();
    });
  });

  //show table data
  let storageData = localStorage.getItem("citiesData");
  storageData = JSON.parse(storageData);
  showTableData(storageData);

  // edit and delete
  document
    .getElementById("tableContent")
    .addEventListener("click", function (event) {
      if (event.target.closest(".edit")) {
        const index = event.target.closest(".edit").getAttribute("data-index");
        prefilledData(index, true);
      } else if (event.target.closest(".delete")) {
        const index = event.target
          .closest(".delete")
          .getAttribute("data-index");
        deleteItem(index);
      }
    });