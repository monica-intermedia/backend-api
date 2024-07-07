const midtransClient = require("midtrans-client");
const { nanoid } = require("nanoid");
const jwt = require("jsonwebtoken");
const {
  handle200,
  handle201,
  handle400,
  handle500,
} = require("../utils/response");
const DataTransaksiModels = require("../models/data.transaksi.models");
const KoranModels = require("../models/koran.models");

let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.SERVER_KEY,
});

const coreApi = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: process.env.SERVER_KEY,
  clientKey: process.env.CLIENT_KEY,
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
    const { namaKoran, email, eksemplar, phone, isValid, id_koran } = req.body;

    const order_id = `TRX-${nanoid(4)}-${nanoid(8)}`;

    const koranData = await KoranModels.findOne({
      where: {
        id: id_koran,
      },
    });

    if (!koranData) {
      handle400(req, res, "koran not found");
    }

    const gross_amount = koranData.harga * eksemplar;

    const transactionDetails = {
      transaction_details: {
        order_id: order_id,
        gross_amount: gross_amount,
      },
      customer_details: {
        email: email,
        phone: phone,
      },
      item_details: [
        {
          id: order_id,
          price: koranData.harga,
          quantity: eksemplar,
          name: namaKoran,
        },
      ],
      credit_card: {
        secure: true,
      },
    };

    const date = new Date();
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, 0);
    const year = date.getFullYear().toString().slice(-2);
    const formattedDate = `${day}-${month}-${year}`;
    const splitDate = formattedDate.split(" ")[0];

    // Buat transaksi di Midtrans
    const transaction = await snap.createTransaction(transactionDetails);

    // Simpan transaksi di database
    await DataTransaksiModels.create({
      order_id: transactionDetails.transaction_details.order_id,
      gross_amount: transactionDetails.transaction_details.gross_amount,
      namaKoran,
      eksemplar,
      tanggal: splitDate,
      status: "pending",
      isValid,
      email,
      phone,
      id_koran,
    });

    const tokenaccess = jwt.sign({ order_id }, process.env.TRANSACTION_TOKEN);

    res.status(201).json({ order_id, transaction, tokenaccess });
  } catch (error) {
    console.error("Error creating transaction:", error.message);
    res.status(500).send(error.message);
  }
};

const successPayment = async (req, res) => {
  try {
    const { order_id } = req.body;

    if (!order_id) {
      return handle400(req, res, "order_id is required");
    }

    console.log("Received order_id:", order_id);

    const updatePayment = await DataTransaksiModels.findOne({
      where: { order_id },
    });

    if (!updatePayment) {
      return handle400(req, res, "Transaksi not found");
    }

    const data = await DataTransaksiModels.update(
      { status: "success" },
      { where: { order_id } }
    );

    return res.status(201).json({
      data: data,
    });
  } catch (error) {
    console.error("Error:", error);

    if (error.response) {
      return handle500(req, res, error.response);
    } else {
      return handle500(req, res, error.message || "Internal Server Error");
    }
  }

  // Fetch transaction status from Midtrans
  // const order_id = req.order_id;

  // console.log(order_id);

  // try {
  //   // Fetch transaction status from Midtrans
  //   const transactionStatus = await coreApi.transaction.status(order_id);

  //   // Update the status in your database
  //   await DataTransaksiModels.update(
  //     { status: transactionStatus.transaction_status },
  //     { where: { order_id } }
  //   );

  //   res.status(200).json({
  //     message: "Transaction status updated successfully",
  //     status: transactionStatus.transaction_status,
  //   });
  // } catch (error) {
  //   console.error("Error checking transaction status:", error.message);
  //   res.status(500).json({ message: "Internal Server Error" });
  // }
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
  successPayment,
};
