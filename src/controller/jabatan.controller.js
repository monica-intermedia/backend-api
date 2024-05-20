const JabatanModels = require("../models/jabatan.models");
const {
  handle200,
  handle201,
  handle400,
  handle500,
} = require("../utils/response");

const getJabatan = async (req, res) => {
  const data = await JabatanModels.findAll();

  try {
    const isData = data
      ? handle200(req, res, data, "all")
      : handle400(req, res, "invalid paramaters");

    return isData;
  } catch (error) {
    handle500(req, res, error);
  }
};

const getJabatanById = async (req, res) => {
  const { jabatanId } = req.params;
  const data = await JabatanModels.findOne({ where: { jabatanId: jabatanId } });
  try {
    const isData = data
      ? handle200(req, res, data, "all")
      : handle400(req, res, "invalid paramaters");

    return isData;
  } catch (error) {
    handle500(req, res, error);
  }
};

const getJabatanByName = async (req, res) => {
  try {
    const { jabatan } = req.body;
    const data = await JabatanModels.findAll({ where: { jabatan: jabatan } });

    const isData = data
      ? handle200(req, res, data, "success get jabatan")
      : handle400(req, res, "invalid parameters");

    return isData;
  } catch (error) {
    handle500(req, res, error);
  }
};

const createJabatan = async (req, res) => {
  try {
    const { jabatan } = req.body;

    const check = await JabatanModels.findAll({ where: { jabatan: jabatan } });

    if (check.length > 0) {
      return handle400(req, res, "Position already available");
    }

    const data = await JabatanModels.create({
      jabatan,
    });

    return handle201(req, res, data, "jabatan");
  } catch (error) {
    handle500(req, res, error);
  }
};

const editJabatan = async (req, res) => {
  try {
    const { id } = req.params;
    const { jabatan } = req.body;

    const updateJabatan = await JabatanModels.findByPk(id);

    if (!updateJabatan) {
      return handle400(req, res, "Position not found");
    }

    await updateJabatan.update({ jabatan: jabatan });

    return handle201(req, res, updateJabatan, "Success edit jabatan");
  } catch (error) {
    handle500(req, res, error);
  }
};

const deleteJabatan = async (req, res) => {
  try {
    const { jabatanId } = req.params;

    const position = await JabatanModels.findOne({
      where: { jabatanId: jabatanId },
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
  getJabatan,
  createJabatan,
  editJabatan,
  deleteJabatan,
  getJabatanByName,
  getJabatanById,
};
