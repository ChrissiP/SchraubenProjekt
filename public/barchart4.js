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
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(72, 201, 176, 0.2)',
            'rgba(238, 130, 238, 0.2)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(72, 201, 176, 1)',
            'rgba(238, 130, 238, 1)'
          ],
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
  