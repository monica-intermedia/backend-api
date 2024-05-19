const db = require("../config/config");
const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;
const { v4: uuidv4 } = require("uuid");

const PelangganModels = db.define("pelanggan", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUID,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  alamat: {
    type: DataTypes.STRING(150),
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
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
});

PelangganModels.beforeCreate((pelanggan) => {
  pelanggan.id = `${uuidv4}`;
});

module.exports = PelangganModels;
