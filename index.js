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
const modalElement = document.getElementById("addItemModal");
const modal = new bootstrap.Modal(modalElement);

// Add modal open and form submission
const budgetModal = document.getElementById("addModal");
budgetModal.addEventListener("click", function () {
  document.getElementById("formMode").value = "add"; // Set mode to "add"
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
      // Attach blur event listeners for city and postal code validation
      newCityField.addEventListener("blur", () => {
        console.log("City blur triggered!");
        validCity(newCityField);
      });
      newPostalField.addEventListener("blur", () => {
        console.log("Postal Code blur triggered!");
        validPostalCode(newPostalField);
      });
    }
    i++;
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
    console.log("add table clicked");
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

// Search functionality

// Clear input field when search criterion is changed
document.getElementById("searchBy").addEventListener("change", function () {
  // Clear the search input field when the search type changes
  document.getElementById("searchInput").value = "";
  // Optionally, you can trigger the input event to refresh the results if needed
  const searchTable = document.getElementById("searchTable");
  if (searchTable) {
    searchTable.remove(); // Remove the search results table when search criteria changes
  }
});

document.getElementById("searchInput").addEventListener("input", function () {
  const searchBy = document.getElementById("searchBy").value; // Get selected search type (city or postalcode)
  const searchTerm = this.value.toLowerCase(); // Get the value entered in the textbox
  const tableData = localStorage.getItem("citiesData");
  const data = JSON.parse(tableData);

  if (searchTerm === "") {
    // If search input is empty, remove the search results table if it exists
    const searchTable = document.getElementById("searchTable");
    if (searchTable) {
      searchTable.remove(); // Remove the table
    }
    return; // Exit if the input is empty
  }

  // Filter data based on city or postal code
  const filteredData = data.filter((item) => {
    // Filter only the cityPostalPairs that match the search term
    const matchingCityPostalPairs = item.cityPostalPairs.filter((cityObj) => {
      if (searchBy === "city") {
        return cityObj.city.toLowerCase().includes(searchTerm); // Match by city name
      } else if (searchBy === "postalcode") {
        return cityObj.postalCode.includes(searchTerm); // Match by postal code
      }
      return false;
    });

    // If there are matching cityPostalPairs, include the state and description with them
    return matchingCityPostalPairs.length > 0;
  });

  // Call showSearchTableData to display filtered results
  showSearchTableData(filteredData, searchTerm);
});

// Function to create a new table for search results or update it if already exists
function showSearchTableData(tableData, searchTerm) {
  let searchTable = document.getElementById("searchTable");

  // If the table doesn't exist, create a new one
  if (!searchTable) {
    // Create a new table element
    searchTable = document.createElement("table");
    searchTable.id = "searchTable"; // Add id for easy reference
    searchTable.classList.add("table", "table-striped", "mt-4"); // Add Bootstrap table styles
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

    // Get the parent container of the search input field
    const searchContainer = document.querySelector(".my-4"); // This is the div containing the search input
    searchContainer.appendChild(searchTable); // Append the search table below the search container
  }

  const searchTableContent = document.getElementById("searchTableContent");
  searchTableContent.innerHTML = ""; // Clear existing rows in the search results table

  if (tableData && tableData.length > 0) {
    tableData.forEach((item) => {
      // Loop through the filtered cityPostalPairs
      item.cityPostalPairs.forEach((cityObj) => {
        // Only display the matching cityPostalPair
        if (
          cityObj.city.toLowerCase().includes(searchTerm) ||
          cityObj.postalCode.includes(searchTerm)
        ) {
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
    // Display message if no results found
    searchTableContent.innerHTML = `<tr><td colspan="4">No results found</td></tr>`;
  }
}
