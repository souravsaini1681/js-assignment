// validate state
function validState() {
  const errorState = document.getElementById("errorState");
  const state = document.getElementById("state");

  if (state.value.trim()) {
    errorState.innerHTML = "";
    state.classList.add("is-valid");
    state.classList.remove("is-invalid");
  } else {
    errorState.innerHTML = "please select state";
    state.classList.add("is-invalid");
    state.classList.remove("is-valid");
    return false;
  }
  return true;
}

// validate description
function validDescription() {
  const errorDescription = document.getElementById("errorDescription");
  const description = document.getElementById("description");

  const descriptionLength = description.value.length;

  if (descriptionLength >= 4 && descriptionLength <= 20) {
    errorDescription.innerHTML = "";
    description.classList.add("is-valid");
    description.classList.remove("is-invalid");
  } else {
    errorDescription.innerHTML = "first name minimum 4 and maximum 20";
    description.classList.add("is-invalid");
    description.classList.remove("is-valid");
    return false;
  }
  return true;
}

function validCity(cityField) {
  const errorCities = cityField.nextElementSibling;
  const cityName = cityField.value.trim();
  const cityLength = cityName.length;

  const citiesInForm = Array.from(document.querySelectorAll(".cities"))
    .filter(
      (field) =>
        field !== cityField &&
        field.closest("form") === cityField.closest("form")
    )
    .map((field) => field.value.trim().toLowerCase());

  const savedData = JSON.parse(localStorage.getItem("citiesData")) || [];
  const allSavedCities = savedData.flatMap((entry) =>
    entry.cityPostalPairs.map((pair) => pair.city.trim().toLowerCase())
  );

  // Validation checks
  if (!cityName) {
    errorCities.innerHTML = "City name is required.";
    cityField.classList.add("is-invalid");
    cityField.classList.remove("is-valid");
    return false;
  } else if (cityLength < 3 || cityLength > 25) {
    errorCities.innerHTML = "City name must be between 3 and 25 characters.";
    cityField.classList.add("is-invalid");
    cityField.classList.remove("is-valid");
    return false;
  } else if (
    citiesInForm.includes(cityName.toLowerCase()) ||
    (allSavedCities.includes(cityName.toLowerCase()) &&
      !allSavedCities.includes(cityField.dataset.initialValue || ""))
  ) {
    errorCities.innerHTML = "City name must be unique globally.";
    cityField.classList.add("is-invalid");
    cityField.classList.remove("is-valid");
    return false;
  } else {
    errorCities.innerHTML = "";
    cityField.classList.add("is-valid");
    cityField.classList.remove("is-invalid");
    return true;
  }
}

// Validate postel code
function validPostalCode(postalField) {
  const errorPostalCode = postalField.nextElementSibling;
  const postalCode = postalField.value.trim();
  const isValid = /^[1-9][0-9]{5}$/.test(postalCode);

  const existingPostalCodes = Array.from(document.querySelectorAll(".emails"))
    .filter((field) => field !== postalField)
    .map((field) => field.value.trim());

  const savedData = JSON.parse(localStorage.getItem("citiesData")) || [];
  const allSavedPostalCodes = savedData.flatMap((entry) =>
    entry.cityPostalPairs.map((pair) => pair.postalCode.trim())
  );

  if (!postalCode) {
    errorPostalCode.innerHTML = "Postal code is required.";
    postalField.classList.add("is-invalid");
    postalField.classList.remove("is-valid");
    return false;
  } else if (!isValid) {
    errorPostalCode.innerHTML =
      "Please enter a valid postal code, e.g., 102345.";
    postalField.classList.add("is-invalid");
    postalField.classList.remove("is-valid");
    return false;
  } else if (
    existingPostalCodes.includes(postalCode) ||
    (allSavedPostalCodes.includes(postalCode) &&
      !allSavedPostalCodes.includes(postalField.dataset.initialValue || ""))
  ) {
    errorPostalCode.innerHTML = "Postal code must be unique across all states.";
    postalField.classList.add("is-invalid");
    postalField.classList.remove("is-valid");
    return false;
  } else {
    errorPostalCode.innerHTML = "";
    postalField.classList.add("is-valid");
    postalField.classList.remove("is-invalid");
    return true;
  }
}

function validateAllFields() {
  let isValid = true;

  const cityFields = document.querySelectorAll(".cities");
  const postalFields = document.querySelectorAll(".emails");

  cityFields.forEach((cityField) => {
    if (!validCity(cityField)) isValid = false;
  });

  postalFields.forEach((postalField) => {
    if (!validPostalCode(postalField)) isValid = false;
  });

  return isValid;
}

export {
  validState,
  validDescription,
  validCity,
  validPostalCode,
  validateAllFields,
};
