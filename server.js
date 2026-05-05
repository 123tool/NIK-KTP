const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { Parser } = require('json2csv');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Setup Directory (Auto-Create jika belum ada)
['database', 'uploads', 'exports', 'public'].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
});

// Database default jika kosong
const dbPath = './database/users.json';
if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify([
        { nik: "3201010101700001", nama: "Contoh User", alamat: "Jakarta" }
    ], null, 2));
}

// Konfigurasi Upload
const upload = multer({ dest: 'uploads/' });

// --- CORE LOGIC: NIK PARSER ---
function parseNIK(nik) {
    const cleanNIK = nik.trim();
    if (cleanNIK.length !== 16 || isNaN(cleanNIK)) {
        return { valid: false, message: "Format NIK harus 16 digit angka." };
    }

    const prov = cleanNIK.substring(0, 2);
    const kab = cleanNIK.substring(2, 4);
    const kec = cleanNIK.substring(4, 6);
    let tgl = parseInt(cleanNIK.substring(6, 8));
    const bln = cleanNIK.substring(8, 10);
    const thn = cleanNIK.substring(10, 12);

    // Jenis Kelamin & Tanggal
    const gender = tgl > 40 ? "Perempuan" : "Laki-laki";
    if (tgl > 40) tgl -= 40;

    // Tahun (Abad 20 vs 21)
    const currentYear = new Date().getFullYear() % 100;
    const fullYear = parseInt(thn) > currentYear ? `19${thn}` : `20${thn}`;

    return {
        valid: true,
        data: {
            nik: cleanNIK,
            gender: gender,
            lahir: `${tgl}-${bln}-${fullYear}`,
            wilayah: `${prov}.${kab}.${kec}`
        }
    };
}

// --- API ENDPOINTS ---

// 1. Validasi & Search
app.post('/api/execute', (req, res) => {
    const { query } = req.body;
    const parseResult = parseNIK(query);
    
    // Cari di database lokal
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    const dbResult = db.find(item => item.nik === query);

    res.json({
        parse: parseResult,
        database: dbResult || null
    });
});

// 2. Batch Processing & CSV Export
app.post('/api/batch', upload.single('file'), (req, res) => {
    if (!req.file) return res.status(400).json({ message: "File tidak ditemukan" });

    const content = fs.readFileSync(req.file.path, 'utf8').split(/\r?\n/);
    const results = content
        .map(line => parseNIK(line.trim()))
        .filter(r => r.valid)
        .map(r => ({
            NIK: r.data.nik,
            Gender: r.data.gender,
            Lahir: r.data.lahir,
            Kode_Wilayah: r.data.wilayah
        }));

    if (results.length === 0) return res.status(400).json({ message: "Tidak ada NIK valid" });

    const json2csv = new Parser();
    const csv = json2csv.parse(results);
    const fileName = `export_${Date.now()}.csv`;
    const exportPath = path.join(__dirname, 'exports', fileName);
    
    fs.writeFileSync(exportPath, csv);
    res.json({ count: results.length, fileUrl: `/api/download/${fileName}` });
});

// 3. Download Helper
app.get('/api/download/:filename', (req, res) => {
    const file = path.join(__dirname, 'exports', req.params.filename);
    res.download(file);
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`
    ███╗   ██╗██╗██╗  ██╗    ███╗   ███╗ █████╗ ███████╗████████╗███████╗██████╗ 
    ████╗  ██║██║██║ ██╔╝    ████╗ ████║██╔══██╗██╔════╝╚══██╔══╝██╔════╝██╔══██╗
    ██╔██╗ ██║██║█████╔╝     ██╔████╔██║███████║███████╗   ██║   █████╗  ██████╔╝
    ██║╚██╗██║██║██╔═██╗     ██║╚██╔╝██║██╔══██║╚════██║   ██║   ██╔════╝██╔══██╗
    ██║ ╚████║██║██║  ██╗    ██║ ╚═╝ ██║██║  ██║███████║   ██║   ███████╗██║  ██║
    ╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝    ╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═╝
    
    🚀 URL: http://localhost:${PORT}
    📡 Network: http://[CEK_IP_KAMU]:${PORT}
    -------------------------------------------------------------------------
    STATUS: READY TO SCAN
    `);
});
