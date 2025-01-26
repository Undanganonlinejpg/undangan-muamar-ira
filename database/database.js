const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Gunakan path relatif
const dbPath = path.join(process.cwd(), "wedding-wish.db");

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Gagal membuka database:", err.message);
    } else {
        console.log("Koneksi ke SQLite berhasil.");
    }
});

// Pastikan tabel dibuat
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
