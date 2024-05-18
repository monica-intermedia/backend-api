const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const cors = require("cors");
require("dotenv").config();

//Routing
const adminRoute = require("./routes/AdminRoute");
const authRoute = require("./routes/authRoute");
const karyawanRoute = require("./routes/karyawanRoute");
const positionRoute = require("./routes/positionRoute");
const supplierRoute = require("./routes/pelangan/supplier.route");
const barangRoute = require("./routes/barangRoute");
const pembelianRoute = require("./routes/pembelianRoute");
const transaksiRoute = require("./routes/transaksi.route");
const jabatanRoute = require("./routes/pegawai/jabatan.route");
const pegawaiRoute = require("./routes/pegawai/pegawai.route");

// migrate DB
const db = require("./config/config");
db.sync({ force: true });

app.use(cors());
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

try {
  app.use(adminRoute);
  app.use(authRoute);
  app.use(karyawanRoute);
  app.use(positionRoute);
  app.use(supplierRoute);
  app.use(barangRoute);
  app.use(pembelianRoute);
  app.use(transaksiRoute);
  app.use(jabatanRoute);
  app.use(pegawaiRoute);
} catch (error) {
  console.error(error);
}

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Listen on port
app
  .listen(port, () => {
    // console.log(`Server running on port ${port}`);
  })
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`Port ${port} is already in use`);
    } else {
      console.error(err);
    }
    process.exit(1); // Exit the process if there's an error starting the server
  });
