import { validState,validDescription,validCities,ValidPostelCode } from "./validate.js";
import showTableData from "./showTable.js";

// Function for prefilled form data
function prefilledData(index, isEditable) {
  const tableData = localStorage.getItem("citiesData");
  const data = JSON.parse(tableData);
  const persontData = data[index];

  // Prefill form fields with existing data
  document.getElementById("state").value = persontData.state;
  document.getElementById("description").value = persontData.description;
  document.getElementById("citie").value = persontData.citie;
  document.getElementById("postelCode").value = persontData.postelCode;

  // Show modal for editing
  const modalElement = document.getElementById("addItemModal");
  const modal = new bootstrap.Modal(modalElement);
  modal.show();

  // Handle saving the form changes
  const saveFormChanges = document.getElementById("saveFormChanges");
  saveFormChanges.addEventListener("click", function (event) {
    event.preventDefault();

    const updatedData = {
      id: persontData.id,
        state : document.getElementById("state").value,
        description : document.getElementById("description").value,
        citie : document.getElementById("citie").value,
        postelCode : document.getElementById("postelCode").value,
    };

    if (
        !validState() ||
        !validDescription() ||
        !validCities() ||
        !ValidPostelCode()
      ) {
        return;
    } else {
      // Update the localStorage
      data[index] = updatedData;
      localStorage.setItem("citiesData", JSON.stringify(data));
      modal.hide();
      showTableData(data);
    }
  });
}


export default prefilledData;
