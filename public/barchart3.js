async function downloadChartAsExcel() {
  try {
    const response = await fetch('http://localhost:3000/sales/umsatzProSchraubenartProMonat');
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'umsatzProSchraubenartProMonat.xlsx';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error(err);
    alert('Beim Herunterladen des Charts ist ein Fehler aufgetreten.');
  }
}
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
    // Erstelle den Button für den Download
    const button = document.getElementById('downloadChartButton');
    button.addEventListener('click', downloadChartAsExcel);
  
  generateChart();
  