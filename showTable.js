function showTableData(tableData) {
    const tableContent = document.getElementById("tableContent");
    tableContent.innerHTML = "";
  
    if (tableData) {
      tableData.forEach((item, index) => {
        const row = document.createElement("tr");
  
        // Combine emails into a comma-separated string or formatted list
        // const emailsDisplay = item.emails
        //   ? item.emails.map((email) => `<div>${email}</div>`).join("")
        //   : "N/A";
  
        row.innerHTML = `
               <td>${item.state}</td>
               <td>${item.citie}</td>
               <td>${item.postelCode}</td>
               <td>
                <i class="bi bi-pencil-fill edit" data-index="${index}"></i>
                <i class="bi bi-trash delete" data-index="${index}"></i>
               </td>`;
        tableContent.appendChild(row);
      });
    }
  }
  
  export default showTableData;
  