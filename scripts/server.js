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
  origin: "https://undangan-muamar-ira.vercel.app", // Ubah sesuai domain frontend Anda
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// Endpoint POST untuk menambahkan wish
app.post("/wishes", (req, res) => {
  console.log("Data diterima untuk ditambahkan:", req.body);

  const { name, address, wish } = req.body;

  if (!name || !address || !wish) {
    console.error("Data tidak lengkap:", req.body);
    return res.status(400).json({ error: "Data tidak lengkap" });
  }

  const query = `INSERT INTO wishes (name, address, wish) VALUES (?, ?, ?)`;
  db.run(query, [name, address, wish], function (err) {
    if (err) {
      console.error("Error saat menambahkan data:", err.message);
      res.status(500).json({ error: err.message });
    } else {
      console.log("Data berhasil ditambahkan dengan ID:", this.lastID);
      res.status(201).json({ id: this.lastID });
    }
  });
});

// Endpoint GET untuk mengambil wish
app.get("/wishes", (req, res) => {
  console.log("Endpoint GET /wishes dipanggil");
  const query = `SELECT * FROM wishes`;
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error("Error saat mengambil data:", err.message);
      res.status(500).send("Error mengambil data dari database");
    } else {
      console.log("Data dari database:", rows);
      res.json(rows);
    }
  });
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
