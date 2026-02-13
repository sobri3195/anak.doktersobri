import { useState } from 'react';
import { useAppStore } from '../store/useAppStore';

export const DrugsPage = () => {
  const { drugs, children, saveDoseTemplate } = useAppStore();
  const [childId, setChildId] = useState(children[0]?.id ?? '');
  const [drugId, setDrugId] = useState(drugs[0]?.id ?? '');
  const [weight, setWeight] = useState(10);
  const [doseMgKg, setDoseMgKg] = useState(10);
  const [conc, setConc] = useState(25);

  const totalMg = weight * doseMgKg;
  const totalMl = conc ? totalMg / conc : 0;

  return (
    <section>
      <h1>Database Obat Lokal</h1>
      <div className="grid">{drugs.map((d) => <article key={d.id}><h4>{d.name}</h4><p>{d.class}</p><small>{d.indication}</small></article>)}</div>
      <h2>Kalkulator Dosis (non-preskriptif)</h2>
      <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} /> kg
      <input type="number" value={doseMgKg} onChange={(e) => setDoseMgKg(Number(e.target.value))} /> mg/kg/dosis
      <input type="number" value={conc} onChange={(e) => setConc(Number(e.target.value))} /> mg/mL
      <p>Hasil: {totalMg.toFixed(2)} mg/dose (~ {totalMl.toFixed(2)} mL/dose)</p>
      <button onClick={() => saveDoseTemplate({ childId, drugId, mgPerKgDose: doseMgKg, intervalHours: 8, concentrationMgPerMl: conc, maxDoseMg: totalMg * 3 })}>Simpan Template Dosis</button>
      <select value={childId} onChange={(e) => setChildId(e.target.value)}>{children.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
      <select value={drugId} onChange={(e) => setDrugId(e.target.value)}>{drugs.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}</select>
    </section>
  );
};
