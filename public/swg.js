async function createChart() {
    // Fetch data from the server
    const response = await fetch('http://localhost:3000/sales/m');
    const result = await response.json();
    console.log(result);
  
    // Filter data for SWG and June
    const swgJuneData = result.filter(entry => entry.Hersteller === "SWG" && entry.Monat === 6);
  
    // Convert data into Chart.js format
    const labels = swgJuneData.map(entry => entry.Schraube);
    const datasetData = swgJuneData.map(entry => parseFloat(entry.Umsatz.slice(0, -1))); // Remove the Euro symbol and convert to a number
    console.log(datasetData);
  
    const data = {
      labels: labels,
      datasets: [{
        label: 'Gesamtumsatz SWG',
        data: datasetData,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    };
    console.log(data);
  
    // Create the chart
    new Chart(
      document.getElementById('swg'),
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
  