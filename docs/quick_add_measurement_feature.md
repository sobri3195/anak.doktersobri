# Feature Proposal: Quick Add Pengukuran (BB/TB/LK)

## 📋 Overview
Fitur **Quick Add Pengukuran** memungkinkan pengguna menambahkan data pengukuran (Berat Badan, Tinggi Badan, Lingkar Kepala) secara cepat langsung dari halaman **Growth** tanpa perlu navigasi ke halaman detail anak. Fitur ini meningkatkan efisiensi workflow dan mendorong pengguna untuk mencatat pengukuran secara rutin.

---

## 🎯 Goals & Objectives

| Goal | Description |
|------|-------------|
| **Efficiency** | Mengurangi waktu dan step untuk mencatat pengukuran |
| **Accessibility** | Akses cepat dari halaman Growth yang paling relevan |
| **Data Quality** | Validasi real-time untuk memastikan data akurat |
| **UX Improvement** | Bottom sheet/modal untuk experience mobile-friendly |

---

## 🔄 User Flow

### Primary Flow: Quick Add dari Halaman Growth

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          HALAMAN GROWTH                                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │  Pertumbuhan Anak (Standar WHO)                    [Tambah ▼]  │   │
│   │  Metrik aktif: Berat badan menurut umur (BB/U)                  │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │                                                                 │   │
│   │                     📊 CHART AREA                               │   │
│   │                                                                 │   │
│   │              [+ Tambah Pengukuran Cepat]                        │   │
│   │                     (FAB / CTA Button)                          │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                     BOTTOM SHEET / MODAL                                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │  ──────── Drag Handle ────────                                  │   │
│   │                                                                 │   │
│   │  Tambah Pengukuran                                              │   │
│   │  Aisyah • 24 bulan                                              │   │
│   │                                                                 │   │
│   │  ┌─────────────────────────────────────────────────────────┐   │   │
│   │  │ 📅 Tanggal Pengukuran                                   │   │   │
│   │  │ [12/02/2026                    ] 📆                     │   │   │
│   │  └─────────────────────────────────────────────────────────┘   │   │
│   │                                                                 │   │
│   │  ┌─────────────────────┐  ┌─────────────────────┐              │   │
│   │  │ ⚖️ Berat Badan      │  │ 📏 Tinggi Badan     │              │   │
│   │  │ [      12.5     ]   │  │ [       85      ]   │              │   │
│   │  │        kg           │  │        cm           │              │   │
│   │  │ ℹ️ BB: 8.5-18 kg    │  │ ℹ️ TB: 70-100 cm    │              │   │
│   │  └─────────────────────┘  └─────────────────────┘              │   │
│   │                                                                 │   │
│   │  ┌─────────────────────────────────────────────────────────┐   │   │
│   │  │ 🧠 Lingkar Kepala (opsional)                            │   │   │
│   │  │ [      47.5     ] cm                                    │   │   │
│   │  │ ℹ️ LK: 43-52 cm (untuk usia ini)                        │   │   │
│   │  └─────────────────────────────────────────────────────────┘   │   │
│   │                                                                 │   │
│   │  ┌─────────────────────────────────────────────────────────┐   │   │
│   │  │ 📝 Catatan (opsional)                                   │   │   │
│   │  │ [Tulis catatan tentang pengukuran ini...                ]│   │   │
│   │  └─────────────────────────────────────────────────────────┘   │   │
│   │                                                                 │   │
│   │  ┌─────────────────────────────────────────────────────────┐   │   │
│   │  │ 📊 Prediksi Status (opsional toggle)                    │   │   │
│   │  │ [i] Berdasarkan data: Normal (P25-P75)                  │   │   │
│   │  └─────────────────────────────────────────────────────────┘   │   │
│   │                                                                 │   │
│   │  ┌─────────────────────────────────────────────────────────┐   │   │
│   │  │              [  ❌ Batal  ]  [  ✅ Simpan  ]             │   │   │
│   │  └─────────────────────────────────────────────────────────┘   │   │
│   │                                                                 │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         SUCCESS STATE                                   │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │                    ✅ Tersimpan!                                  │   │
│   │         Pengukuran berhasil ditambahkan                         │   │
│   │                                                                 │   │
│   │   📊 Grafik pertumbuhan akan diperbarui                         │   │
│   │   📈 Status: Normal (P50-P75)                                   │   │
│   │                                                                 │   │
│   │              [ 👍 Tambah Lagi ]  [ ✕ Tutup ]                    │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Alternative Flows

