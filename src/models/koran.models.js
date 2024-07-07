const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/config");
const { v4: uuidv4 } = require("uuid");

const KoranModels = db.define("koran", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  keterangan: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  halaman: {
    type: DataTypes.BIGINT(15),
    allowNull: true,
  },
  warna: {
    type: DataTypes.BIGINT(15),
    allowNull: true,
  },
  plate: {
    type: DataTypes.INTEGER(3),
    allowNull: false,
  },
  harga: {
    type: DataTypes.BIGINT(15),
    allowNull: false,
  },
});

KoranModels.beforeCreate((koran) => {
  koran.id = uuidv4();
});

module.exports = KoranModels;
