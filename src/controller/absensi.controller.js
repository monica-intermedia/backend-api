const AbsensiModels = require("../models/absensi.models");
const PegawaiModels = require("../models/pegawai.models");
const moment = require("moment-timezone");
const fs = require("fs");
const path = require("path");
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

const getAbensiByUser = async (req, res) => {
  const { id } = req.params;
  const data = await AbsensiModels.findAll({
    where: { id_pegawai: id },
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

const createAbsensi = async (req, res) => {
  try {
    const { gambar } = req.body;
    const id_pegawai = req.id;
    const tanggal = moment().tz("Asia/Jakarta").format("YYYY-MM-DD");
    const waktuMasuk = moment().tz("Asia/Jakarta").format("HH:mm:ss");
    let keterangan = "Telat";

    const batasWaktu = moment.tz("23:30:00", "HH:mm:ss", "Asia/Jakarta");
    const waktuSekarang = moment.tz(waktuMasuk, "HH:mm:ss", "Asia/Jakarta");

    if (waktuSekarang.isSameOrBefore(batasWaktu)) {
      keterangan = "Tepat Waktu";
    }

    const absenHariIni = await AbsensiModels.findOne({
      where: {
        id_pegawai,
        tanggal,
      },
    });

    if (absenHariIni) {
      return res
        .status(400)
        .json({ message: "Anda sudah absen pada hari ini" });
    } else {
      const fileName = `absensi-${Date.now()}.png`;
      const filePath = path.join(
        process.cwd(),
        "public/images/absensi",
        fileName
      );

      fs.mkdirSync(path.join(process.cwd(), "public/images/absensi"), {
        recursive: true,
      });

      // Save the image to the directory
      const base64Data = gambar.replace(/^data:image\/png;base64,/, "");
      fs.writeFileSync(filePath, base64Data, "base64");

      const data = await AbsensiModels.create({
        id_pegawai,
        tanggal,
        waktuMasuk,
        gambar: fileName,
        keterangan,
      });

      return res.status(201).json({ data, message: "Absensi berhasil" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
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
  getAbensiByUser,
};
