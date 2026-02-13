export type Sex = 'male' | 'female';

export interface ChildProfile {
  id: string;
  name: string;
  dob: string;
  sex: Sex;
  preterm: boolean;
  gestationalWeeks?: number;
  birthWeightKg?: number;
  birthLengthCm?: number;
  birthHeadCm?: number;
  createdAt: string;
}

export interface Measurement {
  id: string;
  childId: string;
  date: string;
  weightKg: number;
  heightCm: number;
  headCircumferenceCm?: number;
  note?: string;
}

export interface Reminder {
  id: string;
  childId?: string;
  title: string;
  dueDate: string;
  category: 'imunisasi' | 'kontrol' | 'obat' | 'lainnya';
  done: boolean;
}

export interface Guideline {
  id: string;
  title: string;
  topic: string;
  summary: string;
  tags: string[];
  bookmarked: boolean;
}

export interface Drug {
  id: string;
  name: string;
  class: string;
  indication: string;
  contraindication: string;
  sideEffects: string;
  warning: string;
  interaction: string;
  form: string;
  concentration?: string;
  reference: string;
  favorite: boolean;
  tags: string[];
}

export interface DoseTemplate {
  id: string;
  childId: string;
  drugId: string;
  mgPerKgDose: number;
  intervalHours: number;
  maxDoseMg?: number;
  concentrationMgPerMl?: number;
  notes?: string;
  sourceLink?: string;
}

export interface ClinicalNote {
  id: string;
  childId: string;
  date: string;
  content: string;
  milestones: string[];
}

export interface FormulaResult {
  id: string;
  childId?: string;
  formulaKey: string;
  input: Record<string, string | number>;
  output: string;
  savedAt: string;
}

export interface GrowthSetting {
  standard: 'WHO' | 'CDC';
  metric: 'BB_U' | 'TB_U' | 'BB_TB' | 'LK_U' | 'BMI_U';
}

export interface AppData {
  storageVersion: number;
  children: ChildProfile[];
  measurements: Measurement[];
  reminders: Reminder[];
  guidelines: Guideline[];
  drugs: Drug[];
  doseTemplates: DoseTemplate[];
  notes: ClinicalNote[];
  formulaResults: FormulaResult[];
  growth: GrowthSetting;
  darkMode: boolean;
}
