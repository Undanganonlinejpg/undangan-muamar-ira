
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

export default function handler(req, res) {
    const dbPath = path.join(process.cwd(), "wedding-wish.db");
    const db = new sqlite3.Database(dbPath);

    if (req.method === "POST") {
        const { name, address, wish } = req.body;
        if (!name || !address || !wish) {
            return res.status(400).json({ error: "Data tidak lengkap" });
        }

        const query = "INSERT INTO wishes (name, address, wish) VALUES (?, ?, ?)";
        db.run(query, [name, address, wish], function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ id: this.lastID });
        });
    } else if (req.method === "GET") {
        db.all("SELECT * FROM wishes", [], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(rows);
        });
    } else {
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
