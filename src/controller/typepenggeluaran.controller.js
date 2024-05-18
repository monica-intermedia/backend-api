const { where } = require("sequelize");
const TypePengeluaran = require("../models/typePengeluaran.model");
const {
  handle200,
  handle201,
  handle400,
  handle500,
} = require("../utils/response");

// tipe pengeluaran
const getAllPengeluranByTipe = async (req, res) => {
  try {
    const data = await TypePengeluaran.findAll();

    const isData = data
      ? handle200(req, res, data, "all")
      : handle400(req, res, "invalid parameters");

    return isData;
  } catch (error) {
    return handle500(req, res, error);
  }
};

const getPengeluaranByTipe = async (req, res) => {
  try {
    const { typePengeluaranId } = req.params;

    const data = await TypePengeluaran.findAll({
      where: { typePengeluaranId: typePengeluaranId },
    });

    const isData =
      data.length > 0
        ? handle200(req, res, data, "all")
        : handle400(req, res, "invalid parameters");

    return isData;
  } catch (error) {
    handle500(req, res, error);
  }
};

const createTypePengeluaran = async (req, res) => {
  try {
    const { jenisPengeluaran } = req.body;

    const data = await TypePengeluaran.create({
      jenisPengeluaran,
    });

    console.log(data);

    const isData = data
      ? handle201(req, res, data, "karyawan")
      : handle400(req, res, "fail get karyawan data");

    return isData;
  } catch (error) {
    handle500(req, res, error);
  }
};

const editTypePengeluaran = async (req, res) => {
  const { typePengeluaranId, jenisPengeluaran } = req.body;

  const data = await TypePengeluaran.update(
    {
      jenisPengeluaran: jenisPengeluaran,
    },
    {
      where: { typePengeluaranId: typePengeluaranId },
    }
  );

  if (data) {
    return handle201(req, res);
  }
};

const deleteTypePengeluaran = async (req, res) => {
  try {
    const { typePengeluaranId } = req.params;

    const data = await TypePengeluaran.findOne({
      where: { typePengeluaranId: typePengeluaranId },
    });

    if (data) {
      TypePengeluaran.destroy({
        where: { typePengeluaranId: typePengeluaranId },
      });
      return handle200(req, res, data, "delete");
    }
    return handle400(req, res, "fail delete");
  } catch (error) {
    handle500(req, res, error);
  }
};

module.exports = {
  createTypePengeluaran,
  getPengeluaranByTipe,
  deleteTypePengeluaran,
  getAllPengeluranByTipe,
  editTypePengeluaran,
};
