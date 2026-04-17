# Chat App (Socket.IO + Express)

A real-time chat application built with Node.js, Express, and Socket.IO.

## Overview

This project provides:
- A simple web chat UI
- Real-time message broadcasting using WebSockets (Socket.IO)
- A server health/metrics dashboard using express-status-monitor

The app runs on port `3000` by default.

## Tech Stack

- Node.js
- Express `^5.2.1`
- Socket.IO `^4.8.3`
- express-status-monitor `^1.3.4`

## Project Structure

```text
chat_app/
  node_modules/
  public/
    index.html
  package.json
  package-lock.json
  server.js
```

## How It Works

### Server (`server.js`)
- Creates an Express app and HTTP server.
- Attaches Socket.IO to the HTTP server.
- Enables `express-status-monitor` middleware.
- Serves the chat page at `/`.
- Listens for Socket.IO event `chat message` and broadcasts it to all clients using `io.emit`.
- Logs client connection/disconnection in terminal.

### Client (`public/index.html`)
- Connects to Socket.IO with `io()`.
- Sends message on form submit with `socket.emit('chat message', input.value)`.
- Receives and renders messages with `socket.on('chat message', ...)`.

## Installation

From inside the `chat_app` folder:

```bash
npm install
```

## Run the App

```bash
node server.js
```

Expected terminal output:

```text
listening on *:3000
```

## Open in Browser

- Chat UI: `http://localhost:3000`
- Status monitor: `http://localhost:3000/status`

## Available Routes and Endpoints

### HTTP
- `GET /` -> Serves `public/index.html`
- `GET /status` -> Provided by `express-status-monitor` dashboard

### Socket.IO Events
- Client to server: `chat message` (string message)
- Server to clients: `chat message` (broadcasted string message)

## Common Issues and Fixes

### 1) `EADDRINUSE: address already in use :::3000`
Another process is already using port `3000`.

Fix:
```bash
lsof -nP -iTCP:3000 -sTCP:LISTEN
kill <PID>
```
Then run:
```bash
node server.js
```

### 2) `Cannot GET /status` (404)
This means status-monitor middleware is not active or server not restarted.

Fix:
- Ensure `app.use(statusMonitor())` is present in `server.js`
- Restart server after code changes

### 3) Browser CSP warning from `chrome-error://chromewebdata`
Usually appears after loading from an error page context. Open a fresh tab and go directly to:

`http://localhost:3000`

## Scripts

Current `package.json` scripts:

- `npm test` -> placeholder script only

You can optionally add a start script:

```json
"scripts": {
  "start": "node server.js"
}
```

Then run with:

```bash
npm start
```

## Next Improvements (Optional)

- Add usernames for each message
- Persist messages with a database
- Add message timestamps
- Add client-side validation and empty-message guard improvements
- Add deployment configuration (Render/Railway/Vercel + separate WS setup)

## License

ISC
