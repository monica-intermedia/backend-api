const PenjualanLainyaModels = require("../models/penjualan.lainya.models");
const {
  handle200,
  handle201,
  handle400,
  handle500,
} = require("../utils/response");

const getAllOtherSell = async (req, res) => {
  try {
    const data = await PenjualanLainyaModels.findAll();

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

const getAllOtherSellById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await PenjualanLainyaModels.findByPk({ where: id });

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

const createOtherSellData = async (req, res) => {
  try {
    const { kodePenjualan, namaPenjualan, totalHarga, keterangan, tanggal } =
      req.body;
    const data = await PenjualanLainyaModels.create({
      kodePenjualan,
      namaPenjualan,
      totalHarga,
      keterangan,
      tanggal,
    });

    if (
      !kodePenjualan ||
      !totalHarga ||
      !namaPenjualan ||
      !keterangan ||
      !tanggal
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

const updateOtherSellData = async (req, res) => {
  try {
    const { id } = req.params;
    const { kodePenjualan, namaPenjualan, totalHarga, keterangan, tanggal } =
      req.body;

    if (!kodePenjualan || !totalHarga) {
      console.log("must input parameters");
      return handle400(
        req,
        res,
        "All fields are required: kodePenjualan, qty, totalHarga, tanggal"
      );
    }

    const [updated] = await PenjualanLainyaModels.update(
      {
        kodePenjualan,
        namaPenjualan,
        totalHarga,
        keterangan,
        tanggal,
      },
      {
        where: { id },
      }
    );

    if (updated) {
      const updatedData = await PenjualanLainyaModels.findOne({
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

const deleteOtherSellData = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await PenjualanLainyaModels.findByPk(id);

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
  getAllOtherSell,
  getAllOtherSellById,
  createOtherSellData,
  updateOtherSellData,
  createOtherSellData,
  deleteOtherSellData,
};
