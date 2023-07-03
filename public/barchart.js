const Chart = require('chart.js');
const canvas = document.getElementById('myChart');
const ctx = canvas.getContext('2d');

// Get the data from the server
fetch('/sales/top3')
  .then(res => res.json())
  .then(data => {
    // Extract the labels and data from the response
    const labels = data.map(item => item._id);
    const chartData = data.map(item => item.count);

    // Create the chart
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Top 3 Selling Screw Types',
          data: chartData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  });