const { Op, fn, col } = require("sequelize");
const moment = require("moment");

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

const getChartDataSupplier = async (req, res) => {
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

const getChartDataBarang = async (req, res) => {
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

const getDataTransaksi = async (req, res) => {
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

const getPendapatanMingguan = async (req, res) => {
  try {
    const today = moment().startOf("day"); // Get the start of today
    const oneWeekAgo = moment().subtract(6, "days").startOf("day"); // Get the start of 7 days ago

    const getTransaksiWeeks = await TransaksiModels.findAll({
      where: {
        status: "success",
        createdAt: {
          [Op.between]: [oneWeekAgo.toDate(), today.toDate()],
        },
      },
      attributes: [
        [fn("DATE", col("createdAt")), "date"],
        [fn("SUM", col("gross_amount")), "gross_amount"],
      ],
      group: [fn("DATE", col("createdAt"))],
      order: [[fn("DATE", col("createdAt")), "ASC"]],
    });

    if (getTransaksiWeeks.length === 0) {
      handle400(req, res, "fail get data");
    } else {
      handle200(req, res, getTransaksiWeeks, "success get data");
    }
  } catch (error) {
    console.error(error);
    handle500(req, res, "internal server error");
  }
};

const getTransaksiHariIni = async (req, res) => {
  try {
    const today = moment().startOf("day").toDate(); // Get the start of today
    const endOfToday = moment().endOf("day").toDate(); // Get the end of today

    const getTransaksiToday = await TransaksiModels.findAll({
      where: {
        status: "success",
        createdAt: {
          [Op.between]: [today, endOfToday],
        },
      },
      attributes: [[fn("DATE", col("createdAt")), "date"], "namaKoran"],
      group: [fn("DATE", col("createdAt"))],
      order: [[fn("DATE", col("createdAt")), "ASC"]],
    });

    if (getTransaksiToday.length === 0) {
      handle400(req, res, "fail get data");
    } else {
      handle200(req, res, getTransaksiToday, "success get data");
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
  getPendapatanMingguan,
  getTransaksiHariIni,
};
