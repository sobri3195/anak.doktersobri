# Rekomendasi UI/UX & Fitur Prioritas — anak.sobri

## 1) Masalah UI/UX yang terlihat dari layar ini

1. **Hierarki visual belum tegas di area konten utama.** Judul "Grafik Pertumbuhan (WHO)", label mode metrik, dan status terakhir terlihat setara bobotnya sehingga pengguna sulit tahu fokus utama halaman.
2. **Chart terlihat seperti “kosong” (weak empty state).** Ada area grafik besar tetapi tidak memberi panduan tindakan saat data belum cukup.
3. **CTA utama belum mengikuti task paling sering.** Tombol global `+ Anak` dan `+ Hitung` di top bar berpotensi kalah penting dari CTA kontekstual seperti `Tambah Pengukuran` saat user sedang melihat grafik anak.
4. **Label metrik “BB_U” terlalu teknis untuk non-klinis.** Singkatan ini membingungkan orang tua; perlu label human-friendly plus penjelasan singkat.
5. **Informasi status “Normal” minim konteks.** Tidak jelas normal terhadap metrik apa, tanggal ukur terakhir, dan apakah ada tren memburuk/membaik.
6. **Sidebar panjang berisiko membuat orientasi lemah.** Banyak menu setara prioritas; kemungkinan user bingung urutan alur (profil anak → input ukur → interpretasi → aksi).
7. **Search bar terlalu generik.** Placeholder “Cari anak/obat/guideline/rumus” mencampur domain berbeda; hasil pencarian bisa terasa tidak presisi.
8. **Whitespace kemungkinan belum dipakai untuk grouping informasi.** Elemen status, filter metrik, range waktu, dan chart semestinya dipisah dalam kartu/section yang jelas.
9. **Kurang feedback terhadap data quality.** Tidak ada indikator “data terakhir X hari lalu”, “jumlah titik data”, atau “perlu ukur ulang”.
10. **Komponen chart belum membangun trust klinis.** Belum terlihat kurva referensi WHO (Z-score), satuan sumbu, dan legenda yang membantu interpretasi.

---

## 2) Perbaikan UI prioritas (quick wins)

### A. Layout & spacing (langsung implementable)
- Terapkan grid 12 kolom desktop: sidebar tetap, konten dengan max-width (mis. 1200–1280px) agar fokus.
- Gunakan spacing konsisten (8pt scale): 8/12/16/24/32 untuk margin/padding kartu.
- Pisahkan halaman Growth menjadi 3 blok:
  1) Header konteks anak + CTA utama,
  2) Ringkasan status (metric chips),
  3) Area chart + insight.

### B. Hierarki tipografi
- H1 halaman (24–28, semibold), subtitle (14–16, regular), label sekunder (12–13).
- Status klinis gunakan badge kontras tinggi + ikon (Normal, Perlu Pantau, Perlu Evaluasi).
- Kurangi ALL CAPS/singkatan tanpa deskripsi.

### C. Warna & komponen status
- Gunakan semantic colors:
  - Hijau = Normal,
  - Kuning = Risiko ringan/perlu pantau,
  - Merah = Di luar rentang/rujuk.
- Tambahkan info strip di atas chart: “Pengukuran terakhir 12 Jan 2026 • 6 data tersedia”.

### D. CTA dan prioritas aksi
- Jadikan tombol primer di halaman Growth: **`Tambah Pengukuran`**.
- `+ Hitung` dipindah jadi aksi sekunder atau menu dropdown (karena tidak sesering input data).
- `+ Anak` tetap global tetapi tidak mengganggu konteks ketika user sudah memilih anak.

### E. Quick-win pada navigasi
- Kelompokkan sidebar:
  - **Pemantauan**: Dashboard, Anak, Growth
  - **Referensi**: Obat, Rumus, Guideline
  - **Sistem**: Settings, About
- Tambahkan highlight aktif yang lebih tegas + breadcrumb di konten.

### Contoh microcopy yang lebih jelas
- Judul kartu:
  - Dari: `Grafik Pertumbuhan (WHO)`
  - Menjadi: **`Pertumbuhan Anak (Standar WHO)`**
