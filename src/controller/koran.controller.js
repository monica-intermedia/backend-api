const KoranModels = require("../models/koran.models");
const {
  handle200,
  handle201,
  handle400,
  handle500,
} = require("../utils/response");

const getTipeKoran = async (req, res) => {
  const data = await KoranModels.findAll();

  try {
    const isData = data
      ? handle200(req, res, data, "all")
      : handle400(req, res, "invalid paramaters");

    return isData;
  } catch (error) {
    handle500(req, res, error);
  }
};

const getTipeKoranById = async (req, res) => {
  const { id } = req.params;
  const data = await KoranModels.findOne({ where: { id: id } });
  try {
    const isData = data
      ? handle200(req, res, data, "all")
      : handle400(req, res, "invalid paramaters");

    return isData;
  } catch (error) {
    handle500(req, res, error);
  }
};

const createTipeKoran = async (req, res) => {
  try {
    const { keterangan, halaman, warna, plate, harga, id_barang } = req.body;

    const data = await KoranModels.create({
      keterangan,
      halaman,
      warna,
      plate,
      harga,
      id_barang,
    });

    return handle201(req, res, data, "tipe koran");
  } catch (error) {
    handle500(req, res, error);
  }
};

const editTipeKoran = async (req, res) => {
  try {
    const { id } = req.params;
    const { keterangan, halaman, warna, plate, harga } = req.body;

    const updateData = await KoranModels.findByPk(id);

    if (!updateData) {
      return handle400(req, res, "Position not found");
    }

    await updateData.update({ keterangan, halaman, warna, plate, harga });

    return handle201(req, res, updateData, "Success edit jabatan");
  } catch (error) {
    handle500(req, res, error);
  }
};

const deleteTipeKoran = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await KoranModels.findOne({
      where: { id: id },
    });

    console.log(data);

    if (data) {
      await data.destroy();
      return handle200(req, res, position, "delete");
    } else {
      return handle400(req, res, "Position not found");
    }
  } catch (error) {
    handle500(req, res, error);
  }
};

module.exports = {
  getTipeKoran,
  createTipeKoran,
  editTipeKoran,
  deleteTipeKoran,
  getTipeKoranById,
};
