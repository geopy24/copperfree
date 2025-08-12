// CSV laden und parsen
Papa.parse('daten.csv', {
    download: true,
    delimiter: ",", // Spaltentrenner
    skipEmptyLines: true,
    complete: function(results) {
        const rows = results.data;
        const header = rows[0];
        const data = rows.slice(1);

        // Kopfzeile setzen
        const headerRow = document.getElementById("tableHeader");
        header.forEach((col, index) => {
            const th = document.createElement("th");
            th.textContent = col;
            th.onclick = () => sortTable(index);
            headerRow.appendChild(th);
        });

        // Körper setzen
        const tbody = document.getElementById("tableBody");
        data.forEach(row => {
            const tr = document.createElement("tr");
            row.forEach(cell => {
                const td = document.createElement("td");
                td.textContent = cell;
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
    }
});

// Suchfunktion
function searchTable() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const rows = document.getElementById("tableBody").getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
        const rowText = rows[i].textContent.toLowerCase();
        rows[i].style.display = rowText.includes(input) ? "" : "none";
    }
}

// Sortierfunktion
function sortTable(colIndex) {
    const tbody = document.getElementById("tableBody");
    const rowsArray = Array.from(tbody.rows);
    let dir = tbody.getAttribute("data-sort-dir") === "asc" ? "desc" : "asc";
    tbody.setAttribute("data-sort-dir", dir);

    rowsArray.sort((a, b) => {
        let aText = a.cells[colIndex].textContent.trim();
        let bText = b.cells[colIndex].textContent.trim();

        // Versuchen, als Zahl zu sortieren
        let aNum = parseFloat(aText.replace(',', '.'));
        let bNum = parseFloat(bText.replace(',', '.'));
        if (!isNaN(aNum) && !isNaN(bNum)) {
            return dir === "asc" ? aNum - bNum : bNum - aNum;
        }
        // Sonst als Text sortieren
        return dir === "asc"
            ? aText.localeCompare(bText)
            : bText.localeCompare(aText);
    });

    rowsArray.forEach(row => tbody.appendChild(row));
}
