const PembelianBarangModels = require("../models/pembelian.barang.models");
const BarangModels = require("../models/barang.models");
const SupplierModels = require("../models/supplier.models");
const { Op } = require("sequelize");
const {
  handle200,
  handle201,
  handle400,
  handle500,
} = require("../utils/response");

const getPembelianByDate = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    console.log({ startDate, endDate });
    const data = await PembelianBarangModels.findAll({
      where: {
        tanggal: {
          [Op.between]: [new Date(startDate), new Date(endDate)],
        },
      },
      include: [
        {
          model: BarangModels,
          attributes: ["namaBarang"],
        },
        {
          model: SupplierModels,
          attributes: ["name"],
        },
      ],
      order: [["tanggal", "ASC"]],
    });

    const isData = data
      ? handle200(req, res, data, "all")
      : handle400(req, res, "invalid paramaters");

    return isData;
  } catch (error) {
    handle500(req, res, error);
  }
};

const getPembelian = async (req, res) => {
  const data = await PembelianBarangModels.findAll({
    include: [
      {
        model: BarangModels,
        attributes: ["namaBarang"],
      },
      {
        model: SupplierModels,
        attributes: ["name"],
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

const getPembelianById = async (req, res) => {
  const { id } = req.params;
  const data = await PembelianBarangModels.findOne({
    where: { id: id },
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

const createPembelian = async (req, res) => {
  try {
    const {
      id_supplier,
      id_barang,
      qty,
      totalHarga,
      tanggal,
      isInventory,
      nomorFaktur,
    } = req.body;

    // Fetch barang data
    const barangData = await BarangModels.findOne({
      where: { id: id_barang },
    });

    if (!barangData) {
      handle400(req, res, "Barang not found");
    }

    // Fetch supplier data to ensure it exists
    const supplierData = await SupplierModels.findOne({
      where: { id: id_supplier },
    });

    if (!supplierData) {
      handle400(req, res, "Supplier not found");
    }

    const newStock = barangData.stok + qty;

    await BarangModels.update({ stok: newStock }, { where: { id: id_barang } });

    const data = await PembelianBarangModels.create({
      id_supplier: id_supplier,
      id_barang: id_barang,
      qty: qty,
      totalHarga: totalHarga,
      tanggal: tanggal,
      isInventory: isInventory,
      nomorFaktur: nomorFaktur,
    });

    return handle201(req, res, data, "pembelian");
  } catch (error) {
    handle500(req, res, error);
  }
};

const editPembelian = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      id_supplier,
      id_barang,
      qty,
      totalHarga,
      isInventory,
      nomorFaktur,
    } = req.body;

    const updatePembelian = await PembelianBarangModels.findByPk(id);

    if (!updatePembelian) {
      handle400(req, res, " not found");
    }

    await updatePembelian.update({
      id_supplier: id_supplier,
      id_barang: id_barang,
      qty: qty,
      totalHarga: totalHarga,
      isInventory: isInventory,
      nomorFaktur: nomorFaktur,
    });

    return handle201(req, res, updatePembelian, "Success edit jabatan");
  } catch (error) {
    handle500(req, res, error);
  }
};

const deletePembelian = async (req, res) => {
  try {
    const { id } = req.params;

    const position = await PembelianBarangModels.findOne({
      where: { id: id },
    });

    console.log(position);

    if (position) {
      await position.destroy();
      handle200(req, res, position, "delete");
    } else {
      handle400(req, res, "not found");
    }
  } catch (error) {
    handle500(req, res, error);
  }
};

module.exports = {
  getPembelian,
  createPembelian,
  editPembelian,
  deletePembelian,
  getPembelianById,
  getPembelianByDate,
};
