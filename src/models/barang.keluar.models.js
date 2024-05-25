const db = require("../config/config");
const { Sequelize, DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const BarangModels = require("../models/barang.models");

const BarangKeluarModels = db.define("barangkeluar", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUID,
  },
  qty: {
    type: DataTypes.INTEGER(5),
    allowNull: false,
  },
  id_barang: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: BarangModels,
      key: "id",
    },
  },
});

BarangKeluarModels.beforeCreate((barang) => {
  barang.id = `${uuidv4}`;
});

BarangModels.hasMany(BarangKeluarModels, { foreignKey: "id_barang" });
BarangKeluarModels.belongsTo(BarangModels, { foreignKey: "id_barang" });

module.exports = BarangKeluarModels;
