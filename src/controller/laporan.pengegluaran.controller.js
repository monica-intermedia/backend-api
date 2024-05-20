const GajiKaryawanModels = require("../models/gaji.karyaan.models");
const PembelianBarangModels = require("../models/pembelian.barang.models");
const LaporanPengeluaranModels = require("../models/laporan.pengeluaran");

const generateOrUpdateDailyExpenseReport = async (tanggal) => {
  try {
    // Ambil data Gaji Karyawan
    const gajiData = await GajiKaryawanModels.findAll({
      where: { tanggal },
    });

    // Ambil data Pembelian Barang
    const pembelianBarangData = await PembelianBarangModels.findAll({
      where: { tanggal },
    });

    // Hitung total pengeluaran
    const totalGaji = gajiData.reduce(
      (total, gaji) => total + gaji.jumlahGaji,
      0
    );
    const totalPembelianBarang = pembelianBarangData.reduce(
      (total, pembelian) => total + pembelian.totalHarga,
      0
    );

    const totalPengeluaran = totalGaji + totalPembelianBarang;

    // Cek apakah laporan untuk tanggal tersebut sudah ada
    let laporanPengeluaran = await LaporanPengeluaranModels.findOne({
      where: { tanggal },
    });

    if (laporanPengeluaran) {
      // Update laporan pengeluaran yang ada
      laporanPengeluaran.pengeluaran = totalPengeluaran;
      await laporanPengeluaran.save();
    } else {
      // Buat entri baru untuk Laporan Pengeluaran
      laporanPengeluaran = await LaporanPengeluaranModels.create({
        tanggal,
        pengeluaran: totalPengeluaran,
      });
    }

    console.log("Laporan pengeluaran harian diperbarui", laporanPengeluaran);
  } catch (error) {
    console.error("Error creating or updating daily expense report:", error);
  }
};

module.exports = {
  generateOrUpdateDailyExpenseReport,
};
