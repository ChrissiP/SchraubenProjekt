async function createChart() {
    // Fetch data from the server
    const response = await fetch('/sales/top3hersteller');
    const result = await response.json();
    console.log(result)
  
    // Convert data into Chart.js format
    const labels = result.map(entry => entry._id);
    const datasetData = result.map(entry => entry.count);
    console.log(datasetData);
    
  
    const data = {
      labels: labels,
      datasets: [{
        label: 'Top 3 Hersteller',
        data: datasetData,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    };
  console.log(data);
    // Create Chart.js chart
    new Chart(
        document.getElementById('doughnut2'),
        {
          type: 'doughnut',
          data: data,
          options: {}
        },
      );

    );
  }
  
  createChart();