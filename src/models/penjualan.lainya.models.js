const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../config/config");
const { v4: uuidv4 } = require("uuid");

const PenjualanLainyaModels = db.define("penjualanlainya", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  kodePenjualan: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  namaPenjualan: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  totalHarga: {
    type: DataTypes.BIGINT(20),
    allowNull: false,
  },
  keterangan: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  tanggal: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});

PenjualanLainyaModels.beforeCreate((jabatan) => {
  jabatan.id = `${uuidv4()}`;
});

module.exports = PenjualanLainyaModels;