- Label metrik:
  - Dari: `Mode metrik aktif: BB_U`
  - Menjadi: **`Metrik aktif: Berat badan menurut umur (BB/U)`**
- Status:
  - Dari: `Status terakhir: Normal`
  - Menjadi: **`Status pengukuran terakhir (12 Jan 2026): Normal`**
- Empty state:
  - **`Belum ada data pengukuran.`**
  - **`Mulai dengan menambahkan berat/tinggi pertama untuk melihat kurva pertumbuhan.`**
  - Tombol: **`Tambah Pengukuran Pertama`**

---

## 3) Perbaikan chart “Grafik Pertumbuhan (WHO)”

## Elemen wajib chart
1. **Legenda jelas**
   - Kurva WHO: -3 SD, -2 SD, median, +2 SD, +3 SD.
   - Garis/titik anak: warna berbeda tegas.
2. **Sumbu dan unit**
   - X: Umur (bulan) untuk 0–60 bulan (opsi 0–24 untuk bayi).
   - Y bergantung metrik:
     - BB/U: kg,
     - TB/U atau PB/U: cm,
     - IMT/U: kg/m².
3. **Rentang umur & filter metrik**
   - Toggle metrik: BB/U, TB/U/PB/U, BB/TB, IMT/U, LK/U.
   - Range waktu: 3 bln, 6 bln, 12 bln, Semua.
4. **Titik data anak**
   - Titik dengan marker jelas, garis penghubung halus.
   - Titik terbaru diberi ring/highlight.
5. **Tooltip informatif**
   - Tanggal ukur, umur tepat (bulan+hari), nilai, Z-score, kategori WHO.
6. **Highlight status**
   - Banner kecil di atas chart: “Z-score terakhir -0.8 (Normal)”.
7. **Annotasi kualitas data**
   - Tampilkan warning jika interval ukur terlalu jauh (mis. >90 hari).

## Skenario tampilan chart
### (a) Belum ada data
- Tampilkan ilustrasi empty state + 2 bullet panduan.
- CTA primer: `Tambah Pengukuran Pertama`.
- Sembunyikan legenda kompleks agar tidak membingungkan.

### (b) Data sedikit (1–3 titik)
- Tetap tampilkan kurva WHO + titik data.
- Teks bantu: “Data masih terbatas, tren belum stabil.”
- CTA sekunder: `Atur Pengingat Pengukuran`.

### (c) Data banyak (>=4 titik)
- Tampilkan line trend, marker terbaru, dan mini insight otomatis:
  - “Kenaikan 3 bulan terakhir: +0.9 kg”
  - “Posisi terhadap median WHO: -0.6 SD”.
- Tambahkan opsi export PNG/PDF langsung dari kartu chart.

---

## 4) Fitur baru relevan untuk user (prioritas P0/P1/P2)

## P0 (harus ada dulu)
1. **Manajemen profil multi-anak**
   - Nama, tanggal lahir, jenis kelamin, status prematur/koreksi umur.
2. **Input pengukuran terstruktur + validasi**
   - Berat, tinggi/panjang, lingkar kepala, tanggal ukur.
   - Validasi rentang biologis + deteksi salah input (contoh 3kg jadi 30kg).
3. **Interpretasi WHO otomatis**
   - Status: Normal/Underweight/Stunting/Wasting/risiko.
   - Penjelasan singkat “apa artinya” + langkah disarankan.
4. **Dashboard status per anak**
   - Kartu ringkas: status terbaru, tanggal ukur terakhir, aksi berikutnya.

## P1 (sangat penting berikutnya)
1. **Reminder pengukuran/imunisasi/kontrol** (in-app + opsional WhatsApp/email).
2. **Riwayat kunjungan & catatan klinis singkat**.
3. **Export & share**
   - PDF ringkasan pertumbuhan + PNG chart untuk konsultasi dokter.
4. **Role-based access ringan**
   - Orang tua vs tenaga kesehatan (hak edit/lihat berbeda).

