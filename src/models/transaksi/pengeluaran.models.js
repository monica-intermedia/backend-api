const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../../config/config");
const { v4: uuidv4 } = require("uuid");
const TypePengeluaran = require("./typePengeluaran.model");

const Pengeluaran = db.define("pengeluaran", {
  pengeluaranId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  pengeluaran: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tanggal: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  jumlah: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Pengeluaran.beforeCreate((pengeluaran) => {
  pengeluaran.pengeluaranId = `${uuidv4()}`;
});

Pengeluaran.belongsTo(TypePengeluaran, { foreignKey: "typePengeluaranId" });

module.exports = Pengeluaran;
