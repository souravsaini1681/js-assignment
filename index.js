// localStorage.clear()
import {validState,validDescription,validCity,validPostalCode} from "./validate.js";
import addItem from "./addItem.js";
import showTableData from "./showTable.js";
import prefilledData from "./prefilled.js";
import deleteItem from "./deleteItem.js";

const states = [ "Punjab","Haryana","Himachal","Maharashtra","Kerala","Uttar Pradesh","Gujarat","Rajasthan","Bihar", "West Bengal",];

// show state
const stateDropdown = document.getElementById("state");
states.forEach((state) => {
  const option = document.createElement("option");
  option.value = state;
  option.textContent = state;
  stateDropdown.appendChild(option);
});

// Blur events 
const state = document.getElementById("state");
state.addEventListener("blur", validState);

const description = document.getElementById("description");
description.addEventListener("blur", validDescription);

// dyamic inputs
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

    const newCityField = newGroup.querySelector(".cities");
    const newPostalField = newGroup.querySelector(".emails");
    const removeBtn = newGroup.querySelector(".removeBtn");

    newCityField.addEventListener("blur", () => {
      validCity(newCityField);
    });
    newPostalField.addEventListener("blur", () => {
      validPostalCode(newPostalField);
    });

    removeBtn.addEventListener("click", () => {
      newGroup.remove();
    });
  }
});


const modalElement = document.getElementById("addItemModal");
const modal = new bootstrap.Modal(modalElement);

// Add modal open and form submission
const budgetModal = document.getElementById("addModal");
budgetModal.addEventListener("click", function () {
  document.getElementById("formMode").value = "add"; 
  modal.show();
});

const registrationForm = document.getElementById("registrationForm");
registrationForm.addEventListener("submit", function (event) {
  const formMode = document.getElementById("formMode").value;
  event.preventDefault();
  if (formMode === "add") {
    if (addItem()) {
      modal.hide();
    }
  }
});

document.getElementById("closeModal").addEventListener("click", () => {
  modal.hide();
  registrationForm.reset();
  const elements = document.querySelectorAll(".cityGroup");
  let i = 0;
  elements.forEach((element) => {
    if (i) {
      element.remove();
    } else {
      element.innerHTML = `<input
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
      <div class="text-danger mb-2"></div>`;
      const newCityField = element.querySelector(".cities");
      const newPostalField = element.querySelector(".emails");
      
      newCityField.addEventListener("blur", () => {
        validCity(newCityField);
      });
      newPostalField.addEventListener("blur", () => {
        validPostalCode(newPostalField);
      });
    }
    i++;
  });
});

// Show table data 
let storageData = localStorage.getItem("citiesData");
storageData = JSON.parse(storageData);
showTableData(storageData);

// Edit and delete functionality
document.getElementById("tableContent").addEventListener("click", function (event) {
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

const initialPostalCodeField = document.getElementById("postelCode");
initialPostalCodeField.addEventListener("blur", () =>
  validPostalCode(initialPostalCodeField)
);
const initialCityField = document.getElementById("city");
initialCityField.addEventListener("blur", () => validCity(initialCityField));


//search table functionality
document.getElementById("searchBy").addEventListener("change", function () {
  document.getElementById("searchInput").value = "";
  const searchTable = document.getElementById("searchTable");
  if (searchTable) {
    searchTable.remove(); 
  }
});

document.getElementById("searchInput").addEventListener("input", function () {
  const searchBy = document.getElementById("searchBy").value; 
  const searchTerm = this.value.toLowerCase(); 
  const tableData = localStorage.getItem("citiesData");
  const data = JSON.parse(tableData);

  if (searchTerm === "") {
    const searchTable = document.getElementById("searchTable");
    if (searchTable) {
      searchTable.remove(); 
    }
    return; 
  }

  const filteredData = data.filter((item) => {
    const matchingCityPostalPairs = item.cityPostalPairs.filter((cityObj) => {
      if (searchBy === "city") {
        return cityObj.city.toLowerCase().includes(searchTerm); 
      } else if (searchBy === "postalcode") {
        return cityObj.postalCode.includes(searchTerm); 
      }
      return false;
    });
    return matchingCityPostalPairs.length > 0;
  });
  showSearchTableData(filteredData, searchTerm);
});


function showSearchTableData(tableData, searchTerm) {
  let searchTable = document.getElementById("searchTable");
  if (!searchTable) {
    searchTable = document.createElement("table");
    searchTable.id = "searchTable"; 
    searchTable.classList.add("table", "table-striped", "mt-4"); 
    searchTable.innerHTML = `
      <thead>
        <tr>
          <th>State</th>
          <th>Description</th>
          <th>City</th>
          <th>Postal Code</th>
        </tr>
      </thead>
      <tbody id="searchTableContent"></tbody>
    `;
    const searchContainer = document.querySelector(".my-4"); 
    searchContainer.appendChild(searchTable); 
  }

  const searchTableContent = document.getElementById("searchTableContent");
  searchTableContent.innerHTML = ""; 

  if (tableData && tableData.length > 0) {
    tableData.forEach((item) => {
      item.cityPostalPairs.forEach((cityObj) => {
        if (cityObj.city.toLowerCase().includes(searchTerm) ||cityObj.postalCode.includes(searchTerm)) {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${item.state}</td>
            <td>${item.description}</td>
            <td>${cityObj.city}</td>
            <td>${cityObj.postalCode}</td>
          `;
          searchTableContent.appendChild(row);
        }
      });
    });
  } else {
    searchTableContent.innerHTML = `<tr><td colspan="4">No results found</td></tr>`;
  }
}
