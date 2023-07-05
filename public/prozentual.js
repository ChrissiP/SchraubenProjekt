// Generiere den Chart
async function generateChart() {
  try {
    // Daten abrufen
    const data = await fetch('http://localhost:3000/sales/prozentual');
    const result = await data.json();

    // Chart-Daten vorbereiten
    const labels = result.map(item => item.Hersteller); // Hersteller-Labels
    const values = result.map(item => parseFloat(item.Prozentual)); // Prozentuale Werte für jeden Hersteller

    // Chart erstellen
    new Chart(document.getElementById('prozentual'), {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: ['red', 'green', 'blue'] // Farben für die Hersteller anpassen
        }]
      },
      options: {
        responsive: true
      }
    });
  } catch (err) {
    console.log('Error:', err);
  }
}

generateChart();
