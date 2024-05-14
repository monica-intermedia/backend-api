const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../../config/config");
const { v4: uuidv4 } = require("uuid");

const typePemasukan = db.define("typePemasukan", {
  typePemasukanId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  jenisPemasukan: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

typePemasukan.beforeCreate((type) => {
  type.typePemasukanID = `${uuidv4()}`;
});

module.exports = typePemasukan;
