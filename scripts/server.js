const express = require("express");
const cors = require("cors");
const db = require("../database/database");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: "*", // Ubah jika Anda ingin membatasi akses hanya dari domain tertentu
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../")));

// Endpoint POST untuk menambahkan wish
app.post("/wishes", (req, res) => {
  const { name, address, wish } = req.body;

  if (!name || !address || !wish) {
    return res.status(400).json({ error: "Data tidak lengkap" });
  }

  const query = `INSERT INTO wishes (name, address, wish) VALUES (?, ?, ?)`;
  db.run(query, [name, address, wish], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID });
  });
});

// Endpoint GET untuk mengambil wishes
app.get("/wishes", (req, res) => {
  const query = `SELECT * FROM wishes`;
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
