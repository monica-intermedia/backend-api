const BarangModels = require("../models/barang.models");
const { Op } = require("sequelize");
const {
  handle200,
  handle201,
  handle400,
  handle500,
} = require("../utils/response");

const getBarang = async (req, res) => {
  const data = await BarangModels.findAll();

  try {
    const isData = data
      ? handle200(req, res, data, "all")
      : handle400(req, res, "invalid paramaters");

    return isData;
  } catch (error) {
    handle500(req, res, error);
  }
};

const getBarangById = async (req, res) => {
  const { id } = req.params;
  const data = await BarangModels.findOne({ where: { id: id } });
  try {
    const isData = data
      ? handle200(req, res, data, "all")
      : handle400(req, res, "invalid paramaters");

    return isData;
  } catch (error) {
    handle500(req, res, error);
  }
};

const getBarangByName = async (req, res) => {
  try {
    const { namaBarang } = req.body;
    const data = await BarangModels.findAll({
      where: { namaBarang: namaBarang },
    });

    const isData = data
      ? handle200(req, res, data, "success get Barang")
      : handle400(req, res, "invalid parameters");

    return isData;
  } catch (error) {
    handle500(req, res, error);
  }
};

const createBarang = async (req, res) => {
  try {
    const { kodeBarang, namaBarang, harga, stok } = req.body;

    const check = await BarangModels.findAll({
      where: {
        [Op.or]: [{ namaBarang: namaBarang }, { kodeBarang: kodeBarang }],
      },
    });

    if (check.length > 0) {
      return handle400(req, res, "barang already available");
    }

    const data = await BarangModels.create({
      namaBarang: namaBarang,
      kodeBarang: kodeBarang,
      harga: harga,
      stok: stok,
    });

    return handle201(req, res, data, "Barang");
  } catch (error) {
    handle500(req, res, error);
  }
};

const editBarang = async (req, res) => {
  try {
    const { id } = req.params;
    const { namaBarang, kodeBarang, harga, stok } = req.body;

    const updateBarang = await BarangModels.findByPk(id);

    if (!updateBarang) {
      return handle400(req, res, "Position not found");
    }

    await updateBarang.update({
      namaBarang: namaBarang,
      kodeBarang: kodeBarang,
      harga: harga,
      stok: stok,
    });

    return handle201(req, res, updateBarang, "Success edit Barang");
  } catch (error) {
    handle500(req, res, error);
  }
};

const deleteBarang = async (req, res) => {
  try {
    const { id } = req.params;

    const position = await BarangModels.findOne({
      where: { id: id },
    });

    console.log(position);

    if (position) {
      await position.destroy();
      return handle200(req, res, position, "delete");
    } else {
      return handle400(req, res, "barang not found");
    }
  } catch (error) {
    handle500(req, res, error);
  }
};

module.exports = {
  getBarang,
  createBarang,
  editBarang,
  deleteBarang,
  getBarangByName,
  getBarangById,
};
