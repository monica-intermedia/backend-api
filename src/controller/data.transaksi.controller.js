const DataTransaksiModels = require("../models/data.transaksi.models");
const { Op } = require("sequelize");
const {
  handle200,
  handle201,
  handle400,
  handle500,
} = require("../utils/response");

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
};
