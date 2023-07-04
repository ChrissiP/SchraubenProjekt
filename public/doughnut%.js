// Funktion zum Rendern des Donut-Diagramms
function renderDonutChart(data) {
  const labels = data.map(item => item.label);
  const values = data.map(item => item.value);

  const chartData = {
    labels,
    datasets: [{
      data: values,
      backgroundColor: ['blue', 'gray'], // Farben für das Diagramm anpassen
    }]
  };

  const chartOptions = {
    // Optionen für das Diagramm anpassen (z.B. Titel, Legende usw.)
  };

  const ctx = document.getElementById('donutChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'doughnut',
    data: chartData,
    options: chartOptions
  });
}

// Daten über AJAX-Anfrage von der Server-API abrufen
function fetchData() {
  fetch('/sales/percentage/HerstellerX') // Ersetze "HerstellerX" durch den gewünschten Herstellernamen
    .then(response => response.json())
    .then(data => {
      renderDonutChart(data.data);
    })
    .catch(error => {
      console.log('Fehler beim Abrufen der Daten:', error);
    });
}

// Rufe die Daten ab und erstelle das Donut-Diagramm, wenn die Seite geladen wird
document.addEventListener('DOMContentLoaded', () => {
  fetchData();
});
