const PegawaiModels = require("../models/pegawai.models");
const SupllierModels = require("../models/supplier.models");
const BarangModels = require("../models/barang.models");
const TransaksiModels = require("../models/data.transaksi.models");
const { handle200, handle400, handle500 } = require("../utils/response");

const getChartDataPegawai = async (req, res) => {
  try {
    const count = await PegawaiModels.count();

    if (count === 0) {
      handle400(req, res, "fail get data");
    } else {
      handle200(req, res, count, "success get data");
    }
  } catch (error) {
    console.error(error);
    handle500(req, res, "internal server error");
  }
};

const getChartDataSupplier = async (res) => {
  try {
    const count = await SupllierModels.count();

    if (count === 0) {
      handle400(req, res, "fail get data");
    } else {
      handle200(req, res, count, "success get data");
    }
  } catch (error) {
    console.error(error);
    handle500(req, res, "internal server error");
  }
};

const getChartDataBarang = async (res) => {
  try {
    const count = await BarangModels.count();

    if (count === 0) {
      handle400(req, res, "fail get data");
    } else {
      handle200(req, res, count, "success get data");
    }
  } catch (error) {
    console.error(error);
    handle500(req, res, "internal server error");
  }
};

const getDataTransaksi = async (res) => {
  try {
    const count = await TransaksiModels.count({
      where: {
        status: "success",
      },
    });

    if (count === 0) {
      handle400(req, res, "fail get data");
    } else {
      handle200(req, res, count, "success get data");
    }
  } catch (error) {
    console.error(error);
    handle500(req, res, "internal server error");
  }
};

module.exports = {
  getChartDataPegawai,
  getChartDataSupplier,
  getChartDataBarang,
  getDataTransaksi,
};
