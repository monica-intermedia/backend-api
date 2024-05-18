const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../../config/config");
const { v4: uuidv4 } = require("uuid");
const JabatanModels = require("../../models/pegawai/jabatan.models");

const PegawaiModels = db.define("pegawai", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  nip: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(50),
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
    type: DataTypes.BIGINT(15),
    allowNull: false,
  },
  jenisKelamin: {
    type: DataTypes.ENUM(["laki-laki", "perempuan"]),
    allowNull: false,
  },
  gaji: {
    type: DataTypes.BIGINT(10),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  id_jabatan: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: JabatanModels,
      key: "id",
    },
  },
});

PegawaiModels.beforeCreate((pegawai) => {
  pegawai.pegawaiId = uuidv4();
});

JabatanModels.hasMany(PegawaiModels, { onDelete: "cascade" });
PegawaiModels.belongsTo(JabatanModels, {
  foreignKey: "jabatanId",
});

module.exports = PegawaiModels;
