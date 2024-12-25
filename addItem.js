import { validState, validDescription, validateAllFields } from "./validate.js";
import showTableData from "./showTable.js";

function addItem() {
  const { description } = registrationForm.elements; 
  const state = document.getElementById("state"); 
  const cities = document.querySelectorAll(".cities"); 
  const postalCodes = document.querySelectorAll(".emails"); 
  
  let id=0;
  if (!validateAllFields() && !validState() && !validDescription()) {
    return false;
 
  }
  let storageData = localStorage.getItem("citiesData");
  if (!storageData || storageData === "[]") {
    storageData = [];
    id = 1;
  } else {
    storageData = JSON.parse(storageData);
    const totalEntries = storageData.length;
    id = storageData[totalEntries - 1].id + 1;
  }
 
  const cityPostalPairs = Array.from(cities).map((cityField, index) => ({
    city: cityField.value.trim(),
    postalCode: postalCodes[index]?.value.trim(),
  }));

  const data = {
    id: id,
    state: state.value,
    description: description.value,
    cityPostalPairs: cityPostalPairs,
  };
  storageData.push(data);
  localStorage.setItem("citiesData", JSON.stringify(storageData));

  registrationForm.reset();
  showTableData(storageData);
  return true;
}

export default addItem;
