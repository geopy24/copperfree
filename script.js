function searchTable() {
    const input = document.getElementById("searchInput");
    const filter = input.value.toLowerCase();
    const table = document.getElementById("dataTable");
    const tr = table.getElementsByTagName("tr");

    for (let i = 1; i < tr.length; i++) {
        const rowText = tr[i].textContent.toLowerCase();
        tr[i].style.display = rowText.indexOf(filter) > -1 ? "" : "none";
    }
}

function sortTable(colIndex) {
    const table = document.getElementById("dataTable");
    let switching = true;
    let dir = "asc";
    let switchcount = 0;

    while (switching) {
        switching = false;
        const rows = table.rows;

        for (let i = 1; i < rows.length - 1; i++) {
            let shouldSwitch = false;
            let x = rows[i].getElementsByTagName("TD")[colIndex];
            let y = rows[i + 1].getElementsByTagName("TD")[colIndex];

            let xContent = x.textContent || x.innerText;
            let yContent = y.textContent || y.innerText;

            if (!isNaN(parseFloat(xContent)) && !isNaN(parseFloat(yContent))) {
                if (dir === "asc" ? parseFloat(xContent) > parseFloat(yContent) : parseFloat(xContent) < parseFloat(yContent)) {
                    shouldSwitch = true;
                    break;
                }
            } else {
                if (dir === "asc" ? xContent.toLowerCase() > yContent.toLowerCase() : xContent.toLowerCase() < yContent.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount === 0 && dir === "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}
