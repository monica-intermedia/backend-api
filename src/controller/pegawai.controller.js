const PegawaiModels = require("../models/pegawai.models");
const bcrypt = require("bcrypt");
const {
  handle200,
  handle201,
  handle400,
  handle500,
} = require("../utils/response");

const getPegawai = async (req, res) => {
  const data = await PegawaiModels.findAll();

  try {
    const isData = data
      ? handle200(req, res, data, "all")
      : handle400(req, res, "invalid paramaters");

    return isData;
  } catch (error) {
    handle500(req, res, error);
  }
};

const getPegawaiById = async (req, res) => {
  const { id } = req.params;
  const data = await PegawaiModels.findOne({ where: { id: id } });
  try {
    const isData = data
      ? handle200(req, res, data, "success get by id")
      : handle400(req, res, "invalid paramaters");

    return isData;
  } catch (error) {
    handle500(req, res, error);
  }
};

const createPegawai = async (req, res) => {
  try {
    const {
      nip,
      name,
      alamat,
      email,
      handphone,
      jenisKelamin,
      gaji,
      id_jabatan,
      password,
      confPassword,
    } = req.body;

    const existingUser = await PegawaiModels.findAll({
      where: { email: email },
    });

    if (existingUser.length > 0) {
      return handle400(req, res, "Position already available");
    }

    if (!confPassword == password) {
      console.log("password salah");
      alert("password salah");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const data = await PegawaiModels.create({
      nip: nip,
      name: name,
      alamat: alamat,
      email: email,
      handphone: handphone,
      jenisKelamin: jenisKelamin,
      gaji: gaji,
      id_jabatan: id_jabatan,
      password: encryptedPassword,
    });

    return handle201(req, res, data, "jabatan");
  } catch (error) {
    handle500(req, res, error);
  }
};

const editPegawai = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nip,
      name,
      alamat,
      email,
      handphone,
      jenisKelamin,
      gaji,
      id_jabatan,
      password,
      confPassword,
    } = req.body;

    const updateJabatan = await PegawaiModels.findByPk(id);

    if (!updateJabatan) {
      return handle400(req, res, "Position not found");
    }

    if (!confPassword == password) {
      console.log("password salah");
      alert("password salah");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    await updatePegawai.update({
      nip: nip,
      name: name,
      alamat: alamat,
      email: email,
      handphone: handphone,
      jenisKelamin: jenisKelamin,
      gaji: gaji,
      id_jabatan: id_jabatan,
      password: encryptedPassword,
    });

    return handle201(req, res, updatePegawai, "Success edit pegawai");
  } catch (error) {
    handle500(req, res, error);
  }
};

const deletePegawai = async (req, res) => {
  try {
    const { id } = req.params;

    const position = await PegawaiModels.findOne({
      where: { id: id },
    });

    console.log(position);

    if (position) {
      await position.destroy();
      return handle200(req, res, position, "delete");
    } else {
      return handle400(req, res, "Position not found");
    }
  } catch (error) {
    handle500(req, res, error);
  }
};

module.exports = {
  getPegawai,
  createPegawai,
  editPegawai,
  deletePegawai,
  getPegawaiById,
};
