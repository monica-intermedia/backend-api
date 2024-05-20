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
  nomorFaktur: {
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
  isInventory: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
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

PembelianBarangModels.beforeCreate((barang) => {
  barang.id = uuidv4();
});

SupplierModels.hasMany(PembelianBarangModels, { foreignKey: "id_supplier" });
PembelianBarangModels.belongsTo(SupplierModels, { foreignKey: "id_supplier" });

BarangModels.hasMany(PembelianBarangModels, { foreignKey: "id_barang" });
PembelianBarangModels.belongsTo(BarangModels, { foreignKey: "id_barang" });

module.exports = PembelianBarangModels;
