import { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { bmi, bsaMosteller, dropsPerMinute, infusionRateMlHour, maintenanceFluid1005020 } from '../utils/calculators';

export const FormulasPage = () => {
  const { children, saveFormulaResult } = useAppStore();
  const [kg, setKg] = useState(10);
  const [cm, setCm] = useState(75);
  const [ml, setMl] = useState(500);
  const [hour, setHour] = useState(8);

  const results = [
    `BMI: ${bmi(kg, cm).toFixed(2)} kg/m²`,
    `BSA Mosteller: ${bsaMosteller(kg, cm).toFixed(2)} m²`,
    `Maintenance 100/50/20: ${maintenanceFluid1005020(kg)} mL/hari`,
    `Infus: ${infusionRateMlHour(ml, hour).toFixed(2)} mL/jam`,
    `Tetes/menit (20 gtt): ${dropsPerMinute(ml, hour * 60, 20).toFixed(2)}`,
    `Konversi kg↔g: ${kg} kg = ${kg * 1000} g`,
    `Konversi cm↔m: ${cm} cm = ${(cm / 100).toFixed(2)} m`,
    `Konversi °C↔°F: 37°C = ${(37 * 9/5 + 32).toFixed(1)}°F`,
    `Defisit cairan sederhana (5%): ${(kg * 1000 * 0.05).toFixed(0)} mL`,
  ];

  return <section><h1>Rumus & Kalkulator Pediatrik</h1>
    <input type="number" value={kg} onChange={(e) => setKg(Number(e.target.value))} />kg
    <input type="number" value={cm} onChange={(e) => setCm(Number(e.target.value))} />cm
    <input type="number" value={ml} onChange={(e) => setMl(Number(e.target.value))} />mL
    <input type="number" value={hour} onChange={(e) => setHour(Number(e.target.value))} />jam
    {results.map((r) => <p key={r}>{r} <button onClick={() => saveFormulaResult({ childId: children[0]?.id, formulaKey: r.split(':')[0], input: { kg, cm, ml, hour }, output: r })}>Simpan</button></p>)}
  </section>;
};
