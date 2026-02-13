# anak.sobri

> **Aplikasi frontend-only (React + Vite + TypeScript) untuk catatan pediatri offline-first**.  
> Tanpa backend, tanpa login, semua data disimpan lokal di browser (LocalStorage) dengan dukungan export/import JSON, versioning schema, dan migrasi.

---

## Daftar Isi

- [1. Ringkasan Proyek](#1-ringkasan-proyek)
- [2. Tujuan & Prinsip Desain](#2-tujuan--prinsip-desain)
- [3. Stack Teknologi](#3-stack-teknologi)
- [4. Fitur Utama](#4-fitur-utama)
  - [4.1 Dashboard](#41-dashboard)
  - [4.2 Multi-Profil Anak](#42-multi-profil-anak)
  - [4.3 Pengukuran & Validasi](#43-pengukuran--validasi)
  - [4.4 Growth Chart WHO/CDC (Placeholder)](#44-growth-chart-whocdc-placeholder)
  - [4.5 Modul Obat + Kalkulator Dosis](#45-modul-obat--kalkulator-dosis)
  - [4.6 Guideline Library](#46-guideline-library)
  - [4.7 Rumus/Kalkulator Pediatrik](#47-rumuskalkulator-pediatrik)
  - [4.8 Reminder Lokal](#48-reminder-lokal)
  - [4.9 Search, Bookmark/Favorit, dan Tag](#49-search-bookmarkfavorit-dan-tag)
  - [4.10 Settings, Backup, dan Safety](#410-settings-backup-dan-safety)
- [5. Routing Halaman](#5-routing-halaman)
- [6. Arsitektur Data Lokal](#6-arsitektur-data-lokal)
- [7. Schema Versioning & Migrasi](#7-schema-versioning--migrasi)
- [8. Seed Data Bawaan](#8-seed-data-bawaan)
- [9. Menjalankan di Lokal](#9-menjalankan-di-lokal)
- [10. Build Produksi](#10-build-produksi)
- [11. Deploy ke Vercel](#11-deploy-ke-vercel)
- [12. Cara Backup & Restore Data](#12-cara-backup--restore-data)
- [13. Kustomisasi Dataset WHO/CDC Asli](#13-kustomisasi-dataset-whocdc-asli)
- [14. Batasan Saat Ini](#14-batasan-saat-ini)
- [15. Troubleshooting](#15-troubleshooting)
- [16. Disclaimer Medis](#16-disclaimer-medis)
- [17. Lisensi & Penggunaan](#17-lisensi--penggunaan)

---

## 1. Ringkasan Proyek

`anak.sobri` adalah web app untuk pencatatan tumbuh-kembang anak yang didesain:

- **Offline-first**: data tetap tersedia di browser user.
- **Frontend-only**: tidak memerlukan server/API.
- **Praktis untuk edukasi & pencatatan**: bukan alat diagnosis atau prescribing.
- **Mudah dipindah perangkat**: data bisa di-export/import JSON.

Aplikasi cocok untuk penggunaan pribadi/klinik kecil sebagai alat bantu dokumentasi cepat.

---

## 2. Tujuan & Prinsip Desain

1. **Cepat dipakai**: UI modern, clean, mobile-friendly.
2. **Data ownership**: semua data milik user di browser lokal.
3. **Resilient**: schema versioning + migrasi untuk kompatibilitas data lama.
4. **Modular**: mudah tambah fitur, dataset growth, dan guideline.
5. **Aman secara komunikasi**: selalu menampilkan konteks bahwa ini alat edukasi/catatan.

---

## 3. Stack Teknologi

- **React 18** + **TypeScript**
- **Vite** (dev server + build)
- **React Router** (routing halaman)
- **Zustand** (state management ringan)
- **Zod** (validasi data input)
- **Recharts** (visualisasi growth chart)
- **Lucide React** (icon UI)
- **UUID** (ID unik pada entitas data)

---

## 4. Fitur Utama

### 4.1 Dashboard

- Ringkasan jumlah anak aktif.
- Menampilkan input pengukuran terakhir.
- Menampilkan reminder overdue.
- Quick shortcut ke halaman data penting.

### 4.2 Multi-Profil Anak

- Tambah/edit/hapus profil anak.
- Data profil mencakup: nama, tanggal lahir, jenis kelamin, status prematur, usia gestasi, data lahir (BB/PB/LK).
- Setiap profil punya histori data sendiri.

### 4.3 Pengukuran & Validasi

- Input pengukuran: berat, panjang/tinggi, lingkar kepala, catatan.
- Validasi angka menggunakan **zod** agar input lebih aman.
- Histori pengukuran tersimpan lokal dan bisa dihapus.

### 4.4 Growth Chart WHO/CDC (Placeholder)

- Grafik interaktif menggunakan Recharts.
- Kurva referensi saat ini adalah **placeholder JSON** untuk WHO/CDC.
- Siap diganti ke dataset asli (LMS/z-score/percentile) tanpa ubah arsitektur besar.
- Status interpretasi dasar (contoh: underweight/normal/overweight) tersedia.

### 4.5 Modul Obat + Kalkulator Dosis

- Master database obat generik lokal (editable).
- Menyimpan template dosis per anak (mg/kg/dosis, interval, max dose, konsentrasi).
- Kalkulator non-preskriptif:
  - Input BB (kg)
  - Hitung hasil mg/dose
  - Konversi ke mL/dose bila konsentrasi tersedia

### 4.6 Guideline Library

- Artikel ringkas per topik (demam, diare, ISPA, nutrisi, imunisasi, dsb).
- Dapat ditag dan dibookmark/favorit untuk akses cepat.

### 4.7 Rumus/Kalkulator Pediatrik

Termasuk kalkulator berikut:

- Konversi unit: kg↔g, cm↔m, °C↔°F
- BMI (kg/m²)
- BSA (Mosteller)
- Laju infus mL/jam
- Tetes/menit (dengan drop factor)
- Maintenance cairan (100/50/20)
- Defisit cairan sederhana (berbasis persentase input)
- Hasil rumus dapat disimpan sebagai catatan

### 4.8 Reminder Lokal

- Reminder imunisasi/kontrol/obat/lainnya.
- Penanda done/not done.
- Badge overdue untuk item terlewat.

### 4.9 Search, Bookmark/Favorit, dan Tag

- Global search lintas entitas (anak/obat/guideline).
- Label/tag untuk pengelompokan.
- Favorit untuk akses cepat.

### 4.10 Settings, Backup, dan Safety

- Toggle dark mode.
- Export semua data aplikasi ke JSON.
- Import JSON dengan validasi + migrasi schema.
- Reset data lokal.
- Catatan privasi + medical disclaimer.

---

## 5. Routing Halaman

Struktur route utama:

- `/` → Dashboard
- `/anak` → Daftar anak
- `/anak/:id` → Detail anak (tabs: Profil | Pengukuran | Grafik | Obat | Catatan | Reminder)
- `/growth` → Grafik pertumbuhan lengkap
- `/obat` → Database obat + kalkulator dosis
- `/rumus` → Koleksi rumus/kalkulator pediatrik
- `/guideline` → Library guideline
- `/settings` → Tema + export/import + reset
- `/about` → Disclaimer + sumber referensi

---

## 6. Arsitektur Data Lokal

Semua data disimpan dalam satu object aplikasi dengan `storageVersion`, meliputi:

- `children`
- `measurements`
- `reminders`
- `guidelines`
- `drugs`
- `doseTemplates`
- `notes`
- `formulaResults`
- `growth` setting (WHO/CDC + metrik)
- `darkMode`

Semua ID menggunakan UUID agar stabil saat CRUD dan merge data backup.

---

## 7. Schema Versioning & Migrasi

Mekanisme inti:

1. **Load data** dari LocalStorage.
2. Jika versi lama terdeteksi → jalankan **migrasi**.
3. Validasi struktur data dengan zod.
4. Simpan ulang data dalam versi terbaru.

Tujuan:
- mencegah data rusak saat aplikasi berkembang,
- menjaga kompatibilitas backup lama.

---

## 8. Seed Data Bawaan

Aplikasi menyertakan seed awal agar langsung bisa dicoba:

- 1 profil anak contoh
- 10 guideline contoh
- 18 obat umum pediatrik (placeholder terstruktur)

Semua seed bisa diubah/dihapus oleh user.

---

## 9. Menjalankan di Lokal

### Prasyarat

- Node.js 18+ (disarankan 20+)
- npm 9+

### Langkah

```bash
npm i
npm run dev
```

Lalu buka URL yang tampil di terminal (biasanya `http://localhost:5173`).

---

## 10. Build Produksi

```bash
npm run build
npm run preview
```

Output build ada di folder `dist`.

---

## 11. Deploy ke Vercel

### Opsi 1: Via Dashboard Vercel

1. Push repo ke Git provider (GitHub/GitLab/Bitbucket).
2. Import project di Vercel.
3. Gunakan konfigurasi:
   - **Framework Preset**: `Vite`
   - **Install Command**: `npm i`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Environment Variables**: `none`
4. Klik Deploy.

### Opsi 2: Vercel CLI

```bash
npm i -g vercel
vercel
vercel --prod
```

> Tidak memerlukan backend/API key untuk aplikasi ini.

---

## 12. Cara Backup & Restore Data

### Export

1. Masuk ke halaman **Settings**.
2. Klik tombol export/copy backup JSON.
3. Simpan JSON di tempat aman.

### Import/Restore

1. Masuk ke **Settings**.
2. Paste JSON backup.
3. Jalankan import.
4. Aplikasi akan:
   - cek versi schema,
   - migrasi bila perlu,
   - validasi struktur,
   - load data ke state + LocalStorage.

---

## 13. Kustomisasi Dataset WHO/CDC Asli

Saat ini growth dataset masih placeholder. Untuk produksi klinis yang lebih presisi:

1. Siapkan dataset WHO/CDC resmi (format LMS/percentile).
2. Simpan pada module data growth terpisah.
3. Implementasikan fungsi:
   - hitung z-score,
   - konversi percentile,
   - interpretasi status berdasarkan standar aktif.
4. Sambungkan ke chart + label interpretasi.

Arsitektur sekarang sudah dipisah (`utils/growth.ts`) agar migrasi ini mudah.

---

## 14. Batasan Saat Ini

- Dataset growth masih placeholder.
- Belum ada sinkronisasi antar perangkat (karena sengaja tanpa backend).
- Belum ada PWA service worker khusus (tetap offline untuk data lokal setelah app termuat).
- Kalkulator dosis bersifat edukasi/non-preskriptif.

---

## 15. Troubleshooting

### `npm i` gagal karena 403/blocked registry

Kemungkinan environment membatasi akses ke npm registry. Solusi:

- coba jaringan lain,
- cek `.npmrc`/proxy,
- gunakan mirror registry yang diizinkan organisasi.

### Data hilang setelah clear browser storage

Karena penyimpanan ada di LocalStorage, maka data terhapus jika storage dibersihkan.  
**Selalu backup JSON berkala**.

### Import JSON gagal

- Pastikan JSON valid.
- Pastikan struktur sesuai schema aplikasi.
- Cek apakah file backup bukan hasil edit manual yang merusak field penting.

---

## 16. Disclaimer Medis

⚠️ **PENTING**: aplikasi ini adalah alat **catatan dan edukasi**.

- Bukan pengganti penilaian klinis dokter.
- Bukan alat diagnosis final.
- Bukan alat prescribing.
- Semua keputusan klinis harus divalidasi tenaga medis berwenang.

---

## 17. Lisensi & Penggunaan

Silakan sesuaikan lisensi dengan kebutuhan organisasi/proyek Anda.  
Disarankan menambahkan file `LICENSE` terpisah untuk penggunaan publik.

---

### Referensi Umum

- WHO Growth Standards
- CDC Growth Charts
- Panduan klinis pediatri nasional/lokal