## P2 (penguatan jangka menengah)
1. **Mode offline + sinkronisasi saat online**.
2. **Audit log perubahan data** (siapa mengubah apa, kapan).
3. **Insight prediktif sederhana**
   - mis. estimasi jadwal ukur ideal berikutnya berdasarkan histori.

---

## 5) Perbaikan navigasi & alur kerja

## User flow ideal
1. **Pilih Anak** (dari switcher di top bar atau halaman Anak).
2. **Input Pengukuran** (CTA primer selalu terlihat di halaman Growth).
3. **Lihat Grafik & Status** (hasil otomatis muncul + interpretasi WHO).
4. **Saran Tindakan** (mis. “ukur ulang 2 minggu”, “konsultasi puskesmas”).
5. **Simpan & Share** (export PDF/PNG, bagikan ke dokter/keluarga).

## Rekomendasi penempatan CTA
- Top bar: pertahankan `+ Anak` sebagai global action.
- Halaman Growth (sticky di kanan atas konten):
  - **Primer:** `Tambah Pengukuran`
  - **Sekunder:** `Hitung Manual` / `Export`
- Di empty state chart: tombol besar `Tambah Pengukuran Pertama`.

---

## 6) Aksesibilitas & responsif (checklist minimal)

1. Kontras teks minimal WCAG AA (4.5:1 untuk body text).
2. Ukuran font minimum 14px untuk konten utama; line-height 1.4–1.6.
3. Focus state terlihat jelas untuk semua tombol/input/link.
4. Semua fungsi penting bisa diakses keyboard (Tab/Enter/Esc).
5. Label form eksplisit + helper/error text yang terbaca screen reader.
6. Area klik minimum 40x40 px.
7. Mobile layout:
   - Sidebar menjadi bottom nav/drawer,
   - Chart bisa horizontal scroll atau mode ringkas,
   - CTA `Tambah Pengukuran` tetap sticky.

---

## 7) Ringkasan 10 poin paling penting

1. Ubah CTA utama di Growth menjadi **Tambah Pengukuran**.
2. Ganti label teknis `BB_U` ke label ramah pengguna + singkatan dalam kurung.
3. Perjelas status dengan konteks tanggal dan nilai Z-score terakhir.
4. Perbaiki empty state chart dengan panduan tindakan dan tombol langsung.
5. Tambahkan kurva WHO lengkap + legenda SD + tooltip klinis.
6. Tampilkan kualitas data (jumlah titik, terakhir diukur kapan).
7. Susun ulang sidebar berdasarkan grup tugas, bukan daftar datar panjang.
8. Terapkan sistem spacing/typography konsisten agar hierarki visual kuat.
9. Prioritaskan fitur P0: multi-anak, input+validasi, interpretasi WHO otomatis.
10. Lengkapi aksesibilitas dan responsif agar usable di mobile + keyboard.

---

## 8) Mock struktur layout (wireframe ASCII)

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ [Logo]  Dashboard Anak Growth ...                    [Search.............]  │
│                                                     [+ Anak] [Tambah Ukur] │
├───────────────┬──────────────────────────────────────────────────────────────┤
│ SIDEBAR       │ Anak: Aisyah (2 th 3 bln)   Status: Normal (Z -0.8)         │
│ - Pemantauan  │ Pengukuran terakhir: 12 Jan 2026  |  Data: 6 titik           │
│ - Referensi   │--------------------------------------------------------------│
│ - Sistem      │ Metrik: [BB/U▼]  Rentang: [12 bln▼]      [Export] [Share]    │
│               │ ┌──────────────────────────────────────────────────────────┐  │
│               │ │ Pertumbuhan Anak (Standar WHO)                          │  │
│               │ │ Legend: -3SD -2SD Median +2SD +3SD | ● Data Anak        │  │
│               │ │                                                          │  │
│               │ │                (Chart WHO + line anak)                  │  │
│               │ │                                                          │  │
│               │ └──────────────────────────────────────────────────────────┘  │
│               │ Insight: Tren 3 bulan +0.9 kg | Saran: ukur ulang 30 hari   │
└───────────────┴──────────────────────────────────────────────────────────────┘
```
