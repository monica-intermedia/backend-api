const SupplierModels = require("../models/supplier.models");
const bcrypt = require("bcrypt");
const {
  handle200,
  handle201,
  handle400,
  handle500,
} = require("../utils/response");

const getSupplier = async (req, res) => {
  const data = await SupplierModels.findAll();

  try {
    const isData = data
      ? handle200(req, res, data, "all")
      : handle400(req, res, "invalid paramaters");

    return isData;
  } catch (error) {
    handle500(req, res, error);
  }
};

const getSupplierById = async (req, res) => {
  const { id } = req.params;
  const data = await SupplierModels.findOne({ where: { id: id } });
  try {
    const isData = data
      ? handle200(req, res, data, "success get by id")
      : handle400(req, res, "invalid paramaters");

    return isData;
  } catch (error) {
    handle500(req, res, error);
  }
};

const createSupplier = async (req, res) => {
  try {
    const { name, alamat, email, handphone, password, confPassword } = req.body;

    const existingUser = await SupplierModels.findAll({
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

    const data = await SupplierModels.create({
      name: name,
      alamat: alamat,
      email: email,
      handphone: handphone,
      password: encryptedPassword,
    });

    return handle201(req, res, data, "Supplier");
  } catch (error) {
    handle500(req, res, error);
  }
};

const editSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, alamat, email, handphone, password, confPassword } = req.body;

    const updateSupplier = await SupplierModels.findByPk(id);

    if (!updateSupplier) {
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

const deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;

    const dataSupplier = await SupplierModels.findOne({
      where: { id: id },
    });

    console.log(dataSupplier);

    if (dataSupplier) {
      await dataSupplier.destroy();
      return handle200(req, res, dataSupplier, "delete");
    } else {
      return handle400(req, res, "dataSupplier not found");
    }
  } catch (error) {
    handle500(req, res, error);
  }
};

module.exports = {
  getSupplier,
  createSupplier,
  editSupplier,
  deleteSupplier,
  getSupplierById,
};
