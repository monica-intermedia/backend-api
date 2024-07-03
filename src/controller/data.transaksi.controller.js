const midtransClient = require("midtrans-client");
const { nanoid } = require("nanoid");
const {
  handle200,
  handle201,
  handle400,
  handle500,
} = require("../utils/response");
const DataTransaksiModels = require("../models/data.transaksi.models");

let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.SERVER_KEY,
});

const getTransaksi = async (req, res) => {
  try {
    const data = await DataTransaksiModels.findAll({
      where: { isValid: false },
    });
    return data
      ? handle200(req, res, data, "all")
      : handle400(req, res, "invalid parameters");
  } catch (error) {
    handle500(req, res, error);
  }
};

const getDataTransaksi = async (req, res) => {
  try {
    const data = await DataTransaksiModels.findAll({
      where: { isValid: true },
    });
    return data
      ? handle200(req, res, data, "all")
      : handle400(req, res, "invalid parameters");
  } catch (error) {
    handle500(req, res, error);
  }
};

const getTransaksiById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await DataTransaksiModels.findOne({ where: { id: id } });
    return data
      ? handle200(req, res, data, "all")
      : handle400(req, res, "invalid parameters");
  } catch (error) {
    handle500(req, res, error);
  }
};

const getTransaksiByName = async (req, res) => {
  try {
    const { namaTransaksi } = req.body;
    const data = await DataTransaksiModels.findAll({
      where: { namaKoran: namaTransaksi },
    });
    return data
      ? handle200(req, res, data, "success get Transaksi")
      : handle400(req, res, "invalid parameters");
  } catch (error) {
    handle500(req, res, error);
  }
};

const getTransaksiByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    console.log("Received email:", email);

    if (!email) {
      return handle400(req, res, "Email parameter is missing");
    }

    const data = await DataTransaksiModels.findAll({ where: { email: email } });

    if (data && data.length > 0) {
      return handle200(req, res, data, "Success get transactions by email");
    } else {
      return handle400(
        req,
        res,
        "No transactions found for the provided email"
      );
    }
  } catch (error) {
    return handle500(req, res, error);
  }
};

const createTransaksi = async (req, res) => {
  try {
    const {
      namaKoran,
      keterangan,
      email,
      eksemplar,
      jumlahHalaman,
      jumlahWarna,
      harga,
      tanggal,
      grossamount,
      jumlahPlate,
      phone,
      status,
      isValid,
    } = req.body;

    const order_id = `TRX-${nanoid(4)}-${nanoid(8)}`;

    const transactionDetails = {
      transaction_details: {
        order_id: order_id,
        gross_amount: grossamount,
      },
      customer_details: {
        email,
        phone,
      },
      item_details: [
        {
          price: harga,
          quantity: eksemplar,
          name: namaKoran,
          keterangan,
          jumlahHalaman,
          jumlahWarna,
          tanggal,
          status,
          jumlahPlate,
          isValid,
        },
      ],
    };

    await DataTransaksiModels.create({
      order_id: transactionDetails.transaction_details.order_id,
      gross_amount: transactionDetails.transaction_details.gross_amount,
      namaKoran,
      keterangan,
      eksemplar,
      jumlahHalaman,
      jumlahWarna,
      harga,
      tanggal,
      status,
      jumlahPlate,
      isValid,
      email,
      phone,
    });

    const transaction = await snap.createTransaction(transactionDetails);
    res.status(201).json(transaction);
    console.log(transaction);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const editTransaksi = async (req, res) => {
  try {
    const { id } = req.params;
    const {
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
      return handle400(req, res, "Transaksi not found");
    }

    await updateTransaksi.update({
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
  getTransaksiByEmail,
};
