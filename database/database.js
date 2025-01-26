const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = "C:\\Users\\renal\\Project\\Undangan Nature\\database\\wedding-wish.db";
console.log("Path database absolut:", dbPath);

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Gagal membuka database:", err.message);
  } else {
    console.log("Koneksi ke SQLite berhasil.");
  }
});


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
