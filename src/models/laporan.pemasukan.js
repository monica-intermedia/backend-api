const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../config/config");
const { v4: uuidv4 } = require("uuid");
const DataTransaksiModels = require("../models/data.transaksi.models");
const PenjualanLainyaModels = require("../models/penjualan.lainya.models");

const LaporanPemasukanModels = db.define("laporanpengeluaran", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  pendapatan: {
    type: DataTypes.BIGINT(20),
    allowNull: true,
  },
  id_data_transaksi: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: DataTransaksiModels,
      key: "id",
    },
  },
  id_penjualan_lainya: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: PenjualanLainyaModels,
      key: "id",
    },
  },
});

LaporanPemasukanModels.beforeCreate((laporanpemasukan) => {
  laporanpemasukan.id = uuidv4();
});

DataTransaksiModels.hasMany(LaporanPemasukanModels, {
  foreignKey: "id_data_transaksi",
});
LaporanPemasukanModels.belongsTo(DataTransaksiModels, {
  foreignKey: "id_gaji_karyawan",
});

// penjualan lainya
PenjualanLainyaModels.hasMany(LaporanPemasukanModels, {
  foreignKey: "id_penjualan_lainya",
});
LaporanPemasukanModels.belongsTo(PenjualanLainyaModels, {
  foreignKey: "id_penjualan_lainya",
});

module.exports = LaporanPemasukanModels;
