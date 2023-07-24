const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3000 });

// Function to generate random data
function generateData() {
  return Math.floor(Math.random() * 100);
}

// Send data to all connected clients every second
function sendDataToClients() {
  const data = generateData();
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ data }));
    }
  });
}

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

setInterval(sendDataToClients, 1000);
