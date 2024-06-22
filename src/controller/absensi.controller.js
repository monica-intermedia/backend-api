const AbsensiModels = require("../models/absensi.models");
const PegawaiModels = require("../models/pegawai.models");
const {
  handle200,
  handle201,
  handle400,
  handle500,
} = require("../utils/response");

const getAbsensi = async (req, res) => {
  const data = await AbsensiModels.findAll({
    include: {
      model: PegawaiModels,
      attributes: ["name"],
    },
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

const getAbensiById = async (req, res) => {
  const { id } = req.params;
  const data = await AbsensiModels.findOne({ where: { id: id } });
  try {
    const isData = data
      ? handle200(req, res, data, "all")
      : handle400(req, res, "invalid paramaters");

    return isData;
  } catch (error) {
    handle500(req, res, error);
  }
};

const createAbsensi = async (req, res) => {
  try {
    const {
      id_pegawwai,
      tanggal,
      waktuMasuk,
      waktuKeluar,
      statusKehadiran,
      gambar,
      keterangan,
    } = req.body;

    const data = await AbsensiModels.create({
      id_pegawwai,
      tanggal,
      waktuMasuk,
      waktuKeluar,
      statusKehadiran,
      gambar,
      keterangan,
    });

    return handle201(req, res, data, "jabatan");
  } catch (error) {
    handle500(req, res, error);
  }
};

const editAbsensi = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      id_pegawwai,
      tanggal,
      waktuMasuk,
      waktuKeluar,
      statusKehadiran,
      gambar,
      keterangan,
    } = req.body;

    const updateJabatan = await AbsensiModels.findByPk(id);

    if (!updateJabatan) {
      return handle400(req, res, "Position not found");
    }

    await updateJabatan.update({
      id_pegawwai,
      tanggal,
      waktuMasuk,
      waktuKeluar,
      statusKehadiran,
      gambar,
      keterangan,
    });

    return handle201(req, res, updateJabatan, "Success edit jabatan");
  } catch (error) {
    handle500(req, res, error);
  }
};

const deleteAbsensi = async (req, res) => {
  try {
    const { id } = req.params;

    const position = await JabatanModels.findOne({
      where: { id: id },
    });

    console.log(position);

    if (position) {
      await position.destroy();
      return handle200(req, res, position, "delete");
    } else {
      return handle400(req, res, "Position not found");
    }
  } catch (error) {
    handle500(req, res, error);
  }
};

module.exports = {
  getAbsensi,
  createAbsensi,
  editAbsensi,
  deleteAbsensi,
  getAbensiById,
};
