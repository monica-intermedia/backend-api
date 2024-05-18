const db = require("../../config/config");
const { Sequelize, DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const AbsensiModels = db.define("absensi", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  tanggal: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  waktuMasuk: {
    type: DataTypes.TIME,
    allowNull: true,
  },
  waktuKeluar: {
    type: DataTypes.TIME,
    allowNull: true,
  },
  gambar: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  keterangan: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
});

AbsensiModels.beforeCreate((absensi) => {
  absensi.id = uuidv4();
});

module.exports = AbsensiModels;
