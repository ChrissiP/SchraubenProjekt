(async function() {
  const labels = ["2023-06-13", "2023-06-01", "2023-06-02"];
  const data = {
    labels: labels,
    datasets: [{
      label: 'Bester Tag:',
      data: [25861, 20920, 20063],
      backgroundColor: 'yellow',
      borderColor: 'blue',
      borderWidth: 1
    }]
};
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
  })();