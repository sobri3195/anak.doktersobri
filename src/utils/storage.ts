import { z } from 'zod';
import type { AppData } from '../types';
import { initialData } from '../data/seeds';

const STORAGE_KEY = 'anak.sobri.appdata';
const CURRENT_VERSION = 2;

const appSchema = z.object({
  storageVersion: z.number(),
  children: z.array(z.any()),
  measurements: z.array(z.any()),
  reminders: z.array(z.any()),
  guidelines: z.array(z.any()),
  drugs: z.array(z.any()),
  doseTemplates: z.array(z.any()),
  notes: z.array(z.any()),
  formulaResults: z.array(z.any()),
  growth: z.object({ standard: z.enum(['WHO', 'CDC']), metric: z.enum(['BB_U', 'TB_U', 'BB_TB', 'LK_U', 'BMI_U']) }),
  darkMode: z.boolean(),
});

export const migrate = (raw: any): AppData => {
  const base = initialData();
  if (!raw || typeof raw !== 'object') return base;
  const legacySettings = raw.settings && typeof raw.settings === 'object' ? raw.settings : undefined;

  if (raw.darkMode === undefined && typeof legacySettings?.darkMode === 'boolean') {
    raw.darkMode = legacySettings.darkMode;
  }

  if ((!raw.growth || typeof raw.growth !== 'object') && legacySettings?.growth && typeof legacySettings.growth === 'object') {
    raw.growth = legacySettings.growth;
  }

  const version = raw.storageVersion ?? 1;

  if (version < 2) {
    raw.darkMode = raw.darkMode ?? false;
    raw.growth = raw.growth ?? base.growth;
    raw.storageVersion = 2;
  }

  return { ...base, ...raw, storageVersion: CURRENT_VERSION } as AppData;
};

export const loadData = (): AppData => {
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    if (!item) return initialData();
    const parsed = JSON.parse(item);
    const migrated = migrate(parsed);
    return appSchema.parse(migrated) as AppData;
  } catch {
    return initialData();
  }
};

export const saveData = (data: AppData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, storageVersion: CURRENT_VERSION }));
};

export const exportBackup = (data: AppData) => JSON.stringify(data, null, 2);

export const importBackup = (rawText: string): AppData => {
  const parsed = JSON.parse(rawText);
  const migrated = migrate(parsed);
  return appSchema.parse(migrated) as AppData;
};

export const resetAllData = (): AppData => {
  const base = initialData();
  saveData(base);
  return base;
};
