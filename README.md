# anak.sobri

Aplikasi frontend-only React (Vite + TypeScript) untuk catatan pediatri offline-first.

## Fitur utama
- Dashboard ringkasan, multi-profil anak, pengukuran + grafik pertumbuhan WHO/CDC placeholder.
- Modul obat lokal + template dosis + kalkulator mg/kg ke mL (non-preskriptif).
- Guideline library, reminder lokal, notes/milestone, rumus pediatrik.
- Global search, dark mode, export/import JSON dengan schema versioning & migrasi.
- Semua data disimpan di `LocalStorage`, tanpa backend dan tanpa login.

## Menjalankan lokal
```bash
npm i
npm run dev
```

## Build produksi
```bash
npm run build
npm run preview
```

## Deploy ke Vercel
- Framework Preset: **Vite**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm i`
- Environment Variables: **none**

## Catatan keamanan
Medical disclaimer tersedia di halaman Settings dan About: aplikasi ini untuk edukasi/catatan, bukan pengganti keputusan dokter.
