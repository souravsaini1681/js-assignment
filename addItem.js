import {
  validState,
  validDescription,
  validateAllFields,
  validCity,
  validPostalCode,
} from "./validate.js";
import showTableData from "./showTable.js";

function addItem() {
  const { description } = registrationForm.elements; // Access description field
  const state = document.getElementById("state"); // Access state field
  const cities = document.querySelectorAll(".cities"); // Get all city fields
  const postalCodes = document.querySelectorAll(".emails"); // Get all postal code fields

  let id = 0;

  // Validate state and description
  if (!validateAllFields() && !validState() && !validDescription()) {
    console.log("this ran");
    return false;
  }

  // Prepare to fetch or initialize localStorage data
  let storageData = localStorage.getItem("citiesData");
  if (!storageData || storageData === "[]") {
    storageData = [];
    id = 1;
  } else {
    storageData = JSON.parse(storageData);
    const totalEntries = storageData.length;
    id = storageData[totalEntries - 1].id + 1;
  }

  // Collect all city and postal code values
  const cityPostalPairs = Array.from(cities).map((cityField, index) => ({
    city: cityField.value.trim(),
    postalCode: postalCodes[index]?.value.trim(),
  }));

  // Construct data object
  const data = {
    id: id,
    state: state.value,
    description: description.value.trim(),
    cityPostalPairs: cityPostalPairs,
  };

  // Save to localStorage
  storageData.push(data);
  localStorage.setItem("citiesData", JSON.stringify(storageData));

  // Reset form
  registrationForm.reset();
  // Show updated data in the table
  showTableData(storageData);
  return true;
}

export default addItem;
