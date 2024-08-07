const express = require("express");
const app = express();
const http = require("http");
const port = process.env.PORT || 8080;
const cors = require("cors");
require("dotenv").config();
const startCronJobs = require("./middleware/startCronJobs.js");
const WebSocket = require("ws");
const bodyParser = require("body-parser");
const path = require("path");

// Create HTTP server
const server = http.createServer(app);

// Create WebSocket server
const wsServer = new WebSocket.Server({ noServer: true });

// Routing
const adminRoute = require("./routes/admin.routes.js");
const authRoute = require("./routes/auth.routes.js");
const jabatanRoute = require("./routes/jabatan.routes");
const pegawaiRoute = require("./routes/pegawai.routes");
const pelangganRoute = require("./routes/pelanggan.routes.js");
const supplierRoute = require("./routes/supplier.routes");
const barangRoute = require("./routes/barang.routes.js");
const gajiRoute = require("./routes/gaji.karyawan.routes.js");
const pembelianbarangRoute = require("./routes/pembelian.barang.routes.js");
const dataTransaksiRoute = require("./routes/data.transaksi.routes.js");
const barangKeluarRoute = require("./routes/barang.keluar.routes.js");
const pembelianlainyaRoute = require("./routes/pembelian.lainya.routes.js");
const penjualanlainyaRoute = require("./routes/penjualan.lainya.routes.js");
const absensiRoute = require("./routes/absensi.routes.js");
const chartRoute = require("./routes/chart.routes.js");
const koranRoute = require("./routes/koran.routes.js");

// Migrate DB
const db = require("./config/config");

// // Jangan gunakan force: true dalam produksi, ini hanya untuk pengembangan
// db.sync({ alter: true })
//   .then(() => {
//     console.log("Database synced");
//   })
//   .catch((err) => {
//     console.error("Failed to sync database:", err);
//   });

// wsServer.on("connection", (socket) => {
//   socket.on("message", (message) => console.log(message));
//   socket.on("close", () => console.log("Client disconnected"));
// });

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());
app.use(express.json());
// startCronJobs();
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const publicPath = path.join(__dirname, "public", "images", "absensi");

app.get("/get-image-absensi", (req, res) => {
  const imagePath = path.join(publicPath, "*");

  res.sendFile(imagePath, (err) => {
    if (err) {
      res.status(404).send("File not found");
    }
  });
});

try {
  app.use(adminRoute);
  app.use(authRoute);
  app.use(pegawaiRoute);
  app.use(jabatanRoute);
  app.use(pelangganRoute);
  app.use(supplierRoute);
  app.use(barangRoute);
  app.use(gajiRoute);
  app.use(pembelianbarangRoute);
  app.use(dataTransaksiRoute);
  app.use(barangKeluarRoute);
  app.use(pembelianlainyaRoute);
  app.use(penjualanlainyaRoute);
  app.use(absensiRoute);
  app.use(chartRoute);
  app.use(koranRoute);
} catch (error) {
  console.error(error);
}

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

try {
  // Listen on port
  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  // Handle upgrade requests for WebSocket
  server.on("upgrade", (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, (socket) => {
      wsServer.emit("connection", socket, request);
    });
  });
} catch (error) {
  console.error(error);
}
