// Generiere den Chart
async function generateChart() {
    try {
      // Daten abrufen
      const data = await fetch('http://localhost:3000/sales/m');
      const result = await data.json();
  
      // Filtere die Daten basierend auf dem gewünschten Monat
      const gewuenschterMonat = 6; // Beispiel: Hier den gewünschten Monat angeben
      const filteredData = result.filter(item => item.Monat === gewuenschterMonat);
  
      // Chart-Daten vorbereiten
      const labels = filteredData.map(item => item.Hersteller);
      const values = filteredData.map(item => parseFloat(item.Umsatz));
  
      const daten = {
        labels: labels,
        datasets: [{
          label: `Gesamtumsatz pro Hersteller - Monat ${gewuenschterMonat}`,
          data: values,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      };
  
      new Chart(document.getElementById("barchart4"), {
        type: 'bar',
        data: daten,
        options: {
          title: {
            display: true,
            text: `Gesamtumsatz pro Hersteller - Monat ${gewuenschterMonat}`
          }
        }
      });
    } catch (err) {
      console.log('Error:', err);
    }
  }
  
  generateChart();
  