const WebSocket = require("ws");
const wsServer = new WebSocket.Server({ noServer: true });

wsServer.on("connection", (socket) => {
  socket.on("message", (message) => console.log(message));
  socket.on("close", () => console.log("Client disconnected"));
});

const broadcast = (data) => {
  wsServer.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

module.exports = { broadcast };
