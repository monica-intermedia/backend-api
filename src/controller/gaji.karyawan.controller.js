const GajiKaryawanModels = require("../models/gaji.karyaan.models");
const PegawaiModels = require("../models/pegawai.models");
const broadcast = require("../middleware/socket");
const {
  handle200,
  handle201,
  handle400,
  handle500,
} = require("../utils/response");

const getGaji = async (req, res) => {
  try {
    const data = await GajiKaryawanModels.findAll({
      include: {
        model: PegawaiModels,
        attributes: ["nip", "name", "gaji"],
      },
    });

    const isData = data
      ? handle200(req, res, data, "all")
      : handle400(req, res, "invalid parameters");

    return isData;
  } catch (error) {
    handle500(req, res, error);
  }
};

const getGajiById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await GajiKaryawanModels.findOne({
      where: { id: id },
    });

    const isData = data
      ? handle200(req, res, data, "all")
      : handle400(req, res, "invalid parameters");

    return isData;
  } catch (error) {
    handle500(req, res, error);
  }
};

const createGaji = async (req, res) => {
  try {
    const { tanggal, bpjs, potongan, bonus, id_pegawai } = req.body;

    const pegawaiData = await PegawaiModels.findOne({
      where: { id: id_pegawai },
    });

    if (!pegawaiData) {
      return handle400(req, res, "Pegawai not found");
    }

    const gaji = pegawaiData.gaji;
    const jumlahGaji = gaji - potongan - bpjs + bonus;

    const data = await GajiKaryawanModels.create({
      tanggal: tanggal,
      bpjs: bpjs,
      potongan: potongan,
      bonus: bonus,
      jumlahGaji: jumlahGaji,
      id_pegawai: id_pegawai,
    });

    return handle201(req, res, data, "gaji");
  } catch (error) {
    handle500(req, res, error);
  }
};

const editGaji = async (req, res) => {
  try {
    const { id } = req.params;
    const { tanggal, bpjs, potongan, bonus } = req.body;

    const updateGaji = await GajiKaryawanModels.findByPk(id);

    if (!updateGaji) {
      return handle400(req, res, "Gaji not found");
    }

    await updateGaji.update({
      tanggal: tanggal,
      bpjs: bpjs,
      potongan: potongan,
      bonus: bonus,
    });

    // Broadcast the updated Gaji data to all connected clients
    broadcast(updateGaji);

    return handle201(req, res, updateGaji, "Success edit gaji");
  } catch (error) {
    handle500(req, res, error);
  }
};

const deleteGaji = async (req, res) => {
  try {
    const { id } = req.params;

    const position = await GajiKaryawanModels.findOne({
      where: { id: id },
    });

    if (position) {
      await position.destroy();

      return handle200(req, res, position, "delete");
    } else {
      return handle400(req, res, "Gaji not found");
    }
  } catch (error) {
    handle500(req, res, error);
  }
};

module.exports = {
  getGaji,
  createGaji,
  editGaji,
  deleteGaji,
  getGajiById,
};
