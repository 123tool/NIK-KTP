const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

// Konfigurasi Upload File
const upload = multer({ dest: 'uploads/' });

// --- LOGIKA CORE: EKSTRAKSI & VALIDASI NIK ---
function parseNIK(nik) {
    if (nik.length !== 16 || isNaN(nik)) return { valid: false, message: "Format NIK harus 16 digit angka." };

    const prov = nik.substring(0, 2);
    const kab = nik.substring(2, 4);
    const kec = nik.substring(4, 6);
    let tgl = parseInt(nik.substring(6, 8));
    const bln = nik.substring(8, 10);
    const thn = nik.substring(10, 12);

    // Deteksi Jenis Kelamin
    const gender = tgl > 40 ? "Perempuan" : "Laki-laki";
    if (tgl > 40) tgl -= 40;

    // Sederhanakan Tahun (Asumsi abad 20/21)
    const currentYear = new Date().getFullYear() % 100;
    const fullYear = parseInt(thn) > currentYear ? `19${thn}` : `20${thn}`;

    return {
        valid: true,
        data: {
            nik,
            provinsi: prov,
            kabupaten: kab,
            kecamatan: kec,
            lahir: `${tgl}-${bln}-${fullYear}`,
            gender: gender
        }
    };
}

// --- ENDPOINTS ---

// 1. Validasi & Ekstraksi Singel
app.post('/api/validate', (req, res) => {
    const { nik } = req.body;
    res.json(parseNIK(nik));
});

// 2. Pencarian Database Lokal
app.post('/api/search', (req, res) => {
    const { query } = req.body;
    const db = JSON.parse(fs.readFileSync('./database/users.json', 'utf8'));
    const result = db.filter(item => item.nik === query || item.nama.toLowerCase().includes(query.toLowerCase()));
    res.json(result);
});

// 3. Batch Processing (CSV/Text)
app.post('/api/batch', upload.single('file'), (req, res) => {
    const filePath = req.file.path;
    const content = fs.readFileSync(filePath, 'utf8').split('\n');
    const results = content.map(line => parseNIK(line.trim())).filter(r => r.valid);
    
    const exportPath = `./exports/result_${Date.now()}.json`;
    fs.writeFileSync(exportPath, JSON.stringify(results, null, 2));
    
    res.json({ message: "Batch selesai", total: results.length, download: exportPath });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`
    ========================================
    🚀 NIK KTP OSINT RUNNING
    ========================================
    URL: http://localhost:${PORT}
    Network: http://[IP_ADDRESS]:${PORT}
    Platform: Termux / Linux / Windows
    ========================================
    `);
});
