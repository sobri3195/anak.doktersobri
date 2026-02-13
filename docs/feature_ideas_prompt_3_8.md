# Konsep Fitur Prompt 3–8 — anak.sobri

Dokumen ini merangkum ide fitur dan struktur UI sesuai permintaan Prompt 3–8: interpretasi WHO otomatis, riwayat pengukuran, reminder, export/share, multi-anak, dan mode offline.

---

## Prompt 3 — Interpretasi WHO (Z-score) + edukasi

### Tujuan
Memberikan interpretasi otomatis hasil pengukuran (BB/U, TB/U, BB/TB) dalam bentuk status klinis, penjelasan ringkas, dan tindakan yang disarankan.

### Logika Status (contoh ringkas WHO)
| Metrik | Threshold | Status | Penjelasan Singkat | Tindakan Disarankan |
|---|---|---|---|---|
| BB/U | Z < -2 | Underweight | Berat badan di bawah standar untuk usia. | Evaluasi pola makan, pantau 2–4 minggu, konsultasi bila berlanjut. |
| BB/U | -2 ≤ Z ≤ +2 | Normal | Berat badan sesuai standar usia. | Lanjutkan pola makan seimbang, ukur rutin bulanan. |
| TB/U | Z < -2 | Stunting | Tinggi badan di bawah standar usia. | Perhatikan asupan protein & mikronutrien, evaluasi faktor kesehatan. |
| TB/U | -2 ≤ Z ≤ +2 | Normal | Tinggi sesuai standar usia. | Pantau berkala, pertahankan nutrisi. |
| BB/TB | Z < -2 | Wasting | Berat badan rendah terhadap tinggi badan. | Periksa asupan energi, infeksi, rujuk bila ada penurunan cepat. |
| BB/TB | -2 ≤ Z ≤ +2 | Normal | Proporsi berat terhadap tinggi badan sesuai. | Pertahankan pola makan & aktivitas. |

> Catatan: Tampilkan disclaimer singkat “Bukan diagnosis. Konsultasikan ke tenaga kesehatan jika ada kekhawatiran.”

### Contoh Tampilan Kartu Hasil (UI)
```
┌──────────────────────────────────────────────────────────────┐
│ Status WHO (BB/U)                                            │
│ ------------------------------------------------------------ │
│ Z-score terakhir: -2.3  •  Underweight 🔶                    │
│ “Berat badan lebih rendah dari standar usia.”                │
│                                                              │
│ Saran tindakan:                                              │
│ • Evaluasi asupan makan harian                               │
│ • Pantau ulang dalam 2–4 minggu                              │
│ • Konsultasi jika tren menurun                               │
│                                                              │
│ [Lihat Detail]  [Atur Pengingat Pengukuran]                  │
└──────────────────────────────────────────────────────────────┘
```

### Komponen UI
- **Badge status**: Normal (hijau), Underweight/Stunting/Wasting (kuning/merah).
- **Ringkas**: 1–2 kalimat edukasi.
- **CTA**: “Atur pengingat” + “Lihat detail”.

---

## Prompt 4 — Riwayat Pengukuran (tabel + timeline)

### Ide Fitur
Riwayat pengukuran ditampilkan dalam dua mode: **tabel** dan **timeline**. Keduanya terintegrasi dengan filter, pencarian cepat, serta aksi edit/hapus.

### Fitur Utama
- **Filter**: Bulan (dropdown), jenis metrik (BB/TB/LK/IMT/BB/TB), status (Normal/Risiko).
- **Highlight anomali**: nilai outlier atau selisih besar antar pengukuran (>2 SD atau >X% perubahan).
- **Edit/Hapus**: tombol aksi per baris + konfirmasi.
- **Akses cepat**: klik baris untuk buka detail.

### Struktur UI (ASCII)
```
┌──────────────────────────────────────────────────────────────┐
│ Riwayat Pengukuran                                           │
│ [Bulan ▼] [Metrik ▼] [Status ▼] [Cari…]                      │
├───────────────────────────┬──────────────────────────────────┤
│ TABEL                     │ TIMELINE                         │
│ Date | Age | BB | TB | Z  │ • 12 Jan 2026  ✅ Normal         │
│ 12/1 | 24m | 12.2| 85| -0.4│ • 10 Des 2025  ⚠️ Anomali       │
│ 10/12| 23m | 10.1| 84| -2.8│ • 12 Nov 2025  ✅ Normal        │
│ [Edit] [Hapus]            │                                  │
└───────────────────────────┴──────────────────────────────────┘
```

