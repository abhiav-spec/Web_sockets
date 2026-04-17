import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('A new client connected!');
  ws.send('Welcome to the WebSocket server!');
});

console.log('WebSocket server running on ws://localhost:8080');