#### Flow A: Multiple Children
```
Jika ada >1 anak:
1. Tampilkan dropdown pemilihan anak di atas form
2. Default: anak yang sedang aktif di halaman Growth
```

#### Flow B: Measurement Date in Future
```
Jika tanggal > hari ini:
→ Error: "Tanggal pengukuran tidak boleh di masa depan"
```

#### Flow C: Duplicate Date
```
Jika sudah ada pengukuran di tanggal sama:
→ Warning: "Sudah ada data untuk tanggal ini. Ganti data lama?"
→ Options: [Timpa] [Gabung] [Batal]
```

---

## ✅ Validasi (Unit & Rentang Wajar)

### 1. Validasi Umum

| Field | Validasi | Error Message |
|-------|----------|---------------|
| **Tanggal** | Tidak boleh > hari ini | "Tanggal tidak boleh di masa depan" |
| **Tanggal** | Format valid (YYYY-MM-DD) | "Format tanggal tidak valid" |

### 2. Validasi Berat Badan (BB)

| Kategori | Rentang Valid | Rentang Wajar | Warning Message |
|----------|---------------|---------------|-----------------|
| **Unit** | Kilogram (kg) | - | - |
| **Minimum** | > 0 kg | ≥ 0.5 kg | "Berat badan terlalu kecil untuk bayi/anak" |
| **Maximum** | ≤ 100 kg | ≤ 60 kg | "Berat badan melebihi rentang normal" |
| **Precision** | 2 desimal | - | "Maksimal 2 angka desimal (contoh: 12.55)" |

**Rentang Berdasarkan Usia (referensi WHO):**

| Usia | BB Min (kg) | BB Max (kg) | Warning Jika |
|------|-------------|-------------|--------------|
| 0-1 bulan | 2.0 | 5.5 | < 2.0 atau > 5.5 |
| 1-6 bulan | 3.5 | 10.0 | < 3.5 atau > 10.0 |
| 6-12 bulan | 6.0 | 12.0 | < 6.0 atau > 12.0 |
| 1-2 tahun | 8.0 | 16.0 | < 8.0 atau > 16.0 |
| 2-5 tahun | 10.0 | 24.0 | < 10.0 atau > 24.0 |
| 5-10 tahun | 14.0 | 45.0 | < 14.0 atau > 45.0 |

### 3. Validasi Tinggi Badan (TB)

| Kategori | Rentang Valid | Rentang Wajar | Warning Message |
|----------|---------------|---------------|-----------------|
| **Unit** | Sentimeter (cm) | - | - |
| **Minimum** | > 0 cm | ≥ 40 cm | "Tinggi badan terlalu kecil" |
| **Maximum** | ≤ 200 cm | ≤ 150 cm | "Tinggi badan melebihi rentang normal" |
| **Precision** | 1 desimal | - | "Maksimal 1 angka desimal (contoh: 85.5)" |

**Rentang Berdasarkan Usia:**

| Usia | TB Min (cm) | TB Max (cm) | Warning Jika |
|------|-------------|-------------|--------------|
| 0-1 bulan | 45 | 58 | < 45 atau > 58 |
| 1-6 bulan | 55 | 75 | < 55 atau > 75 |
| 6-12 bulan | 65 | 82 | < 65 atau > 82 |
| 1-2 tahun | 70 | 95 | < 70 atau > 95 |
| 2-5 tahun | 80 | 115 | < 80 atau > 115 |
| 5-10 tahun | 100 | 145 | < 100 atau > 145 |

### 4. Validasi Lingkar Kepala (LK) - Opsional

| Kategori | Rentang Valid | Rentang Wajar | Warning Message |
|----------|---------------|---------------|-----------------|
| **Unit** | Sentimeter (cm) | - | - |
| **Minimum** | > 0 cm | ≥ 28 cm | "LK terlalu kecil" |
| **Maximum** | ≤ 65 cm | ≤ 60 cm | "LK melebihi rentang normal" |
| **Precision** | 1 desimal | - | "Maksimal 1 angka desimal" |

