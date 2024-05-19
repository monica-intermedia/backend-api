const db = require("../config/config");
const { Sequelize, DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const PelangganModels = require("../models/pelanggan.models");

const CetakanDiProses = db.define("cetakandiproses", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUID,
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
  totalHarga: {
    type: DataTypes.BIGINT(20),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM(["sudah-dicetak", "belum-dicetak"]),
    allowNull: true,
  },
  file: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  id_pelanggan: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: PelangganModels,
      allowNull: false,
    },
  },
});

CetakanDiProses.beforeCreate((barang) => {
  barang.id = `${uuidv4}`;
});

PelangganModels.hasMany(CetakanDiProses, { foreignKey: "id_pelanggan" });
CetakanDiProses.belongsTo(PelangganModels, { foreignKey: "id_pelanggan" });

module.exports = BarangModels;
