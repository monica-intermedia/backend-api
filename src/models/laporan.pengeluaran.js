const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../config/config");
const { v4: uuidv4 } = require("uuid");
const GajiKaryawanModels = require("../models/gaji.karyaan.models");
const PembelianLainyaModels = require("./pembelian.lainya.models");
const PembelianBarangModels = require("./pembelian.barang.models");

const LaporanPengeluaranModels = db.define("laporanpengeluaran", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  pengeluaran: {
    type: DataTypes.BIGINT(20),
    allowNull: true,
  },
  id_gaji_karyawan: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: GajiKaryawanModels,
      key: "id",
    },
  },
  id_pembelian_lainya: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: PembelianLainyaModels,
      key: "id",
    },
  },
  id_pembelian_barang: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: PembelianBarangModels,
      key: "id",
    },
  },
});

LaporanPengeluaranModels.beforeCreate((laporanpengeluaran) => {
  laporanpengeluaran.id = uuidv4();
});

GajiKaryawanModels.hasMany(LaporanPengeluaranModels, {
  foreignKey: "id_gaji_karyawan",
});
LaporanPengeluaranModels.belongsTo(GajiKaryawanModels, {
  foreignKey: "id_gaji_karyawan",
});

// pembelian lainya
PembelianLainyaModels.hasMany(LaporanPengeluaranModels, {
  foreignKey: "id_pembelian_lainya",
});
LaporanPengeluaranModels.belongsTo(PembelianLainyaModels, {
  foreignKey: "id_pembelian_lainya",
});

// pembelian barang
PembelianBarangModels.hasMany(LaporanPengeluaranModels, {
  foreignKey: "id_pembelian_barang",
});
LaporanPengeluaranModels.belongsTo(PembelianBarangModels, {
  foreignKey: "id_pembelian_barang",
});

module.exports = LaporanPengeluaranModels;
