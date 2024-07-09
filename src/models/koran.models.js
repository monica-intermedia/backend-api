const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/config");
const { v4: uuidv4 } = require("uuid");
const BarangModels = require("./barang.models");

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
  id_barang: {
    type: DataTypes.UUID,
    references: {
      model: BarangModels,
      key: "id",
    },
  },
});

KoranModels.beforeCreate((koran) => {
  koran.id = uuidv4();
});

BarangModels.hasMany(KoranModels, { foreignKey: "id_barang" });
KoranModels.belongsTo(BarangModels, { foreignKey: "id_barang" });

module.exports = KoranModels;
