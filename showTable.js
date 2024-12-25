function showTableData(tableData) {
  const tableContent = document.getElementById("tableContent");
  tableContent.innerHTML = "";

  if (tableData) {
    tableData.forEach((item, index) => {
      const row = document.createElement("tr");

      const postalCodeDisplay = item.cityPostalPairs
        ? item.cityPostalPairs
            .slice(0, 2)
            .map((cityObj) => `<div>${cityObj.postalCode}</div>`)
            .join("")
        : "N/A";
      const cityDisplay = item.cityPostalPairs
        ? item.cityPostalPairs
            .slice(0, 2)
            .map((cityObj) => `<div>${cityObj.city}</div>`)
            .join("")
        : "N/A";

      row.innerHTML = `
        <td>${item.state}</td>
        <td class="city-td" data-index="${index}">${cityDisplay}</td>
        <td>${postalCodeDisplay}</td>
        <td>
          <i class="bi bi-pencil-fill edit" data-index="${index}"></i>
          <i class="bi bi-trash delete" data-index="${index}"></i>
        </td>`;
      tableContent.appendChild(row);
    });
  }

  // Add click event listener to city td elements to trigger modal
  const cityTds = document.querySelectorAll(".city-td");
  cityTds.forEach((cityTd) => {
    cityTd.addEventListener("click", () => {
      const index = cityTd.dataset.index;
      const item = tableData[index]; // Get the corresponding item
      showCityDetailsModal(item.cityPostalPairs);
    });
  });
}

function showCityDetailsModal(cityPostalPairs) {
  const modalContainer = document.getElementById("cityDetailsContainer");
  modalContainer.innerHTML = ""; // Clear previous content

  // Create a table for city details
  const detailsTable = document.createElement("table");
  detailsTable.classList.add("table", "table-bordered", "text-center");

  const tableHead = document.createElement("thead");
  tableHead.innerHTML = `
    <tr>
      <th>City</th>
      <th>Postal Code</th>
    </tr>
  `;
  detailsTable.appendChild(tableHead);

  const tableBody = document.createElement("tbody");

  if (cityPostalPairs && cityPostalPairs.length > 0) {
    cityPostalPairs.forEach((cityObj) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${cityObj.city}</td>
        <td>${cityObj.postalCode}</td>
      `;
      tableBody.appendChild(row);
    });
  } else {
    const noDataRow = document.createElement("tr");
    noDataRow.innerHTML = "<td colspan='2'>No city data available.</td>";
    tableBody.appendChild(noDataRow);
  }

  detailsTable.appendChild(tableBody);

  // Append the table to the modal container
  modalContainer.appendChild(detailsTable);

  // Show the modal
  const myModal = new bootstrap.Modal(
    document.getElementById("cityDetailsModal")
  );
  myModal.show();
}

export default showTableData;
