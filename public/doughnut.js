(async function() {
  const data = {
    datasets: [{
      data: [94344, 91546, 90955],
      backgroundColor: ['green', 'red', 'yellow']
    }],
    labels: ['Maschinenschraube', 'Sechskantschraube', 'Universalschraube']
  };

  new Chart(
    document.getElementById('doughnut'),
    {
      type: 'doughnut',
      data: data,
      options: {}
    },
  );
})();