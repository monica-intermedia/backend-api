const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../../config/config");
const { v4: uuidv4 } = require("uuid");

const PositionModel = db.define("jabatan", {
  jabatanId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  jabatan: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

PositionModel.beforeCreate((jabatan) => {
  jabatan.jabatanId = `${uuidv4()}`;
});

module.exports = PositionModel;
