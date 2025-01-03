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

  document.getElementById("formMode").value = "edit";

  document.getElementById("state").value = personData.state;
  document.getElementById("description").value = personData.description;

  const citiesContainer = document.getElementById("citiesContainer");
  citiesContainer.innerHTML = "";

  personData.cityPostalPairs.forEach((pair, index) => {
    const citiesContainer = document.getElementById("citiesContainer");
    const newGroup = document.createElement("div");
    newGroup.classList.add("cityGroup", "mt-3", "row", "gx-3"); // Adding row and gap utilities

    newGroup.innerHTML = `
    <div class="col-md-5 col-sm-12">
      <input
        type="text"
        class="form-control userInput cities"
        placeholder="Enter city"
        value="${pair.city}"
      />
      <div class="text-danger mb-2"></div>
    </div>
    <div class="col-md-5 col-sm-12">
      <input
        type="text"
        class="form-control userInput emails"
        placeholder="Enter postal code"
        value="${pair.postalCode}"
      />
      <div class="text-danger mb-2"></div>
    </div>
    <div class="col-md-2 col-sm-12 text-end">
      ${
        index !== 0
          ? `<button type="button" class="btn btn-danger removeBtn w-100" style="margin-top: 5px;">X</button>`
          : ""
      }
    </div>
  `;

    citiesContainer.appendChild(newGroup);

    const newCityField = newGroup.querySelector(".cities");
    const newPostalField = newGroup.querySelector(".emails");
    newPostalField.setAttribute("data-initial-value", pair.postalCode.trim());
    newCityField.setAttribute("data-initial-value", pair.city.trim());

    const removeBtn = newGroup.querySelector(".removeBtn");

    newCityField.addEventListener("blur", () => {
      validCity(newCityField);
    });
    newPostalField.addEventListener("blur", () => {
      validPostalCode(newPostalField);
    });

    if (removeBtn) {
      removeBtn.addEventListener("click", () => {
        newGroup.remove();
      });
    }
  });

  // Show modal for editing
  const modalElement = document.getElementById("addItemModal");
  const modal = new bootstrap.Modal(modalElement);
  modal.show();

  const registrationForm = document.getElementById("registrationForm");
  registrationForm.addEventListener(
    "submit",
    function (event) {
      event.preventDefault();
      const formMode = document.getElementById("formMode").value;

      if (formMode === "edit") {
        // adding cities and postal code data.
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
          return;
        }

        // Update the localStorage
        data[index] = updatedData;
        localStorage.setItem("citiesData", JSON.stringify(data));

        // Close the modal
        modal.hide();

        // reset the form
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
        // Clear validation errors and classes
        const state = document.getElementById("state");
        state.classList.remove("is-valid", "is-invalid");

        document.querySelectorAll(".form-control").forEach((input) => {
          input.classList.remove("is-valid", "is-invalid");
        });

        document.querySelectorAll(".text-danger").forEach((errorElement) => {
          errorElement.innerHTML = "";
        });

        showTableData(data);
      } else {
        console.log("Form not in edit mode");
      }
    },
    { once: true }
  );
}

export default prefilledData;