**Rentang Berdasarkan Usia:**

| Usia | LK Min (cm) | LK Max (cm) | Warning Jika |
|------|-------------|-------------|--------------|
| 0-1 bulan | 32 | 38 | < 32 atau > 38 |
| 1-6 bulan | 38 | 45 | < 38 atau > 45 |
| 6-12 bulan | 42 | 48 | < 42 atau > 48 |
| 1-2 tahun | 44 | 50 | < 44 atau > 50 |
| 2-5 tahun | 46 | 53 | < 46 atau > 53 |

### 5. Logika Validasi Real-time

```typescript
// Pseudo-code untuk validasi
interface ValidationResult {
  isValid: boolean;
  isWarning: boolean;
  message?: string;
}

function validateMeasurement(
  value: number,
  type: 'weight' | 'height' | 'headCircumference',
  ageMonths: number
): ValidationResult {
  // 1. Cek nilai dasar
  if (value <= 0) {
    return { isValid: false, isWarning: false, message: 'Nilai harus lebih dari 0' };
  }

  // 2. Cek precision
  const decimals = (value.toString().split('.')[1] || '').length;
  const maxDecimals = type === 'weight' ? 2 : 1;
  if (decimals > maxDecimals) {
    return { isValid: false, isWarning: false, message: `Maksimal ${maxDecimals} desimal` };
  }

  // 3. Cek rentang wajar berdasarkan usia
  const range = getExpectedRange(type, ageMonths);
  
  if (value < range.min || value > range.max) {
    return {
      isValid: true, // Masih bisa disimpan
      isWarning: true,
      message: `Nilai di luar rentang wajar (${range.min}-${range.max})`
    };
  }

  return { isValid: true, isWarning: false };
}
```

---

## 🎨 UI Komponen

### 1. QuickAddButton (Trigger)

```typescript
interface QuickAddButtonProps {
  childId: string;
  childName: string;
  variant: 'fab' | 'button' | 'inline';
  onClick: () => void;
}
```

**Variants:**
- **FAB (Floating Action Button)**: Muncul di kanan bawah chart area
- **Button**: Tombol biasa di header
- **Inline**: Link teks dalam empty state

### 2. QuickAddModal (Bottom Sheet)

```typescript
interface QuickAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  childId: string;
  childName: string;
  childAgeMonths: number;
  onSave: (data: QuickAddData) => void;
}

interface QuickAddData {
  date: string;
  weightKg: number;
  heightCm: number;
  headCircumferenceCm?: number;
  note?: string;
}
```

**Layout Structure:**
```
┌─────────────────────────────────────┐
│  ─────── Drag Handle ───────        │  // Swipe to dismiss
├─────────────────────────────────────┤
│  Header                             │
│  - Title: "Tambah Pengukuran"       │
│  - Subtitle: "{ChildName} • {Age}"  │
├─────────────────────────────────────┤
│  Form Body                          │
│  - DateInput (with calendar icon)   │
│  - MeasurementInputs (grid 2-col)   │
│  - NoteInput (textarea)             │
│  - PreviewCard (status prediction)  │
├─────────────────────────────────────┤
│  Footer                             │
│  - Cancel Button  │  Save Button   │
└─────────────────────────────────────┘
```

### 3. MeasurementInput Component

```typescript
interface MeasurementInputProps {
  label: string;
  icon: React.ReactNode;
  value: number | '';
  unit: 'kg' | 'cm';
  min: number;
  max: number;
  expectedRange: { min: number; max: number };
  validation: ValidationResult;
  onChange: (value: number) => void;
  onBlur: () => void;
}
```

**States:**
- **Default**: Border gray, placeholder visible
- **Focus**: Border primary color, subtle shadow
- **Valid**: Border green, check icon
- **Warning**: Border orange/yellow, warning icon + tooltip
- **Error**: Border red, error message below

### 4. SuccessToast Component

```typescript
interface SuccessToastProps {
  isVisible: boolean;
  childName: string;
  weightStatus: string;
  onAddAnother: () => void;
  onClose: () => void;
}
```

---

