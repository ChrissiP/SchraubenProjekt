new Chart(document.getElementById("myChart"), {
    type: 'bar',
    data: {
        labels: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
        datasets: [
            {
                label: "Schraubenart 1",
                backgroundColor: "#3e95cd",
                data: [2478,5267,734,784,433,2478,5267,734,784,433,2478,5267]
            }, {
                label: "Schraubenart 2",
                backgroundColor: "#8e5ea2",
                data: [2478,5267,734,784,433,2478,5267,734,784,433,2478,5267]
            }, {
                label: "Schraubenart 3",
                backgroundColor: "#3cba9f",
                data: [2478,5267,734,784,433,2478,5267,734,784,433,2478,5267]
            }
        ]
    },
    options: {
        title: {
            display: true,
            text: 'Verkaufte Menge pro Schraubenart je Monat'
        }
    }
});