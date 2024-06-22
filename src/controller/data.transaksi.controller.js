const { Op, fn, col } = require("sequelize");
const {
  handle200,
  handle201,
  handle400,
  handle500,
} = require("../utils/response");
const DataTransaksiModels = require("../models/data.transaksi.models");
const PembelianBarangModels = require("../models/pembelian.barang.models");
const PembelianLainyaModels = require("../models/pembelian.lainya.models");

const getTransaksi = async (req, res) => {
  const data = await DataTransaksiModels.findAll({ where: { isValid: false } });

  try {
    const isData = data
      ? handle200(req, res, data, "all")
      : handle400(req, res, "invalid paramaters");

    return isData;
  } catch (error) {
    handle500(req, res, error);
  }
};

const getTransaksiByDate = async (req, res) => {
  try {
    // Query to find all transactions and group by date, including sums from PembelianBarangModels and PembelianLainyaModels
    const data = await DataTransaksiModels.findAll({
      attributes: [
        [fn("DATE", col("tanggal")), "date"],
        [fn("COUNT", col("id")), "transactionCount"],
        [fn("SUM", col("totalHarga")), "totalAmount"],
      ],
      group: [fn("DATE", col("tanggal"))],
      order: [[fn("DATE", col("tanggal")), "ASC"]],
    });

    // Fetch additional data from PembelianBarangModels and PembelianLainyaModels
    const pembelianBarangData = await PembelianBarangModels.findAll({
      attributes: [
        [fn("DATE", col("tanggal")), "date"],
        [fn("SUM", col("totalHarga")), "totalBarangAmount"],
      ],
      group: [fn("DATE", col("tanggal"))],
    });

    const pembelianLainyaData = await PembelianLainyaModels.findAll({
      attributes: [
        [fn("DATE", col("tanggal")), "date"],
        [fn("SUM", col("totalHarga")), "totalLainyaAmount"],
      ],
      group: [fn("DATE", col("tanggal"))],
    });

    // Aggregate data by date
    const aggregatedData = {};

    data.forEach((item) => {
      const date = item.get("date");
      aggregatedData[date] = {
        date: date,
        transactionCount: item.get("transactionCount"),
        totalAmount: parseFloat(item.get("totalAmount")),
      };
    });

    pembelianBarangData.forEach((item) => {
      const date = item.get("date");
      if (!aggregatedData[date]) {
        aggregatedData[date] = {
          date: date,
          transactionCount: 0,
          totalAmount: 0,
        };
      }
      aggregatedData[date].totalAmount += parseFloat(
        item.get("totalBarangAmount")
      );
    });

    pembelianLainyaData.forEach((item) => {
      const date = item.get("date");
      if (!aggregatedData[date]) {
        aggregatedData[date] = {
          date: date,
          transactionCount: 0,
          totalAmount: 0,
        };
      }
      aggregatedData[date].totalAmount += parseFloat(
        item.get("totalLainyaAmount")
      );
    });

    const result = Object.values(aggregatedData).sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    // Send response with aggregated data
    if (result && result.length > 0) {
      return handle200(req, res, result, "transactions by date");
    } else {
      return handle400(req, res, "No transactions found");
    }
  } catch (error) {
    handle500(req, res, error);
  }
};

const getDataTransaksi = async (req, res) => {
  const data = await DataTransaksiModels.findAll({ where: { isValid: true } });

  try {
    const isData = data
      ? handle200(req, res, data, "all")
      : handle400(req, res, "invalid paramaters");

    return isData;
  } catch (error) {
    handle500(req, res, error);
  }
};

const getTransaksiById = async (req, res) => {
  const { id } = req.params;
  const data = await DataTransaksiModels.findOne({ where: { id: id } });
  try {
    const isData = data
      ? handle200(req, res, data, "all")
      : handle400(req, res, "invalid paramaters");

    return isData;
  } catch (error) {
    handle500(req, res, error);
  }
};

const getTransaksiByName = async (req, res) => {
  try {
    const { namaTransaksi } = req.body;
    const data = await DataTransaksiModels.findAll({
      where: { namaTransaksi: namaTransaksi },
    });

    const isData = data
      ? handle200(req, res, data, "success get Transaksi")
      : handle400(req, res, "invalid parameters");

    return isData;
  } catch (error) {
    handle500(req, res, error);
  }
};

const createTransaksi = async (req, res) => {
  try {
    const {
      // id_pelanggan,
      noTransaksi,
      namaKoran,
      keterangan,
      eksemplar,
      jumlahHalaman,
      jumlahWarna,
      harga,
      totalHarga,
      tanggal,
      status,
      jumlahPlate,
      isValid,
    } = req.body;

    const data = await DataTransaksiModels.create({
      // id_pelanggan: id_pelanggan,
      namaKoran: namaKoran,
      keterangan: keterangan,
      noTransaksi: noTransaksi,
      eksemplar: eksemplar,
      jumlahHalaman: jumlahHalaman,
      jumlahWarna: jumlahWarna,
      harga: harga,
      tanggal: tanggal,
      totalHarga: totalHarga,
      jumlahPlate: jumlahPlate,
      status: status,
      isValid: isValid,
    });

    return handle201(req, res, data, "Transaksi");
  } catch (error) {
    handle500(req, res, error);
  }
};

const editTransaksi = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      // id_pelanggan,
      namaKoran,
      keterangan,
      noTransaksi,
      eksemplar,
      jumlahHalaman,
      jumlahWarna,
      harga,
      tanggal,
      totalHarga,
      jumlahPlate,
      status,
      isValid,
    } = req.body;

    const updateTransaksi = await DataTransaksiModels.findByPk(id);

    if (!updateTransaksi) {
      return handle400(req, res, "Position not found");
    }

    await updateTransaksi.update({
      // id_pelanggan: id_pelanggan,
      namaKoran: namaKoran,
      keterangan: keterangan,
      noTransaksi: noTransaksi,
      eksemplar: eksemplar,
      jumlahHalaman: jumlahHalaman,
      jumlahWarna: jumlahWarna,
      harga: harga,
      tanggal: tanggal,
      totalHarga: totalHarga,
      jumlahPlate: jumlahPlate,
      status: status,
      isValid: isValid,
    });

    return handle201(req, res, updateTransaksi, "Success edit Transaksi");
  } catch (error) {
    handle500(req, res, error);
  }
};

const deleteTransaksi = async (req, res) => {
  try {
    const { id } = req.params;

    const position = await DataTransaksiModels.findOne({
      where: { id: id },
    });

    console.log(position);

    if (position) {
      await position.destroy();
      return handle200(req, res, position, "delete");
    } else {
      return handle400(req, res, "Transaksi not found");
    }
  } catch (error) {
    handle500(req, res, error);
  }
};

module.exports = {
  getDataTransaksi,
  createTransaksi,
  editTransaksi,
  deleteTransaksi,
  getTransaksiByName,
  getTransaksiById,
  getTransaksi,
  getTransaksiByDate,
};
