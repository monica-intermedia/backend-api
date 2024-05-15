const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../../config/config");
const { v4: uuidv4 } = require("uuid");
const JabatanModels = require("../../models/pegawai/jabatan.models");

const PegawaiModels = db.define("pegawai", {
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
  Name: {
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
  jabatanId: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
});

PegawaiModels.beforeCreate((pegawai) => {
  pegawai.pegawaiId = uuidv4();
});

JabatanModels.hasMany(PegawaiModels, { onDelete: "cascade" });
PegawaiModels.belongsTo(JabatanModels, {
  foreignKey: "jabatanId",
});

module.exports = PegawaiModels;
