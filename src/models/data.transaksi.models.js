const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/config");
const KoranModels = require("./koran.models");

const DataTransaksiModels = db.define("datatransaksi", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  order_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  namaKoran: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  eksemplar: {
    type: DataTypes.INTEGER(10),
    allowNull: false,
  },
  gross_amount: {
    type: DataTypes.BIGINT(20),
    allowNull: false,
  },
  tanggal: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isValid: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  email: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
  },
  id_koran: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: KoranModels,
      key: "id",
    },
  },
});

KoranModels.hasMany(DataTransaksiModels, { foreignKey: "id_koran" });
DataTransaksiModels.belongsTo(KoranModels, { foreignKey: "id_koran" });

module.exports = DataTransaksiModels;
