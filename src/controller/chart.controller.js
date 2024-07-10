const { Op, fn, col } = require("sequelize");
const moment = require("moment");

const PegawaiModels = require("../models/pegawai.models");
const SupllierModels = require("../models/supplier.models");
const BarangModels = require("../models/barang.models");
const TransaksiModels = require("../models/data.transaksi.models");
const PenjualanLainyaModels = require("../models/penjualan.lainya.models");
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
    const today = moment().endOf("day").toDate(); // Get the end of today
    const oneWeekAgo = moment().subtract(6, "days").startOf("day").toDate(); // Get the start of 7 days ago

    // Fetch PenjualanLainya data
    const penjualanLainya = await PenjualanLainyaModels.findAll({
      where: {
        tanggal: {
          [Op.between]: [oneWeekAgo, today],
        },
      },
      attributes: [
        [fn("DATE", col("tanggal")), "date"],
        [fn("SUM", col("totalHarga")), "totalHarga"],
      ],
      group: [fn("DATE", col("tanggal"))],
      order: [[fn("DATE", col("tanggal")), "ASC"]],
    });

    // Fetch Transaksi data
    const transaksi = await TransaksiModels.findAll({
      where: {
        status: "success",
        createdAt: {
          [Op.between]: [oneWeekAgo, today],
        },
      },
      attributes: [
        [fn("DATE", col("createdAt")), "date"],
        [fn("SUM", col("gross_amount")), "gross_amount"],
      ],
      group: [fn("DATE", col("createdAt"))],
      order: [[fn("DATE", col("createdAt")), "ASC"]],
    });

    // Combine and sum data into a single gross_amount field
    const combinedData = {};

    penjualanLainya.forEach((entry) => {
      const date = entry.dataValues.date;
      combinedData[date] = {
        date,
        gross_amount: parseFloat(entry.dataValues.totalHarga) || 0,
      };
    });

    transaksi.forEach((entry) => {
      const date = entry.dataValues.date;
      if (combinedData[date]) {
        combinedData[date].gross_amount +=
          parseFloat(entry.dataValues.gross_amount) || 0;
      } else {
        combinedData[date] = {
          date,
          gross_amount: parseFloat(entry.dataValues.gross_amount) || 0,
        };
      }
    });

    // Convert combined data to an array
    const result = Object.values(combinedData);

    if (result.length === 0) {
      handle400(req, res, "fail get data");
    } else {
      handle200(req, res, result, "success get data");
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
