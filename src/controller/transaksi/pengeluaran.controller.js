const Pengeluaran = require("../../models/transaksi/pengeluaran.models");
const TypePengeluaran = require("../../models/transaksi/typePengeluaran.model");
const {
  handle200,
  handle201,
  handle400,
  handle500,
} = require("../../utils/response");

const getPengeluaran = async (req, res) => {
  const data = await Pengeluaran.findAll({
    include: [
      {
        model: TypePengeluaran,
        attributes: ["jenisPengeluaran"],
      },
    ],
  });

  try {
    const isData = data
      ? handle200(req, res, data, "all")
      : handle400(req, res, "invalid paramaters");

    return isData;
  } catch (error) {
    handle500(req, res, error);
  }
};

const createPengeluaran = async (req, res) => {
  try {
    const { pengeluaran, tanggal, jumlah } = req.body;

    const data = await Pengeluaran.create({
      pengeluaran,
      tanggal,
      jumlah,
    });

    const isData = data
      ? handle201(req, res, data, "karyawan")
      : handle400(req, res, "fail get karyawan data");

    return isData;
  } catch (error) {
    handle500(req, res, error);
  }
};

const deletePengeluaran = async (req, res) => {
  try {
    const { pengeluaranId } = req.params;
    const data = await Pengeluaran({
      where: {
        pengeluaranId: pengeluaranId,
      },
    });
    if (data) {
      Pengeluaran.destroy({ where: { pengeluaranId: pengeluaranId } });
      return handle200(req, res, data, "delete");
    }
    return handle400(req, res, "fail");
  } catch (error) {
    return handle500(req, res, error);
  }
};

module.exports = {
  getPengeluaran,
  createPengeluaran,
  deletePengeluaran,
};
