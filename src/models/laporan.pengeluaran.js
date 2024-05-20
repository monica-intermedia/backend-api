const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../config/config");
const { v4: uuidv4 } = require("uuid");

const LaporanPengeluaranModels = db.define("laporanpengeluaran", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  tanggal: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  pengeluaran: {
    type: DataTypes.BIGINT(20),
    allowNull: true,
  },
});

LaporanPengeluaranModels.beforeCreate((laporanpengeluaran) => {
  laporanpengeluaran.id = uuidv4();
});

module.exports = LaporanPengeluaranModels;
