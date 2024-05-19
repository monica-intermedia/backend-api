const bcrypt = require("bcrypt");
const AdminModels = require("../models/admin.models");
const {
  handle200,
  handle201,
  handle400,
  handle500,
} = require("../utils/response");

const getAdmin = async (req, res) => {
  try {
    const data = await AdminModels.findAll();
    return data
      ? handle200(req, res, data, "all")
      : handle400(req, res, "invalid parameters");
  } catch (error) {
    handle500(req, res, error);
  }
};

const createAdmin = async (req, res) => {
  try {
    const { name, email, password, confPassword } = req.body;

    if (password !== confPassword) {
      return handle400(req, res, "passwords do not match");
    }

    const existingUser = await AdminModels.findOne({
      where: { email: email },
    });

    if (existingUser) {
      return handle400(req, res, "email has been registered");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const data = await AdminModels.create({
      name,
      email,
      password: encryptedPassword,
    });

    return handle201(req, res, data, "admin");
  } catch (error) {
    handle500(req, res, error);
  }
};

module.exports = { getAdmin, createAdmin };
