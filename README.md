# 🛠️ NIK-Master Pro
**The Ultimate Localhost NIK Validation & Data Processing Tools**

NIK-Master Pro adalah alat manajemen data NIK (Nomor Induk Kependudukan) yang powerfull, cepat, dan privat. Dirancang untuk dijalankan di lingkungan lokal tanpa perlu koneksi internet (anonym), mendukung pemrosesan data tunggal maupun ribuan data sekaligus (batch).

---

## 🚀 Fitur Utama
- ✅ **Validasi Format:** Cek akurasi 16 digit NIK.
- 📊 **Ekstraksi Data:** Otomatis mendapatkan Jenis Kelamin, Tanggal Lahir, dan Kode Wilayah.
- 🔍 **Database Search:** Cari data NIK/Nama dari database lokal (JSON).
- 📁 **Batch Processing:** Masukkan file `.txt` berisi daftar NIK, proses ribuan data dalam detik.
- 💾 **Export Pro:** Hasil pemrosesan batch langsung dikonversi ke format `.csv` (Excel Ready).
- 🎨 **Neo-Brutalist UI:** Tampilan modern, responsif, dan mencolok.

---

## 📥 Panduan Instalasi

### 1. Persiapan Lingkungan (Prerequisites)
Pastikan kamu sudah menginstall **Node.js** di perangkatmu.

* **Windows:** Download installer di [nodejs.org](https://nodejs.org/).
* **Ubuntu/Linux:** `sudo apt install nodejs npm`
* **Termux (Android):** `pkg install nodejs -y`

### 2. Clone & Setup
Buka terminal/CMD, lalu jalankan perintah berikut:

```bash
# Buat folder proyek
mkdir nik-master && cd nik-master

# Inisialisasi dan Install Dependensi
npm init -y
npm install express multer json2csv
