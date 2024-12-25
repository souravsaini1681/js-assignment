import showTableData from "./showTable.js";

function deleteItem(index) {
    const modalElement = document.getElementById("deleteModal");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
    const deleteData = document.getElementById("deletedata");
    deleteData.addEventListener(
      "click",
      function () {
        const tableData = localStorage.getItem("citiesData");
        const data = JSON.parse(tableData);
        data.splice(index, 1);
        localStorage.setItem("citiesData", JSON.stringify(data));
        modal.hide();
        showTableData(data);
      },
      { once: true }
    );
  }

  export default deleteItem;