import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import { ChartGrowth } from '../components/ChartGrowth';
import { useAppStore } from '../store/useAppStore';
import { calculateAgeDays, calculateAgeMonths, correctedAgeMonths } from '../utils/calculators';

const measurementSchema = z.object({
  weightKg: z.coerce.number().min(0.5).max(120),
  heightCm: z.coerce.number().min(20).max(220),
  headCircumferenceCm: z.coerce.number().min(20).max(70).optional(),
  date: z.string().min(1),
  note: z.string().optional(),
});

export const ChildDetailPage = () => {
  const { id } = useParams();
  const { children, measurements, addMeasurement, removeMeasurement, reminders, toggleReminder } = useAppStore();
  const [tab, setTab] = useState<'Profil' | 'Pengukuran' | 'Grafik' | 'Obat' | 'Catatan' | 'Reminder'>('Profil');
  const child = children.find((c) => c.id === id);
  const rows = measurements.filter((m) => m.childId === id).sort((a, b) => a.date.localeCompare(b.date));

  const points = useMemo(() => rows.map((m) => ({
    ageMonths: Math.max(0, Math.floor((new Date(m.date).getTime() - new Date(child!.dob).getTime()) / (1000 * 60 * 60 * 24 * 30.4375))),
    weightKg: m.weightKg,
    date: m.date,
  })), [rows, child]);
  if (!child) return <p>Anak tidak ditemukan</p>;

  return (
    <section>
      <h1>{child.name}</h1>
      <div>{['Profil','Pengukuran','Grafik','Obat','Catatan','Reminder'].map((t) => <button key={t} onClick={() => setTab(t as any)}>{t}</button>)}</div>
      {tab === 'Profil' && <div><p>Usia: {calculateAgeDays(child.dob)} hari / {calculateAgeMonths(child.dob)} bulan</p><p>Usia koreksi: {correctedAgeMonths(child.dob, child.gestationalWeeks)} bulan</p></div>}
      {tab === 'Pengukuran' && <>
        <form onSubmit={(e) => {
          e.preventDefault();
          const form = new FormData(e.currentTarget as HTMLFormElement);
          const payload = measurementSchema.parse({
            childId: child.id,
            date: form.get('date'),
            weightKg: form.get('weightKg'),
            heightCm: form.get('heightCm'),
            headCircumferenceCm: form.get('head'),
            note: form.get('note'),
          });
          addMeasurement({ childId: child.id, date: payload.date, weightKg: payload.weightKg, heightCm: payload.heightCm, headCircumferenceCm: payload.headCircumferenceCm, note: payload.note });
        }}>
          <input name="date" type="date" required />
          <input name="weightKg" type="number" step="0.1" placeholder="BB" required />
          <input name="heightCm" type="number" step="0.1" placeholder="TB/PB" required />
          <input name="head" type="number" step="0.1" placeholder="LK" />
          <input name="note" placeholder="Catatan" />
          <button>Simpan</button>
        </form>
        <table><thead><tr><th>Tanggal</th><th>BB</th><th>TB</th><th>LK</th><th></th></tr></thead><tbody>{rows.map((m) => <tr key={m.id}><td>{m.date.slice(0,10)}</td><td>{m.weightKg}</td><td>{m.heightCm}</td><td>{m.headCircumferenceCm}</td><td><button onClick={() => removeMeasurement(m.id)}>Hapus</button></td></tr>)}</tbody></table>
      </>}
      {tab === 'Grafik' && <ChartGrowth standard="WHO" points={points} />}
      {tab === 'Obat' && <p>Simpan template dosis di halaman Obat/Growth untuk anak ini.</p>}
      {tab === 'Catatan' && <p>Milestone checklist customizable disimpan sebagai notes lokal.</p>}
      {tab === 'Reminder' && reminders.filter((r) => r.childId === child.id).map((r) => <p key={r.id}><button onClick={() => toggleReminder(r.id)}>{r.done ? '✅' : '⬜'}</button> {r.title} - {r.dueDate.slice(0,10)}</p>)}
    </section>
  );
};
