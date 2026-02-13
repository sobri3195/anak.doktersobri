import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChartGrowth } from '../components/ChartGrowth';
import { useAppStore } from '../store/useAppStore';
import { calculateAgeMonths } from '../utils/calculators';

export const GrowthPage = () => {
  const { children, measurements, growth } = useAppStore();
  const [selectedChildId, setSelectedChildId] = useState(children[0]?.id ?? '');
  const child = children.find((item) => item.id === selectedChildId) ?? children[0];
  const points = useMemo(() => {
    if (!child) return [];
    return measurements
      .filter((m) => m.childId === child.id)
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((m) => ({
        ageMonths: Math.max(0, Math.floor((new Date(m.date).getTime() - new Date(child.dob).getTime()) / (1000 * 60 * 60 * 24 * 30.4375))),
        weightKg: m.weightKg,
        date: m.date,
      }));
  }, [child, measurements]);

  if (!child) {
    return (
      <section>
        <h1>Grafik Pertumbuhan ({growth.standard})</h1>
        <p>Belum ada profil anak. Tambahkan data anak terlebih dahulu.</p>
        <Link className="btn" to="/anak">+ Tambah Anak</Link>
      </section>
    );
  }

  return (
    <section>
      <div className="page-head">
        <div>
          <h1>Grafik Pertumbuhan Anak ({growth.standard})</h1>
          <p className="muted">Mode metrik aktif: {growth.metric} · Usia saat ini {calculateAgeMonths(child.dob)} bulan</p>
        </div>
        <div className="page-actions">
          <select value={child.id} onChange={(e) => setSelectedChildId(e.target.value)} aria-label="Pilih anak">
            {children.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
          <Link className="btn" to={`/anak/${child.id}`}>+ Tambah Pengukuran</Link>
        </div>
      </div>
      <ChartGrowth standard={growth.standard} points={points} />
    </section>
  );
};
