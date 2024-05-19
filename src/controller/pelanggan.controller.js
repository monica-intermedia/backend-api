const bcrypt = require("bcrypt");
const PelangganModels = require("../models/pelanggan.models");
const {
  handle200,
  handle201,
  handle400,
  handle500,
} = require("../utils/response");

const getPelanggan = async (req, res) => {
  const data = await PelangganModels.findAll();

  try {
    const isData = data
      ? handle200(req, res, data, "all")
      : handle400(req, res, "invalid paramaters");
    return isData;
  } catch (error) {
    handle500(req, res, error);
  }
};

const createPelanggan = async (req, res) => {
  try {
    const { name, alamat, email, handphone, password, confPassword } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);

    const existingUser = await Admin.findOne({
      where: {
        email: email,
      },
    });

    if (existingUser) return handle400(req, res, "email has been reggistered");

    const data = await PelangganModels.create({
      name,
      alamat,
      email,
      handphone,
      password: encryptedPassword,
      confPassword,
    });

    const isData =
      password !== confPassword
        ? handle400(req, res, "password not match")
        : handle201(req, res, data, "admin");

    return isData;
  } catch (error) {
    handle500(req, res, error);
  }
};

module.exports = { getPelanggan, createPelanggan };
