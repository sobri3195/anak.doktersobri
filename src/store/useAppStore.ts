import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import type { AppData, ChildProfile, DoseTemplate, FormulaResult, Measurement } from '../types';
import { importBackup, loadData, saveData } from '../utils/storage';

interface AppStore extends AppData {
  search: string;
  setSearch: (v: string) => void;
  toggleDarkMode: () => void;
  addChild: (child: Omit<ChildProfile, 'id' | 'createdAt'>) => void;
  updateChild: (id: string, partial: Partial<ChildProfile>) => void;
  removeChild: (id: string) => void;
  addMeasurement: (payload: Omit<Measurement, 'id'>) => void;
  removeMeasurement: (id: string) => void;
  toggleReminder: (id: string) => void;
  saveDoseTemplate: (template: Omit<DoseTemplate, 'id'>) => void;
  saveFormulaResult: (result: Omit<FormulaResult, 'id' | 'savedAt'>) => void;
  importAll: (raw: string) => void;
}

const persist = (setter: (state: AppStore) => Partial<AppStore>) => (set: any) =>
  set((state: AppStore) => {
    const next = { ...state, ...setter(state) };
    saveData(next);
    return next;
  });

export const useAppStore = create<AppStore>((set) => ({
  ...loadData(),
  search: '',
  setSearch: (v) => set({ search: v }),
  toggleDarkMode: persist((s) => ({ darkMode: !s.darkMode }))(set),
  addChild: (child) => persist((s) => ({ children: [...s.children, { ...child, id: uuidv4(), createdAt: new Date().toISOString() }] }))(set),
  updateChild: (id, partial) => persist((s) => ({ children: s.children.map((c) => c.id === id ? { ...c, ...partial } : c) }))(set),
  removeChild: (id) => persist((s) => ({
    children: s.children.filter((c) => c.id !== id),
    measurements: s.measurements.filter((m) => m.childId !== id),
    notes: s.notes.filter((n) => n.childId !== id),
    doseTemplates: s.doseTemplates.filter((d) => d.childId !== id),
  }))(set),
  addMeasurement: (payload) => persist((s) => ({ measurements: [...s.measurements, { ...payload, id: uuidv4() }] }))(set),
  removeMeasurement: (id) => persist((s) => ({ measurements: s.measurements.filter((m) => m.id !== id) }))(set),
  toggleReminder: (id) => persist((s) => ({ reminders: s.reminders.map((r) => r.id === id ? { ...r, done: !r.done } : r) }))(set),
  saveDoseTemplate: (template) => persist((s) => ({ doseTemplates: [...s.doseTemplates, { ...template, id: uuidv4() }] }))(set),
  saveFormulaResult: (result) => persist((s) => ({ formulaResults: [...s.formulaResults, { ...result, id: uuidv4(), savedAt: new Date().toISOString() }] }))(set),
  importAll: (raw) => {
    const parsed = importBackup(raw);
    saveData(parsed);
    set({ ...parsed });
  }
}));
