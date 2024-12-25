function showTableData(tableData) {
  if (!tableData) return;
  const tableContent = document.getElementById("tableContent");
  tableContent.innerHTML = "";

  tableData.forEach((item, index) => {
    const row = document.createElement("tr");

    const postalCodeDisplay = item.cityPostalPairs ? item.cityPostalPairs.slice(0, 2).map((cityObj) => `<div>${cityObj.postalCode}</div>`).join(""): "N/A";
    const cityDisplay = item.cityPostalPairs? item.cityPostalPairs.slice(0, 2).map((cityObj) => `<div>${cityObj.city}</div>`).join(""): "N/A";

    row.innerHTML = `
        <td>${item.state}</td>
        <td class="city-td text-decoration-underline" role="button" data-index="${index}">${cityDisplay}</td>
        <td>${postalCodeDisplay}</td>
        <td>
          <i class="bi bi-pencil-fill edit text-decoration-underline" data-index="${index}"></i>
          <i class="bi bi-trash delete" data-index="${index}"></i>
        </td>`;
    tableContent.appendChild(row);
  });

  const cityTds = document.querySelectorAll(".city-td");
  cityTds.forEach((cityTd) => {
    cityTd.addEventListener("click", () => {
      const index = cityTd.dataset.index;
      const item = tableData[index];
      showCityDetailsModal(item.cityPostalPairs);
    });
  });
}

function showCityDetailsModal(cityPostalPairs) {
  const modalContainer = document.getElementById("cityDetailsContainer");
  modalContainer.innerHTML = "";

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
  modalContainer.appendChild(detailsTable);

  // Show the modal
  const myModal = new bootstrap.Modal(
    document.getElementById("cityDetailsModal")
  );
  myModal.show();
}

export default showTableData;
