const db = require("../config/config");
const { Sequelize, DataTypes } = require("sequelize");

const DataTransaksiModels = db.define("datatransaksi", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  order_id: {
    // Make sure this matches with the payload property
    type: DataTypes.STRING,
    allowNull: false,
  },
  namaKoran: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  keterangan: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  eksemplar: {
    type: DataTypes.INTEGER(10),
    allowNull: false,
  },
  jumlahHalaman: {
    type: DataTypes.INTEGER(10),
    allowNull: false,
  },
  jumlahWarna: {
    type: DataTypes.INTEGER(10),
    allowNull: false,
  },
  jumlahPlate: {
    type: DataTypes.INTEGER(10),
    allowNull: false,
  },
  harga: {
    type: DataTypes.BIGINT(20),
    allowNull: false,
  },
  gross_amount: {
    type: DataTypes.BIGINT(20),
    allowNull: false,
  },
  tanggal: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isValid: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  email: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
  },
});

module.exports = DataTransaksiModels;
