const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../config/config");
const { v4: uuidv4 } = require("uuid");

const JabatanModels = db.define("jabatan", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  jabatan: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
});

JabatanModels.beforeCreate((jabatan) => {
  jabatan.id = `${uuidv4()}`;
});

module.exports = JabatanModels;
