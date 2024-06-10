const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../config/config");
const { v4: uuidv4 } = require("uuid");

const PembelianLainyaModels = db.define("pembelianLainya", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  nomorFaktur: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  jenisPembelian: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  qty: {
    type: DataTypes.BIGINT(5),
    allowNull: false,
  },
  totalHarga: {
    type: DataTypes.BIGINT(15),
    allowNull: false,
  },
  tanggal: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  keterangan: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
});

PembelianLainyaModels.beforeCreate((barang) => {
  barang.id = uuidv4();
});

module.exports = PembelianLainyaModels;