### Highlight Anomali
- **Warna baris**: kuning/merah.
- **Badge**: “Δ besar” atau “Di luar rentang”.
- **Tooltip**: ringkasan peringatan.

---

## Prompt 5 — Reminder Pengukuran & Imunisasi

### Tujuan
Mengatur pengingat berkala (mingguan/bulanan) untuk pengukuran dan jadwal imunisasi, dilengkapi notifikasi dan tampilan kalender.

### Flow Pengaturan
1. **Pilih jenis reminder**: Pengukuran / Imunisasi.
2. **Pilih anak** (default anak aktif).
3. **Atur jadwal**: mingguan/bulanan + tanggal/jam.
4. **Notifikasi**: in-app + opsi sistem (browser notification).
5. **Konfirmasi**: ringkasan jadwal & CTA “Aktifkan”.

### State UI
- **Empty**: “Belum ada reminder aktif.”
- **Active**: daftar reminder + status “Next: 12 Feb 09:00”.
- **Snoozed**: tombol “Aktifkan kembali”.
- **Overdue**: badge merah + CTA “Ukur sekarang”.

### Tampilan Kalender
- Kalender bulanan dengan **dot** untuk reminder.
- Sidebar “Upcoming” menampilkan 5 reminder terdekat.

```
┌──────────────────────────────────────────────────────────────┐
│ Reminder & Kalender                                           │
│ [Tambah Reminder]                                             │
├─────────────────────────────┬────────────────────────────────┤
│ Kalender (bulan ini)        │ Upcoming                        │
│ [◀] Feb 2026 [▶]            │ • 12 Feb 09:00 – Pengukuran     │
│ 1 2 3 4 5 6 7               │ • 20 Feb 10:00 – Imunisasi      │
│ 8 9 •10 11 •12 13 14        │                                 │
└─────────────────────────────┴────────────────────────────────┘
```

---

## Prompt 6 — Export & Share Dokter

### Fitur
- Export **PDF/PNG** berisi grafik dan ringkasan.
- **Share link** read-only untuk dokter/keluarga.
- Template laporan terstruktur.

### Isi Laporan
1. Identitas anak: nama, DOB, jenis kelamin.
2. Data terakhir: tanggal, BB, TB, LK, usia.
3. Grafik pertumbuhan (WHO) + status.
4. Catatan orang tua (optional).
5. Disclaimer medis.

### UI & Tombol
- Tombol di header Growth: **Export PDF**, **Export PNG**, **Share**.
- Modal export: pilihan range waktu (3/6/12 bulan).

```
┌──────────────────────────────────────────────┐
│ Export & Share                               │
│ [PDF] [PNG] [Share Link]                     │
│ Range: [12 bulan ▼]                          │
│ [Preview Laporan] [Download]                 │
└──────────────────────────────────────────────┘
```

---

## Prompt 7 — Multi-anak & Switcher

### UX
- **Child switcher** di topbar kiri: avatar + nama + dropdown.
- **Search cepat** dalam dropdown (filter nama).
- **Aksi cepat**: tambah anak baru, edit profil.
- **Permission sederhana**: Orang tua (edit penuh), keluarga (lihat & komentar).

### Placement
- Topbar: di samping logo.
- Sidebar: daftar mini anak (optional quick switch).

```
[Avatar Aisyah ▼]  Search anak…
├─ Aisyah (2y)  ✅ aktif
├─ Bimo (6m)
├─ + Tambah Anak
```

---

## Prompt 8 — Mode Offline & Sinkronisasi

### Konsep
Pengguna tetap bisa input pengukuran tanpa internet. Data tersimpan lokal dan otomatis sync saat online.

### Indikator Status Sync
- **Online + synced**: badge hijau “Tersinkron”.
- **Offline**: badge abu “Offline — data disimpan lokal”.
- **Syncing**: spinner + teks “Menyinkron…”.
- **Conflict**: badge merah + modal resolusi.

### Konflik Data
- Tampilkan modal perbandingan data lokal vs data remote.
- Opsi: “Pilih lokal”, “Pilih remote”, “Gabungkan”.

### UI Feedback
- Banner kecil di atas halaman: “Offline mode aktif. Data akan disinkron saat online.”
- Toast sukses saat sync selesai.

```
┌──────────────────────────────────────────────────────────┐
│ ⚪ Offline mode aktif • Data tersimpan lokal              │
└──────────────────────────────────────────────────────────┘
```

---

## Ringkasan Komponen yang Disarankan
- **WHO Result Card** (status + edukasi + CTA)
- **Measurement History Table + Timeline**
- **Reminder Center + Calendar**
- **Export/Share Modal**
- **Child Switcher Dropdown**
- **Sync Status Indicator**
