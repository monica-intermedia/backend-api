const jwt = require("jsonwebtoken");
const {
  passwordCheck,
  passwordCheckKaryawan,
} = require("../utils/passwordCheck");
const blacklist = require("../middleware/blacklist");
const {
  handle200,
  handle201,
  handle400,
  handle500,
} = require("../utils/response");
const bcrypt = require("bcrypt");
const PegawaiModels = require("../models/pegawai.models");

const login = async (req, res) => {
  try {
    const { id, email, password } = req.body;
    const check = await passwordCheck(email, password);

    const secretKey = process.env.SECRET_PASSWORD;

    const payload = {
      id: id,
      email: email,
      password: password,
    };

    const token = jwt.sign(payload, secretKey, {
      expiresIn: "3d",
    });

    const isData = check.compare
      ? handle201(req, res, token, "login")
      : handle400(req, res, "login fail");

    return isData;
  } catch (error) {
    handle500(req, res, error);
    console.error(error);
  }
};

const loginKaryawan = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return handle400(req, res, "Email atau password belum diisi");
    }

    const staff = await PegawaiModels.findOne({ where: { email: email } });

    if (!staff) {
      return handle400(req, res, "Email tidak ditemukan");
    }

    const comparePassword = await bcrypt.compare(password, staff.password);

    console.log(comparePassword);

    if (!comparePassword) {
      return handle400(req, res, "Password salah");
    }

    const secretKey = process.env.KARYAWAN_PASSWORD;

    const payload = {
      id: staff.id,
      email: staff.email,
      nama: staff.name,
    };

    const data = jwt.sign(payload, secretKey, {
      expiresIn: "3d",
    });

    const responseData = {
      token: data,
      payload: payload,
    };

    return handle201(req, res, responseData, "Login berhasil");
  } catch (error) {
    console.error("Terjadi kesalahan saat login:", error);
    return handle500(req, res, "Internal server error");
  }
};

const logout = (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return handle400(req, res, "Token missing");
  }

  const token = authorization.split(" ")[1];
  const secretKey = process.env.SECRET_PASSWORD;

  try {
    const decodedToken = jwt.verify(token, secretKey);

    blacklist.addToken(token);

    return handle200(req, res, decodedToken, "Logout successful");
  } catch (error) {
    return handle400(req, res, "Invalid token");
  }
};

module.exports = { login, logout, loginKaryawan };
