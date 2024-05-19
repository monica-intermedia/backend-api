const PelangganModels = require("../models/pelanggan.models");
const bcrypt = require("bcrypt");
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

const getPelangganById = async (req, res) => {
  const { id } = req.params;
  const data = await PelangganModels.findOne({ where: { id: id } });
  try {
    const isData = data
      ? handle200(req, res, data, "success get by id")
      : handle400(req, res, "invalid paramaters");

    return isData;
  } catch (error) {
    handle500(req, res, error);
  }
};

const createPelanggan = async (req, res) => {
  try {
    const { name, alamat, email, handphone, password, confPassword } = req.body;

    const existingUser = await PelangganModels.findAll({
      where: { email: email },
    });

    if (existingUser.length > 0) {
      return handle400(req, res, "email already available");
    }

    if (!confPassword == password) {
      console.log("password salah");
      alert("password salah");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const data = await PelangganModels.create({
      name: name,
      alamat: alamat,
      email: email,
      handphone: handphone,
      password: encryptedPassword,
    });

    return handle201(req, res, data, "pelanggan");
  } catch (error) {
    handle500(req, res, error);
  }
};

const editPelanggan = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, alamat, email, handphone, password, confPassword } = req.body;

    const updatePelanggan = await PelangganModels.findByPk(id);

    if (!updatePelanggan) {
      return handle400(req, res, "Position not found");
    }

    if (!confPassword == password) {
      console.log("password salah");
      alert("password salah");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    await updatePegawai.update({
      name: name,
      alamat: alamat,
      email: email,
      handphone: handphone,
      password: encryptedPassword,
    });

    return handle201(req, res, updatePegawai, "Success edit pegawai");
  } catch (error) {
    handle500(req, res, error);
  }
};

const deletePelanggan = async (req, res) => {
  try {
    const { id } = req.params;

    const dataPelanggan = await PelangganModels.findOne({
      where: { id: id },
    });

    console.log(dataPelanggan);

    if (dataPelanggan) {
      await dataPelanggan.destroy();
      return handle200(req, res, dataPelanggan, "delete");
    } else {
      return handle400(req, res, "dataPelanggan not found");
    }
  } catch (error) {
    handle500(req, res, error);
  }
};

module.exports = {
  getPelanggan,
  createPelanggan,
  editPelanggan,
  deletePelanggan,
  getPelangganById,
};
