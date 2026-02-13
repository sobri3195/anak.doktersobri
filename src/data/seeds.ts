import { v4 as uuidv4 } from 'uuid';
import type { AppData, Drug, Guideline } from '../types';

const drugSeed = (name: string, cls: string): Drug => ({
  id: uuidv4(),
  name,
  class: cls,
  indication: 'Indikasi umum pediatrik (placeholder, edit sesuai referensi lokal).',
  contraindication: 'Kontraindikasi utama sesuai kondisi klinis dan alergi.',
  sideEffects: 'Mual, muntah, ruam, efek spesifik obat.',
  warning: 'Gunakan kalkulasi dosis berbasis berat badan dengan verifikasi klinis.',
  interaction: 'Periksa interaksi dengan obat lain.',
  form: 'Sirup/tablet/injeksi',
  concentration: '125 mg/5mL',
  reference: 'WHO Model Formulary / CDC / referensi nasional',
  favorite: false,
  tags: ['pediatri']
});

export const seedGuidelines: Guideline[] = [
  'Demam', 'Diare', 'ISPA', 'Alergi', 'Nutrisi', 'Imunisasi', 'Asma', 'Dehidrasi', 'Kejang', 'Antibiotik rasional'
].map((topic) => ({
  id: uuidv4(),
  title: `Guideline ${topic}`,
  topic,
  summary: `Ringkasan penilaian awal, red flags, dan edukasi keluarga untuk ${topic}.`,
  tags: [topic.toLowerCase(), 'ringkas'],
  bookmarked: false,
}));

export const seedDrugs: Drug[] = [
  ['Paracetamol', 'Antipiretik'], ['Ibuprofen', 'NSAID'], ['Amoxicillin', 'Antibiotik'],
  ['Cefixime', 'Antibiotik'], ['Azithromycin', 'Antibiotik'], ['Salbutamol', 'Bronkodilator'],
  ['Cetirizine', 'Antihistamin'], ['Chlorpheniramine', 'Antihistamin'], ['Ondansetron', 'Antiemetik'],
  ['Oralit', 'Rehidrasi'], ['Zinc', 'Suplementasi'], ['Prednisone', 'Kortikosteroid'],
  ['Dexamethasone', 'Kortikosteroid'], ['Metronidazole', 'Antiprotozoa'], ['Domperidone', 'Gastrointestinal'],
  ['Ranitidine', 'Gastrointestinal'], ['Omeprazole', 'PPI'], ['Captopril', 'Kardiovaskular']
].map(([n, c]) => drugSeed(n, c));

export const initialData = (): AppData => {
  const childId = uuidv4();
  return {
    storageVersion: 2,
    darkMode: false,
    growth: { standard: 'WHO', metric: 'BB_U' },
    children: [{
      id: childId,
      name: 'Contoh Anak',
      dob: new Date(Date.now() - 1000 * 60 * 60 * 24 * 400).toISOString(),
      sex: 'male',
      preterm: true,
      gestationalWeeks: 34,
      birthWeightKg: 2.1,
      birthLengthCm: 45,
      birthHeadCm: 32,
      createdAt: new Date().toISOString(),
    }],
    measurements: [{
      id: uuidv4(),
      childId,
      date: new Date().toISOString(),
      weightKg: 9.2,
      heightCm: 74,
      headCircumferenceCm: 45.5,
      note: 'Kontrol rutin',
    }],
    reminders: [{
      id: uuidv4(),
      childId,
      title: 'Kontrol tumbuh kembang',
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
      category: 'kontrol',
      done: false,
    }],
    guidelines: seedGuidelines,
    drugs: seedDrugs,
    doseTemplates: [],
    notes: [],
    formulaResults: [],
  };
};
