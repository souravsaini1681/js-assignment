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

  // validate cities
function validCities() {
    const errorCities = document.getElementById("errorCities");
    const citie = document.getElementById("citie");
  
    const citiesLength = citie.value.length;
  
    if (citiesLength >= 3 && citiesLength <= 25) {
        errorCities.innerHTML = "";
        citie.classList.add("is-valid");
        citie.classList.remove("is-invalid");
    } else {
        errorCities.innerHTML = "first name minimum 3 and maximum 25";
        citie.classList.add("is-invalid");
        citie.classList.remove("is-valid");
      return false;
    }
    return true;
  }

  //validate postel code 
function ValidPostelCode() {
    const postelCode = document.getElementById("postelCode");
    const errorPostelCode = document.getElementById("errorPostelCode");
    const isValid = /^[1-9][0-9]{5}$/.test(
        postelCode.value.trim()
    );
  
    if (!postelCode.value.trim() || !isValid) {
        errorPostelCode.innerHTML =
        "Please enter a correct postel code eg- 102345.";
        postelCode.classList.add("is-invalid");
        postelCode.classList.remove("is-valid");
      return false;
    } else {
        errorPostelCode.innerHTML = "";
      postelCode.classList.add("is-valid");
      postelCode.classList.remove("is-invalid");
    }
    return true;
  }

  export {validState,validDescription,validCities,ValidPostelCode}