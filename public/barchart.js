


(async function() {
    const labels = ["HECO", "Wuerth", "SWG"];
    const data = {
      labels: labels,
      datasets: [{
        label: 'Top 3 Hersteller:',
        data: [240233, 238764, 238343],
        backgroundColor: 'red',
        borderColor: 'blue',
        borderWidth: 1
      }]
};
    new Chart(
        document.getElementById('barchart'),
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
    })();