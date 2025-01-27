const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Gunakan path relatif ke file wedding-wish.db
const dbPath = path.join(__dirname, "wedding-wish.db");
console.log("Path database:", dbPath);

// Membuka atau membuat koneksi ke database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Gagal membuka database:", err.message);
  } else {
    console.log("Koneksi ke SQLite berhasil.");
  }
});

// Membuat tabel jika belum ada
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS wishes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      address TEXT NOT NULL,
      wish TEXT NOT NULL
    )
  `, (err) => {
    if (err) {
      console.error("Error saat membuat tabel wishes:", err.message);
    } else {
      console.log("Tabel wishes siap digunakan.");
    }
  });
});

module.exports = db;
