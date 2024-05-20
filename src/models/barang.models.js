const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/config");
const { v4: uuidv4 } = require("uuid");

const BarangModels = db.define("barang", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: uuidv4,
  },
  namaBarang: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  harga: {
    type: DataTypes.BIGINT(15),
    allowNull: false,
  },
  stok: {
    type: DataTypes.INTEGER(5),
    allowNull: false,
  },
});

BarangModels.beforeCreate((barang) => {
  barang.id = uuidv4();
});

module.exports = BarangModels;
