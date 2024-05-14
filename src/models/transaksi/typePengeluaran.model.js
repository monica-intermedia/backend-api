const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../../config/config");
const { v4: uuidv4 } = require("uuid");

const TypePengeluaran = db.define("typePengeluaran", {
  typePengeluaranId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  jenisPengeluaran: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

TypePengeluaran.beforeCreate((type) => {
  type.typePengeluaranID = `${uuidv4()}`;
});

module.exports = TypePengeluaran;
