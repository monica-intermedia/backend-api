const db = require("../../config/config");
const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;
const { v4: uuidv4 } = require("uuid");

const SupplierModels = db.define("supplier", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  namaSupplier: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  alamat: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(70),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
    set(value) {
      this.setDataValue("email", value.toLoweCase());
    },
  },
  handphone: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

SupplierModels.beforeCreate((supplier) => {
  supplier.id = `${uuidv4}`;
});

module.exports = SupplierModels;
