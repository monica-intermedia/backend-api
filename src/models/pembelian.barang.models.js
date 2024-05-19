const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../config/config");
const { v4: uuidv4 } = require("uuid");
const SupplierModels = require("./supplier.models");
const BarangModels = require("./barang.models");

const PembelianBarangModels = db.define("pembelianbarang", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  kodePembelian: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  qty: {
    type: DataTypes.BIGINT(5),
    allowNull: false,
  },
  totalHarga: {
    type: DataTypes.BIGINT(15),
    allowNull: false,
  },
  id_supplier: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: SupplierModels,
      key: "id",
    },
  },
  id_supplier: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: SupplierModels,
      key: "id",
    },
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

PembelianBarang.beforeCreate((barang) => {
  barang.id = `${uuidv4()}`;
});

SupplierModels.hasMany(PembelianBarang, { foreignKey: "id_supplier" });
PembelianBarang.belongsTo(SupplierModels, { foreignKey: "id_supplier" });

BarangModels.hasMany(PembelianBarang, { foreignKey: "id_barang" });
PembelianBarang.belongsTo(BarangModels, { foreignKey: "id_barang" });

module.exports = PembelianBarangModels;
