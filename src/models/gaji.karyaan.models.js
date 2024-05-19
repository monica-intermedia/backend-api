const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../config/config");
const { v4: uuidv4 } = require("uuid");
const PegawaiModels = require("../models/pegawai.models");

const GajiKaryawanModels = db.define("gajikaryawan", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  tanggal: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  bpjs: {
    type: DataTypes.BIGINT(15),
    allowNull: true,
  },
  potongan: {
    type: DataTypes.BIGINT(15),
    allowNull: true,
  },
  bonus: {
    type: DataTypes.BIGINT(15),
    allowNull: true,
  },
  jumlahGaji: {
    type: DataTypes.BIGINT(15),
    allowNull: false,
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

GajiKaryawanModels.beforeCreate((gaji) => {
  gaji.id = `${uuidv4()}`;
});

PegawaiModels.hasMany(GajiKaryawanModels, { foreignKey: "id_pegawai" });
GajiKaryawanModels.belongsTo(PegawaiModels, { foreignKey: "id_pegawai" });

module.exports = GajiKaryawanModels;
