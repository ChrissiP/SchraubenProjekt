// Generiere den Chart
async function generateChart() {
    try {
      // Daten abrufen
      const data = await fetch('http://localhost:3000/sales/umsatzProSchraubenartProMonat');
      const result = await data.json();
  
      // Chart-Daten vorbereiten
      const labels = result.map(item => `${item.Monat}/${item.Jahr} - ${item.Schraubenart}`);
      const values = result.map(item => parseFloat(item.Umsatz));
  
      const daten = {
        labels: labels,
        datasets: [{
          label: 'Umsatz pro Schraubenart je Monat',
          data: values,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      };
  
      new Chart(document.getElementById("barchart3"), {
        type: 'bar',
        data: daten,
        options: {
          title: {
            display: true,
            text: 'Umsatz pro Schraubenart je Monat'
          }
        }
      });
    } catch (err) {
      console.log('Error:', err);
    }
  }
  
  generateChart();
  