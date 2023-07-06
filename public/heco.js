async function createChart() {
    // Fetch data from the server
    const response = await fetch('http://localhost:3000/sales/m');
    const result = await response.json();
    console.log(result);
  
    // Filter data for HECO and June
    const hecoJuneData = result.filter(entry => entry.Hersteller === "HECO" && entry.Monat === 6);
  
    // Convert data into Chart.js format
    const labels = hecoJuneData.map(entry => entry.Schraube);
    const datasetData = hecoJuneData.map(entry => parseFloat(entry.Umsatz.slice(0, -1))); // Remove the Euro symbol and convert to a number
    console.log(datasetData);
  
    const data = {
      labels: labels,
      datasets: [{
        label: 'Gesamtumsatz HECO',
        data: datasetData,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    };
    console.log(data);
  
    // Create the chart
    new Chart(
      document.getElementById('heco'),
      {
        type: 'bar',
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        },
      }
    );
  }
  
  createChart();
  