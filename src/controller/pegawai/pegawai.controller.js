const PegawaiModels = require("../../models/pegawai/pegawai.models");
const JabatanModels = require("../../models/pegawai/jabatan.models");
const {
  handle500,
  handle200,
  handle400,
  handle201,
} = require("../../utils/response");

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
    const { nip, jabatanName, alamat, email, handphone, jabatanId } = req.body;

    if (!nip || !jabatanName || !alamat || !email || !handphone || !jabatanId) {
      return handle400(req, res, "Invalid parameters: all fields are required");
    }

    const data = await PegawaiModels.create({
      nip: nip,
      jabatanName: jabatanName,
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

module.exports = { getPegawai, getPegawaiById, createPegawai };
