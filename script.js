// CSV laden und Tabelle füllen
fetch('daten.csv')
    .then(response => response.text())
    .then(csvText => {
        const rows = csvText.trim().split('\n').map(line => {
            // Zerlegen am Komma, aber vorher Komma in Zahlen behandeln
            const parts = line.split(',').map(cell => cell.trim());
            return parts;
        });

        const header = rows[0];
        const data = rows.slice(1);

        // Tabellenkopf setzen
        const headerRow = document.getElementById("tableHeader");
        header.forEach((col, index) => {
            const th = document.createElement("th");
            th.textContent = col;
            th.onclick = () => sortTable(index);
            headerRow.appendChild(th);
        });

        // Tabellenkörper setzen
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

        // Spalte 1 als Zahl mit Komma behandeln
        if (colIndex === 1) {
            aText = parseFloat(aText.replace(',', '.'));
            bText = parseFloat(bText.replace(',', '.'));
            return dir === "asc" ? aText - bText : bText - aText;
        } else {
            return dir === "asc"
                ? aText.localeCompare(bText)
                : bText.localeCompare(aText);
        }
    });

    // Neu sortierte Zeilen anhängen
    rowsArray.forEach(row => tbody.appendChild(row));
}
