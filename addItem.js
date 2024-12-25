import { validState,validDescription,validCities,ValidPostelCode } from "./validate.js";
import showTableData from "./showTable.js";
  
  function addItem() {
    const {
        description,citie,postelCode
    } = registrationForm.elements;
  
    // const cities = document.getElementsByClassName("cities"); // Get all cities fields
    const state = document.getElementById("state");
    // console.log(description.value,cities.value,state.value);
    let id = 0;
  
    if (
      !validState() ||
      !validDescription() ||
      !validCities() ||
      !ValidPostelCode()
    ) {
      return;
    } else {
      // Get and set data to localStorage
      let storageData = localStorage.getItem("citiesData");
      if (!storageData) {
        storageData = [];
        id = 1;
      } else {
        if (storageData == "[]") {
          storageData = [];
          id = 1;
        } else {
          storageData = JSON.parse(storageData);
          const totalPerson = storageData.length;
          id = storageData[totalPerson - 1].id + 1;
        }
      }
  
      // Collect all cities values
    //   const emailValues = Array.from(emails).map(
    //     (emailField) => emailField.value
    //   );
  
      const data = {
        id: id,
        state : state.value,
        description : description.value,
        citie : citie.value,
        postelCode : postelCode.value
      };
  
      storageData.push(data);
      localStorage.setItem("citiesData", JSON.stringify(storageData));
      registrationForm.reset();
      showTableData(storageData);
    }
  }
  
  export default addItem;
  