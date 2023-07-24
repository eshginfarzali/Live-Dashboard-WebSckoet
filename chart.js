function createChart() {
    const ctx = document.getElementById('chart').getContext('2d');
    const initialData = Array.from({ length: 30 }, (_, i) => 0); 
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({ length: 30 }, (_, i) => ''), 
        datasets: [{
          label: 'Live Data',
          borderColor: 'rgb(75, 192, 192)',
          data: initialData,
          fill: false,
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            min: 0,
            max: 29, 
            ticks: {
              stepSize: 1,
              callback: function (value, index, values) {
                return index === 29 ? '' : value; 
              }
            }
          },
          y: {
            min: 0,
            max: 100,
          }
        }
      }
    });
  
    let currentX = 0;
  
    return function updateChart(data) {
      
      chart.data.datasets[0].data[currentX] = data;
      chart.update();
  
     
      chart.data.labels[currentX] = currentX;
      chart.update();
  
      currentX = (currentX + 1) % 30;
    };
  }
  
  const socket = new WebSocket('ws://localhost:3000');

  socket.addEventListener('open', function () {
    console.log('WebSocket connection established');
  });

  socket.addEventListener('message', function (event) {
    const data = JSON.parse(event.data);
    updateChart((data.data));
  });

  socket.addEventListener('close', function () {
    console.log('WebSocket connection closed');
  });

  const updateChart = createChart();