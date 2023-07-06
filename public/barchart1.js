async function createChart() {
  // Fetch data from the server
  const response = await fetch('http://localhost:3000/sales/besterTag');
  const result = await response.json();
  console.log(result)

  // Convert data into Chart.js format
  const labels = result.map(entry => entry._id);
  const datasetData = result.map(entry => entry.count);
  console.log(datasetData);
  

  const data = {
    labels: labels,
    datasets: [{
      label: 'Bester Verkaufstag',
      data: datasetData,
      backgroundColor: 'rgba(255, 206, 86, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  };
console.log(data);
//Erstelle den Chart 
  new Chart(
    document.getElementById('barchart1'),
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