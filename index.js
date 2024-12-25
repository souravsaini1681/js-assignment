import {
  validState,
  validDescription,
  validCity,
  validPostalCode,
} from "./validate.js";
import addItem from "./addItem.js";
import showTableData from "./showTable.js";
import prefilledData from "./prefilled.js";
import deleteItem from "./deleteItem.js";

const states = [
  "Punjab",
  "Haryana",
  "Himachal",
  "Maharashtra",
  "Kerala",
  "Uttar Pradesh",
  "Gujarat",
  "Rajasthan",
  "Bihar",
  "West Bengal",
];

// Populate the dropdown with states
const stateDropdown = document.getElementById("state");
states.forEach((state) => {
  const option = document.createElement("option");
  option.value = state;
  option.textContent = state;
  stateDropdown.appendChild(option);
});

// Blur events for validation
const state = document.getElementById("state");
state.addEventListener("blur", validState);

const description = document.getElementById("description");
description.addEventListener("blur", validDescription);

// Add event listener for dynamically adding cities and postal codes
// Add event listener for dynamically adding cities and postal codes
document.getElementById("addCities").addEventListener("click", () => {
  if (validateAllFields()) {
    const citiesContainer = document.getElementById("citiesContainer");

    const newGroup = document.createElement("div");
    newGroup.classList.add("cityGroup", "mt-3");

    newGroup.innerHTML = `
      <input
        type="text"
        class="form-control userInput cities"
        placeholder="Enter city"
      />
      <div class="text-danger mb-2"></div>
      <input
        type="text"
        class="form-control userInput emails"
        placeholder="Enter postal code"
      />
      <div class="text-danger mb-2"></div>
      <button type="button" class="btn btn-danger removeBtn" style="margin-top: 5px;">X</button>
    `;

    citiesContainer.appendChild(newGroup);

    // Get the newly created city and postal code input fields
    const newCityField = newGroup.querySelector(".cities");
    const newPostalField = newGroup.querySelector(".emails");
    const removeBtn = newGroup.querySelector(".removeBtn");

    // Debugging: Log the newly created fields
    console.log("New City Field: ", newCityField);
    console.log("New Postal Code Field: ", newPostalField);

    // Attach blur event listeners for city and postal code validation
    newCityField.addEventListener("blur", () => {
      console.log("City blur triggered!");
      validCity(newCityField);
    });
    newPostalField.addEventListener("blur", () => {
      console.log("Postal Code blur triggered!");
      validPostalCode(newPostalField);
    });

    // Add event listener to remove the group when the "X" button is clicked
    removeBtn.addEventListener("click", () => {
      newGroup.remove();
    });
  }
});

// Add modal open and form submission
const budgetModal = document.getElementById("addModal");
budgetModal.addEventListener("click", function () {
  const modalElement = document.getElementById("addItemModal");
  const modal = new bootstrap.Modal(modalElement);
  modal.show();
  const registrationForm = document.getElementById("registrationForm");
  document.getElementById("closeModal").addEventListener("click", () => {
    modal.hide();
  });
  registrationForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (addItem()) {
      modal.hide();
    }
  });
});

// Show table data on page load
let storageData = localStorage.getItem("citiesData");
storageData = JSON.parse(storageData);
showTableData(storageData);

// Edit and delete functionality
document
  .getElementById("tableContent")
  .addEventListener("click", function (event) {
    if (event.target.closest(".edit")) {
      const index = event.target.closest(".edit").getAttribute("data-index");
      prefilledData(index);
    } else if (event.target.closest(".delete")) {
      const index = event.target.closest(".delete").getAttribute("data-index");
      deleteItem(index);
    }
  });

// Validation for all existing fields
function validateAllFields() {
  const stateValid = validState();
  const descriptionValid = validDescription();

  let areCitiesValid = true;
  let arePostalCodesValid = true;

  document.querySelectorAll(".cities").forEach((cityField) => {
    if (!validCity(cityField)) areCitiesValid = false;
  });

  document.querySelectorAll(".emails").forEach((postalField) => {
    if (!validPostalCode(postalField)) arePostalCodesValid = false;
  });

  return (
    stateValid && descriptionValid && areCitiesValid && arePostalCodesValid
  );
}

// Add onblur validation for initial postal code fields
const initialPostalCodeField = document.getElementById("postelCode");
initialPostalCodeField.addEventListener("blur", () =>
  validPostalCode(initialPostalCodeField)
);
const initialCityField = document.getElementById("city");
initialCityField.addEventListener("blur", () => validCity(initialCityField));
