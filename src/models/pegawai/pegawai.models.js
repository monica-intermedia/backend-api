const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../../config/config");
const { v4: uuidv4 } = require("uuid");
const JabatanModels = require("../../models/pegawai/jabatan.models");

const PegawaiModels = db.define("Pegawai", {
  pegawaiId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  nip: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jabatan: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  alamat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  handphone: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});

PegawaiModels.beforeCreate((pegawai) => {
  pegawai.pegawaiId = uuidv4();
});

module.exports = PegawaiModels;
