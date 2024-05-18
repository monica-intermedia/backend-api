const db = require("../../config/config");
const { Sequelize } = require("sequelize");
const { Datatypes } = Sequelize;
const { v4: uuidv4 } = require("uuid");

const PelangganModels = db.define("pelanggan", {
  id: {
    type: Datatypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUID,
  },
  name: {
    type: Datatypes.STRING(100),
    allowNull: false,
  },
  alamat: {
    type: Datatypes.STRING(150),
    allowNull: false,
  },
  email: {
    type: Datatypes.STRING(70),
    allowNull: false,
    unique: true,
  },
  handphone: {
    type: Datatypes.STRING(15),
    allowNull: false,
  },
});

Supplier.beforeCreate((supplier) => {
  supplier.supplierId = `${uuidv4}`;
});

module.exports = PelangganModels;
