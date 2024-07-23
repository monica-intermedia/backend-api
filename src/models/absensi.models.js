const db = require("../config/config");
const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const PegawaiModels = require("./pegawai.models");

const AbsensiModels = db.define("absensi", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  tanggal: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  waktuMasuk: {
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
  id_pegawai: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: PegawaiModels,
      key: "id",
    },
  },
});

AbsensiModels.beforeCreate((absensi) => {
  absensi.id = uuidv4();
});

PegawaiModels.hasMany(AbsensiModels, { foreignKey: "id_pegawai" });
AbsensiModels.belongsTo(PegawaiModels, { foreignKey: "id_pegawai" });

module.exports = AbsensiModels;
