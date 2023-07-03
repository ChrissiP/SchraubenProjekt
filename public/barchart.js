
    const labels = top3.map(schraube => schraube._id);
    const data = {
      labels: labels,
      datasets: [{
        label: 'Verkaufte Menge',
        data: top3.map(schraube => schraube.count),
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
  } catch (err) {
    console.log('Error:', err);
  }
}