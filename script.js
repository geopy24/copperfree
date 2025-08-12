// Zugriff auf das Suchfeld mit der ID "suche"
document.getElementById("suche").addEventListener("input", function() {
    // "this.value" ist der aktuell eingegebene Text im Suchfeld
    let filter = this.value.toLowerCase(); // Alles in Kleinbuchstaben umwandeln, damit Suche nicht zwischen Groß/Kleinschreibung unterscheidet

    // Alle Zeilen (tr) im Tabellenkörper (tbody) holen
    let rows = document.querySelectorAll("#freundesTabelle tbody tr");

    // Jede Tabellenzeile überprüfen
    rows.forEach(row => {
        // Den gesamten Textinhalt der Zeile holen und in Kleinbuchstaben umwandeln
        let text = row.textContent.toLowerCase();

        // Prüfen, ob der eingegebene Suchtext in der Zeile vorkommt
        if (text.includes(filter)) {
            row.style.display = ""; // Zeile anzeigen
        } else {
            row.style.display = "none"; // Zeile ausblenden
        }
    });
});
