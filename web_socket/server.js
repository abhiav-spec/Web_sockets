import express from 'express';
import http from 'http';
import WebSocket, { WebSocketServer } from 'ws';

const app = express();

// Basic HTTP route
app.get('/', (req, res) => {
  res.send('HTTP server is running. Use WebSocket to connect.');
});

// Create HTTP server
const server = http.createServer(app);

// Attach WebSocket server to HTTP server
const wss = new WebSocketServer({ server });

// WebSocket connection
wss.on('connection', (ws, req) => {
  console.log('New client connected');

  ws.send('Welcome to WebSocket server!');

  ws.on('message', (message) => {
    console.log('Received:', message.toString());

    // Broadcast to all clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Start server
server.listen(8080, () => {
  console.log('Server running on http://localhost:8080');
  console.log('WebSocket running on ws://localhost:8080');
});