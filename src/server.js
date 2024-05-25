const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const cors = require("cors");
require("dotenv").config();
const startCronJobs = require("./middleware/startCronJobs.js");

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

// Migrate DB
const db = require("./config/config");

// Jangan gunakan force: true dalam produksi, ini hanya untuk pengembangan
db.sync({ force: false })
  .then(() => {
    console.log("Database synced");
  })
  .catch((err) => {
    console.error("Failed to sync database:", err);
  });

app.use(cors());
app.use(express.json());
startCronJobs();
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
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
} catch (error) {
  console.error(error);
}

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

try {
  // Listen on port
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
} catch (error) {
  console.error(error);
}