## 📱 Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| **Mobile (< 640px)** | Full-screen bottom sheet dengan snap points (50%, 85%) |
| **Tablet (640-1024px)** | Centered modal, max-width 480px |
| **Desktop (> 1024px)** | Centered modal, max-width 520px, overlay backdrop |

### Mobile Bottom Sheet Specs:
- **Initial height**: 60% viewport
- **Expanded height**: 85% viewport
- **Dismiss**: Swipe down atau tap backdrop
- **Snap points**: 60%, 85%
- **Animation**: Spring physics (300ms)

---

## 🗂️ State Management

### Zustand Store Update

```typescript
// Tambahan di store
interface QuickAddState {
  isQuickAddOpen: boolean;
  quickAddChildId: string | null;
  
  openQuickAdd: (childId: string) => void;
  closeQuickAdd: () => void;
}

// Integration dengan existing measurement store
interface MeasurementActions {
  addMeasurement: (data: Omit<Measurement, 'id'>) => void;
  checkDuplicateDate: (childId: string, date: string) => boolean;
}
```

---

## 📋 Daftar Requirement P0

### P0 - Must Have (Critical)

#### R1. Trigger Component
- [ ] **R1.1** FAB "+" di kanan bawah area chart Growth
- [ ] **R1.2** FAB muncul hanya ketika ada data anak yang dipilih
- [ ] **R1.3** FAB dengan animasi pulse saat data pengukuran < 3

#### R2. Modal/Bottom Sheet
- [ ] **R2.1** Bottom sheet untuk mobile (< 640px)
- [ ] **R2.2** Centered modal untuk tablet/desktop
- [ ] **R2.3** Header dengan nama anak dan usia
- [ ] **R2.4** Tombol close (X) dan swipe-down to dismiss
- [ ] **R2.5** Animasi open/close smooth (300ms)

#### R3. Form Input
- [ ] **R3.1** Input tanggal dengan date picker native
- [ ] **R3.2** Default tanggal = hari ini
- [ ] **R3.3** Input berat badan (kg) dengan 2 desimal
- [ ] **R3.4** Input tinggi badan (cm) dengan 1 desimal
- [ ] **R3.5** Input lingkar kepala (cm) opsional
- [ ] **R3.6** Input catatan (textarea) opsional
- [ ] **R3.7** Label input dengan icon visual

#### R4. Validasi Real-time
- [ ] **R4.1** Validasi tanggal ≤ hari ini
- [ ] **R4.2** Validasi BB > 0 dan ≤ 100 kg
- [ ] **R4.3** Validasi TB > 0 dan ≤ 200 cm
- [ ] **R4.4** Validasi LK > 0 dan ≤ 65 cm (jika diisi)
- [ ] **R4.5** Warning jika nilai di luar rentang usia
- [ ] **R4.6** Error state dengan pesan jelas
- [ ] **R4.7** Disable submit jika ada error validasi

#### R5. Submit & Save
- [ ] **R5.1** Tombol "Simpan" disabled sampai BB dan TB terisi
- [ ] **R5.2** Loading state saat menyimpan
- [ ] **R5.3** Generate ID unik untuk measurement baru
- [ ] **R5.4** Simpan ke LocalStorage (existing store)
- [ ] **R5.5** Update chart Growth secara real-time

#### R6. Success Feedback
- [ ] **R6.1** Toast notification "Pengukuran tersimpan"
- [ ] **R6.2** Auto-close modal setelah 1.5 detik
- [ ] **R6.3** Chart update dengan data baru
- [ ] **R6.4** Status indicator update (Normal/Stunted/dll)

#### R7. Accessibility
- [ ] **R7.1** Semua input memiliki label yang terasosiasi
- [ ] **R7.2** Focus trap dalam modal
- [ ] **R7.3** Escape key untuk close modal
- [ ] **R7.4** ARIA labels untuk screen readers
- [ ] **R7.5** Keyboard navigation (Tab order)

#### R8. Error Handling
- [ ] **R8.1** Duplicate date detection
- [ ] **R8.2** Konfirmasi jika menimpa data existing
- [ ] **R8.3** Error message jika LocalStorage penuh
- [ ] **R8.4** Network error handling (if applicable)

---

### P1 - Should Have (High Priority)

