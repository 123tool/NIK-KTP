##  NIK KTP OSINT

**NIK Validation & Data Processing Tools**

Alat manajemen data NIK (Nomor Induk Kependudukan) yang powerfull, cepat, dan privat. Dirancang untuk dijalankan di lingkungan lokal tanpa perlu koneksi internet (anonym), mendukung pemrosesan data tunggal maupun ribuan data sekaligus (batch).

---

## 🚀 Fitur
- ✅ **Validasi Format:** Cek akurasi 16 digit NIK.
- 📊 **Ekstraksi Data:** Otomatis mendapatkan Jenis Kelamin, Tanggal Lahir, dan Kode Wilayah.
- 🔍 **Database Search:** Cari data NIK/Nama dari database lokal (JSON).
- 📁 **Batch Processing:** Masukkan file `.txt` berisi daftar NIK, proses ribuan data dalam detik.
- 💾 **Export Pro:** Hasil pemrosesan batch langsung dikonversi ke format `.csv` (Excel Ready).

---

## 📥 Panduan

### 1. Persiapan Lingkungan (Prerequisites)
Pastikan kamu sudah menginstall **Node.js** di perangkatmu.

* **Windows:** Download installer di [nodejs.org](https://nodejs.org/).
* **Ubuntu/Linux:** `sudo apt install nodejs npm`
* **Termux (Android):** `pkg install nodejs -y`

### 2. Clone & Setup
Buka terminal/CMD, lalu jalankan perintah berikut :

# Clone
```
git clone https://github.com/123tool/NIK-KTP.git
```
# Buat folder proyek
```
mkdir NIK-KTP && cd NIK-KTP
```
# Inisialisasi dan Install Dependensi
```
npm init -y
npm install express multer json2csv
```
## Menjalankan Aplikasi
```
node server.js
```
## RUNNING, buka browser dan akses :
​Local :
```
http://localhost:3000
```
​Network :
```
http://[IP-KAMU]:3000
```

## Cara Penggunaan
​Pencarian Tunggal
​Masukkan 16 digit NIK ke kolom input, klik EKSEKUSI. Sistem akan membedah data tersebut secara instan.

​Pemrosesan Batch (Massal)
- ​Siapkan file .txt yang berisi daftar NIK (satu baris satu NIK).
- ​Klik tombol Pilih File.
- ​Klik PROSES FILE.
- ​Setelah selesai, klik link DOWNLOAD HASIL CSV yang muncul untuk membuka data di Excel.
  
## ​⚠️ Disclaimer

**​Alat ini dibuat untuk tujuan edukasi, validasi data internal, dan alat bantu OSINT. Penyalahgunaan data kependudukan tanpa izin adalah pelanggaran hukum. Penulis tidak bertanggung jawab atas penggunaan alat ini di luar koridor hukum yang berlaku.**
