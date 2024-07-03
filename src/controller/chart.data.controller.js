const { Op, fn, col, where } = require("sequelize");
const { handle200, handle400, handle500 } = require("../utils/response");
const GajiKaryawanModels = require("../models/gaji.karyaan.models");
const PembelianBarangModels = require("../models/pembelian.barang.models");
const PembelianLainyaModels = require("../models/pembelian.lainya.models");

const aggregateData = (sourceData, keyName) => {
  const aggregatedData = {};
  sourceData.forEach((item) => {
    const date = item.get("date");
    if (!aggregatedData[date]) {
      aggregatedData[date] = {
        date: date,
        jumlahGajiAmount: 0,
        totalBarangAmount: 0,
        totalLainyaAmount: 0,
      };
    }
    aggregatedData[date][keyName] += parseFloat(item.get(keyName));
  });
  return aggregatedData;
};

const getKasKeluar = async (req, res) => {
  const { month } = req.query;

  try {
    const gajiKaryawanData = await GajiKaryawanModels.findAll({
      attributes: [
        [fn("DATE", col("tanggal")), "date"],
        [fn("SUM", col("jumlahGaji")), "jumlahGajiAmount"],
      ],
      where: where(fn("MONTH", col("tanggal")), Op.eq, month),
      group: [fn("DATE", col("tanggal"))],
    });

    const pembelianBarangData = await PembelianBarangModels.findAll({
      attributes: [
        [fn("DATE", col("tanggal")), "date"],
        [fn("SUM", col("totalHarga")), "totalBarangAmount"],
      ],
      where: where(fn("MONTH", col("tanggal")), Op.eq, month),
      group: [fn("DATE", col("tanggal"))],
    });

    const pembelianLainyaData = await PembelianLainyaModels.findAll({
      attributes: [
        [fn("DATE", col("tanggal")), "date"],
        [fn("SUM", col("totalHarga")), "totalLainyaAmount"],
      ],
      where: where(fn("MONTH", col("tanggal")), Op.eq, month),
      group: [fn("DATE", col("tanggal"))],
    });

    // Aggregate data
    let aggregatedData = aggregateData(gajiKaryawanData, "jumlahGajiAmount");
    aggregatedData = {
      ...aggregatedData,
      ...aggregateData(pembelianBarangData, "totalBarangAmount"),
      ...aggregateData(pembelianLainyaData, "totalLainyaAmount"),
    };

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

module.exports = { getKasKeluar };
