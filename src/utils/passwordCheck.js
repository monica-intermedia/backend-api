const bcrypt = require("bcrypt");
const adminModels = require("../models/admin.models");
const PegawaiModels = require("../models/pegawai.models");

const passwordCheck = async (email, password) => {
  const userData = await adminModels.findOne({ where: { email: email } });
  const compare = await bcrypt.compare(password, userData.password);
  return { compare, userData };
};

const passwordCheckKaryawan = async (email, password) => {
  const staffData = await PegawaiModels.findOne({ where: { email: email } });
  const compareStaff = await bcrypt.compare(password, staffData.password);

  console.log(staffData.email);
  console.log(compareStaff.password);
  return { compareStaff, staffData };
};

module.exports = { passwordCheck, passwordCheckKaryawan };
