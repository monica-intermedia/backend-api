const {
  handle200,
  handle201,
  handle400,
  handle500,
} = require("../utils/response");
const PembelianLainyaModels = require("../models/pembelian.lainya.models");

const getAllOtherBuy = async (req, res) => {
  try {
    const data = await PembelianLainyaModels.findAll();

    if (data.length <= 0) {
      handle200(req, res, "none of data", "all");
    } else {
      const isData = data
        ? handle200(req, res, data, "all")
        : handle400(req, res, "invalid parameters");
      return isData;
    }
  } catch (error) {
    console.error("server error message : " + error);
    handle500(req, res, error);
  }
};

const getAllOtherBuyById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await PembelianLainyaModels.findByPk({ where: id });

    if (data.length <= 0) {
      handle200(req, res, "none of data", "all");
    } else {
      const isData = data
        ? handle200(req, res, data, "all")
        : handle400(req, res, "invalid parameters");
      return isData;
    }
  } catch (error) {
    console.error("server error message : " + error);
    handle500(req, res, error);
  }
};

const createOtherBuyData = async (req, res) => {
  try {
    const {
      nomorFaktur,
      jenisPembelian,
      qty,
      totalHarga,
      tanggal,
      keterangan,
    } = req.body;
    const data = await PembelianLainyaModels.create({
      nomorFaktur,
      jenisPembelian,
      qty,
      totalHarga,
      tanggal,
      keterangan,
    });

    if (
      !nomorFaktur ||
      !qty ||
      !totalHarga ||
      !tanggal ||
      !jenisPembelian ||
      !keterangan
    ) {
      console.log("must input paramaeters");
    }

    const isData = data
      ? handle201(req, res, data, "success create data")
      : handle400(req, res, "invalid parameters");
    return isData;
  } catch (error) {
    console.error("server error message : " + error);
    handle500(req, res, error);
  }
};

const updateOtherBuyData = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nomorFaktur,
      jenisPembelian,
      qty,
      totalHarga,
      tanggal,
      keterangan,
    } = req.body;

    if (!nomorFaktur || !qty || !totalHarga || !tanggal) {
      console.log("must input parameters");
      return handle400(
        req,
        res,
        "All fields are required: nomorFaktur, qty, totalHarga, tanggal"
      );
    }

    const [updated] = await PembelianLainyaModels.update(
      {
        nomorFaktur,
        jenisPembelian,
        qty,
        totalHarga,
        tanggal,
        keterangan,
      },
      {
        where: { id },
      }
    );

    if (updated) {
      const updatedData = await PembelianLainyaModels.findOne({
        where: { id },
      });
      return handle201(req, res, updatedData, "Successfully updated data");
    }

    return handle400(req, res, "Invalid parameters or data not found");
  } catch (error) {
    console.error("server error message : " + error);
    return handle500(req, res, error);
  }
};

const deleteOtherBuyData = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await PembelianLainyaModels.findByPk(id);

    if (data) {
      await data.destroy();
      return handle200(req, res, "Data deleted successfully");
    } else {
      return handle400(req, res, "ID not found");
    }
  } catch (error) {
    console.error("server error message : " + error);
    return handle500(req, res, error);
  }
};

module.exports = {
  getAllOtherBuy,
  getAllOtherBuyById,
  createOtherBuyData,
  updateOtherBuyData,
  createOtherBuyData,
  deleteOtherBuyData,
};
