const BarangModels = require("../models/barang.models");
const BarangKeluarModels = require("../models/barang.keluar.models");
const {
  handle200,
  handle201,
  handle400,
  handle500,
} = require("../utils/response");

const getBarangKeluar = async (req, res) => {
  const data = await BarangKeluarModels.findAll();

  try {
    const isData = data
      ? handle200(req, res, data, "all")
      : handle400(req, res, "invalid paramaters");

    return isData;
  } catch (error) {
    handle500(req, res, error);
  }
};

const getBarangKeluarById = async (req, res) => {
  const { id } = req.params;
  const data = await BarangKeluarModels.findOne({
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

const createBarangKeluar = async (req, res) => {
  try {
    const { id_supplier, id_barang, qty, tanggal, isInventory, nomorFaktur } =
      req.body;

    // Validate input
    if (!id_supplier || !id_barang || !qty || !tanggal || !nomorFaktur) {
      handle400(req, res, "Missing required fields");
    }

    // Fetch barang data
    const barangData = await BarangModels.findOne({
      where: { id: id_barang },
    });

    if (!barangData) {
      handle400(req, res, "Barang not found");
    }

    const newStock = barangData.stok - qty;

    // Update barang stock
    await BarangKeluarModels.update(
      { stok: newStock },
      { where: { id: id_barang } }
    );

    // Create new BarangKeluarBarang entry
    const data = await BarangKeluarModels.create({
      id_barang: id_barang,
      qty: qty,
    });

    return handle201(req, res, data, "BarangKeluar");
  } catch (error) {
    handle500(req, res, error);
  }
};
const editBarangKeluar = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_barang, qty } = req.body;

    const updateBarangKeluar = await BarangKeluarModels.findByPk(id);

    if (!updateBarangKeluar) {
      handle400(req, res, " not found");
    }

    await updateBarangKeluar.update({
      id_barang: id_barang,
      qty: qty,
    });

    return handle201(req, res, updateBarangKeluar, "Success edit jabatan");
  } catch (error) {
    handle500(req, res, error);
  }
};

const deleteBarangKeluar = async (req, res) => {
  try {
    const { id } = req.params;

    const position = await BarangKeluarBarangModels.findOne({
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
  getBarangKeluar,
  createBarangKeluar,
  editBarangKeluar,
  deleteBarangKeluar,
  getBarangKeluarById,
};
