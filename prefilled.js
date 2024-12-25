import {
  validState,
  validDescription,
  validCity,
  validPostalCode,
  validateAllFields,
} from "./validate.js";
import showTableData from "./showTable.js";

// Function for prefilled form data
function prefilledData(index) {
  const tableData = localStorage.getItem("citiesData");
  const data = JSON.parse(tableData);
  const personData = data[index];

  // Prefill static fields
  document.getElementById("state").value = personData.state;
  document.getElementById("description").value = personData.description;

  // Clear existing city and postal code fields
  const citiesContainer = document.getElementById("citiesContainer");
  citiesContainer.innerHTML = "";

  // Prefill dynamically added cities and postal codes
  personData.cityPostalPairs.forEach((pair, index) => {
    // Only allow the "X" button for groups that are not the first one
    if (validateAllFields()) {
      const citiesContainer = document.getElementById("citiesContainer");

      const newGroup = document.createElement("div");
      newGroup.classList.add("cityGroup", "mt-3");

      newGroup.innerHTML = `
      <input
        type="text"
        class="form-control userInput cities"
        placeholder="Enter city"
        value="${pair.city}"
      />
      <div class="text-danger mb-2"></div>
      <input
        type="text"
        class="form-control userInput emails"
        placeholder="Enter postal code"
        value="${pair.postalCode}"
      />
      <div class="text-danger mb-2"></div>
    `;

      // Only add the "X" button if it's not the first item
      if (index !== 0) {
        newGroup.innerHTML += `
        <button type="button" class="btn btn-danger removeBtn" style="margin-top: 5px;">X</button>
      `;
      }

      citiesContainer.appendChild(newGroup);

      // Get the newly created city and postal code input fields
      const newCityField = newGroup.querySelector(".cities");
      const newPostalField = newGroup.querySelector(".emails");
      const removeBtn = newGroup.querySelector(".removeBtn");

      // Attach blur event listeners for city and postal code validation
      newCityField.addEventListener("blur", () => {
        console.log("City blur triggered!");
        validCity(newCityField);
      });
      newPostalField.addEventListener("blur", () => {
        console.log("Postal Code blur triggered!");
        validPostalCode(newPostalField);
      });

      // Add event listener to remove the group when the "X" button is clicked, but only if it exists
      if (removeBtn) {
        removeBtn.addEventListener("click", () => {
          newGroup.remove();
        });
      }
    }
  });

  // Show modal for editing
  const modalElement = document.getElementById("addItemModal");
  const modal = new bootstrap.Modal(modalElement);
  modal.show();

  // Handle saving the form changes
  const saveFormChanges = document.getElementById("saveFormChanges");
  saveFormChanges.onclick = function (event) {
    event.preventDefault();

    // Collect updated data
    const updatedCityPostalPairs = Array.from(
      document.querySelectorAll(".cities")
    ).map((cityField, index) => ({
      city: cityField.value.trim(),
      postalCode: document.querySelectorAll(".emails")[index]?.value.trim(),
    }));

    const updatedData = {
      id: personData.id,
      state: document.getElementById("state").value,
      description: document.getElementById("description").value.trim(),
      cityPostalPairs: updatedCityPostalPairs,
    };

    // Validate static fields
    if (!validState() || !validDescription()) {
      return;
    }

    // Validate dynamic fields
    let areCitiesValid = true;
    let arePostalCodesValid = true;

    document.querySelectorAll(".cities").forEach((cityField) => {
      if (!validCity(cityField)) areCitiesValid = false;
    });

    document.querySelectorAll(".emails").forEach((postalField) => {
      if (!validPostalCode(postalField)) arePostalCodesValid = false;
    });

    if (!areCitiesValid || !arePostalCodesValid) {
      return; // Stop execution if validation fails
    }

    // Update the localStorage
    data[index] = updatedData;
    localStorage.setItem("citiesData", JSON.stringify(data));
    modal.hide();
    showTableData(data);
  };
}

export default prefilledData;
