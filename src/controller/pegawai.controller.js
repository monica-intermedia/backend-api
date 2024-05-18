const PegawaiModels = require("../models/pegawai.models");
const JabatanModels = require("../models/jabatan.models");
const {
  handle500,
  handle200,
  handle400,
  handle201,
} = require("../utils/response");

const getPegawai = async (req, res) => {
  try {
    const data = await PegawaiModels.findAll({
      include: { model: JabatanModels, attributes: ["jabatan"] },
    });
    if (data && data.length > 0) {
      handle200(req, res, data, "Successfully retrieved all data");
    } else {
      handle400(req, res, "No data found");
    }
  } catch (error) {
    handle500(req, res, error);
  }
};

const getPegawaiById = async (req, res) => {
  try {
    const { pegawaiId } = req.params;
    if (!pegawaiId) {
      return handle400(req, res, "Invalid parameters: pegawaiId is required");
    }

    const data = await PegawaiModels.findOne({
      where: { pegawaiId: pegawaiId },
    });

    if (data) {
      handle200(req, res, data, "Successfully retrieved data by ID");
    } else {
      handle400(req, res, "No data found for the given ID");
    }
  } catch (error) {
    handle500(req, res, error);
  }
};

const createPegawai = async (req, res) => {
  try {
    const { nip, Name, alamat, email, handphone, jabatanId } = req.body;

    if (!nip || !Name || !alamat || !email || !handphone || !jabatanId) {
      return handle400(req, res, "Invalid parameters: all fields are required");
    }

    const data = await PegawaiModels.create({
      nip: nip,
      Name: Name,
      alamat: alamat,
      email: email,
      handphone: handphone,
      jabatanId: jabatanId,
    });

    if (data) {
      handle201(req, res, data, "Pegawai created successfully");
    } else {
      handle400(req, res, "Failed to create pegawai");
    }
  } catch (error) {
    handle500(req, res, error);
  }
};

const editPegawai = async (req, res) => {
  const { pegawaiId } = req.params;
  const { nip, Name, alamat, email, handphone, jabatanId } = req.body;

  try {
    const updatePegawai = await PegawaiModels.findByPk(pegawaiId);

    if (!updatePegawai) {
      handle400(req, res, "pegawaiId undefined");
    }

    await updatePegawai.update({
      nip: nip,
      Name: Name,
      alamat: alamat,
      email: email,
      handphone: handphone,
      jabatanId: jabatanId,
    });

    return handle201(req, res, updatePegawai, "success update");
  } catch (error) {
    handle500(req, res, error);
  }
};

const deletePegawai = async (req, res) => {
  const { pegawaiId } = req.params;
  const data = await PegawaiModels.findOne({ where: { pegawaiId: pegawaiId } });

  if (data) {
    await data.destroy();
    return handle201(req, res, data, "delete");
  } else {
    return handle400(req, res, "position not found");
  }
};

module.exports = {
  getPegawai,
  getPegawaiById,
  createPegawai,
  deletePegawai,
  editPegawai,
};
