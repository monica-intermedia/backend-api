const cron = require("node-cron");
const {
  generateDailyExpenseReport,
} = require("../controller/laporan.pengegluaran.controller");

// Fungsi untuk memanggil generateDailyExpenseReport
const createDailyReport = async () => {
  try {
    const today = new Date().toISOString().split("T")[0]; // Mendapatkan tanggal hari ini dalam format YYYY-MM-DD

    const req = { body: { tanggal: today } }; // Membuat objek request palsu
    const res = {
      status: () => ({ send: () => {} }), // Membuat objek response palsu
    };

    await generateDailyExpenseReport(req, res);
    console.log(`Laporan pengeluaran untuk tanggal ${today} berhasil dibuat.`);
  } catch (error) {
    console.error(`Gagal membuat laporan pengeluaran harian: ${error.message}`);
  }
};

// Atur cron job untuk menjalankan setiap hari pada pukul 00:00
cron.schedule("0 0 * * *", createDailyReport, {
  timezone: "Asia/Jakarta", // Sesuaikan dengan timezone Anda
});

// Memastikan bahwa cron job akan berjalan ketika aplikasi dijalankan
const startCronJobs = () => {
  console.log("Cron job untuk laporan pengeluaran harian telah dimulai.");
};

module.exports = startCronJobs;
