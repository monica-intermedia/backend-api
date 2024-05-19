const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../config/config");
const { v4: uuidv4 } = require("uuid");
const SupplierModels = require("./supplier.models");

const PembelianLainyaModels = db.define("pembelianlainya", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  kodeBarang: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  namaBarang: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  totalHarga: {
    type: DataTypes.BIGINT(15),
    allowNull: false,
  },
  keterangan: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  id_supplier: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: SupplierModels,
      key: "id",
    },
  },
});

PembelianLainya.beforeCreate((lainya) => {
  lainya.id = `${uuidv4()}`;
});

SupplierModels.hasMany(PembelianLainya, { foreignKey: "id_supplier" });
PembelianLainya.belongsTo(SupplierModels, { foreignKey: "id_supplier" });

module.exports = PembelianLainyaModels;
