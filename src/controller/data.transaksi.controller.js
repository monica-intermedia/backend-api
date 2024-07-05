const midtransClient = require("midtrans-client");
const { nanoid } = require("nanoid");
const {
  handle200,
  handle201,
  handle400,
  handle500,
} = require("../utils/response");
const DataTransaksiModels = require("../models/data.transaksi.models");
const coreApi = require("../middleware/midtrans");

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
      isValid,
    } = req.body;

    const order_id = `TRX-${nanoid(4)}-${nanoid(8)}`;

    const transactionDetails = {
      transaction_details: {
        order_id: order_id,
        gross_amount: grossamount,
      },
      customer_details: {
        email: email,
        phone: phone,
      },
      item_details: [
        {
          id: order_id,
          price: harga,
          quantity: eksemplar,
          name: namaKoran,
          category: keterangan,
        },
      ],
      credit_card: {
        secure: true,
      },
    };

    console.log(transactionDetails);

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
      status: "pending",
      jumlahPlate,
      isValid,
      email,
      phone,
    });

    const transaction = await snap.createTransaction(transactionDetails);

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const notification = async (req, res) => {
  try {
    const notification = req.body;

    let statusResponse = await coreApi.transaction.notification(notification);

    let orderId = statusResponse.order_id;
    let status = statusResponse.transaction_status;
    let fraudStatus = statusResponse.fraud_status;

    if (status == "capture") {
      if (fraudStatus == "accept") {
        await DataTransaksiModels.update(
          { status: "success" },
          { where: { order_id: orderId } }
        );
      } else if (fraudStatus == "challenge") {
        await DataTransaksiModels.update(
          { status: "challenge" },
          { where: { order_id: orderId } }
        );
      } else {
        await DataTransaksiModels.update(
          { status: "fraud" },
          { where: { order_id: orderId } }
        );
      }
    } else if (status == "settlement") {
      await DataTransaksiModels.update(
        { status: "settlement" },
        { where: { order_id: orderId } }
      );
    } else if (status == "deny") {
      await DataTransaksiModels.update(
        { status: "deny" },
        { where: { order_id: orderId } }
      );
    } else if (status == "cancel" || status == "expire") {
      await DataTransaksiModels.update(
        { status: "cancelled" },
        { where: { order_id: orderId } }
      );
    } else if (status == "pending") {
      await DataTransaksiModels.update(
        { status: "pending" },
        { where: { order_id: orderId } }
      );
    }

    res.status(200).json({ message: "Notification processed" });
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
  notification,
};