- [ ] **P1.1** Auto-fill dengan data terakhir (suggest incremental)
- [ ] **P1.2** Prediksi status pertumbuhan sebelum save
- [ ] **P1.3** Input dengan increment/decrement buttons
- [ ] **P1.4** Haptic feedback saat save (mobile)
- [ ] **P1.5** Shortcut keyboard (Ctrl/Cmd + Enter untuk save)

---

### P2 - Could Have (Nice to Have)

- [ ] **P2.1** Voice input untuk pengukuran
- [ ] **P2.2** Camera integration (OCR timbangan)
- [ ] **P2.3** Bulk add (multiple dates sekaligus)
- [ ] **P2.4** Integration dengan reminder
- [ ] **P2.5** Share hasil pengukuran

---

## 🔧 Technical Implementation Notes

### Dependencies
```bash
# No new dependencies required
# Menggunakan stack existing:
# - React 18
# - Zustand (state)
# - Zod (validation)
# - Lucide React (icons)
```

### Files to Create/Modify

**New Files:**
```
src/
├── components/
│   ├── QuickAddButton.tsx
│   ├── QuickAddModal.tsx
│   ├── MeasurementInput.tsx
│   └── SuccessToast.tsx
├── hooks/
│   └── useQuickAdd.ts
└── utils/
    └── validation.ts
```

**Modified Files:**
```
src/
├── pages/
│   └── GrowthPage.tsx (add FAB trigger)
├── store/
│   └── useAppStore.ts (add quickAdd actions)
├── types.ts (extend if needed)
└── styles.css (add modal/bottom sheet styles)
```

### Performance Considerations
- Modal content di-render lazily (lazy initialization)
- Validasi menggunakan debounce (300ms)
- Chart update menggunakan requestAnimationFrame

---

## 📊 Metrics & Success Criteria

| Metric | Baseline | Target |
|--------|----------|--------|
| **Time to Add** | 15 detik (navigasi halaman) | < 10 detik |
| **Form Completion Rate** | 60% | > 85% |
| **Error Rate** | 15% | < 5% |
| **User Satisfaction** | - | > 4.0/5 |

---

## 🎨 Design System Integration

### Color Tokens
```css
/* Using existing design system */
--color-primary: #2563eb;
--color-success: #22c55e;
--color-warning: #f59e0b;
--color-error: #ef4444;
--color-surface: #ffffff;
--color-overlay: rgba(0, 0, 0, 0.5);
```

### Typography
```css
/* Existing classes */
.text-title-lg    /* Modal title */
.text-body        /* Form labels */
.text-caption     /* Helper text, hints */
.text-error       /* Error messages */
```

### Spacing
```css
/* Following 8px grid */
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
```

---

## 🚀 Implementation Roadmap

### Phase 1: Foundation (Week 1)
- [ ] Setup component structure
- [ ] Implement basic modal/bottom sheet
- [ ] Add trigger button to GrowthPage

### Phase 2: Core Functionality (Week 1-2)
- [ ] Form inputs dengan styling
- [ ] Validation logic
- [ ] Save ke store

### Phase 3: Polish (Week 2)
- [ ] Animations & transitions
- [ ] Error handling
- [ ] Accessibility improvements

### Phase 4: Testing (Week 3)
- [ ] Unit tests
- [ ] Integration tests
- [ ] User testing

---

## 📝 Appendix

### A. WHO Reference Ranges

Lihat: `src/utils/growth.ts` untuk data referensi yang sudah ada.

### B. Related Documentation

- `uiux_recommendation.md` - Pedoman UI/UX umum
- `empty_state_cta_improvements.md` - Perbaikan empty state Growth
- `src/types.ts` - TypeScript interfaces

### C. User Stories

**US-001:** Sebagai orang tua, saya ingin mencatat pengukuran dengan cepat dari halaman Growth agar saya tidak perlu navigasi ke halaman lain.

**US-002:** Sebagai pengguna, saya ingin melihat prediksi status pertumbuhan sebelum menyimpan agar saya bisa memastikan data yang saya masukkan masuk akal.

**US-003:** Sebagai pengguna mobile, saya ingin form dalam bentuk bottom sheet yang bisa di-swipe agar mudah digunakan dengan satu tangan.
