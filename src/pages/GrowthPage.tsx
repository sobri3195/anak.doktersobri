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
        <div className="page-head">
          <div>
            <h1>Pertumbuhan Anak (Standar {growth.standard})</h1>
            <p className="muted">Belum ada profil anak. Tambahkan data anak terlebih dahulu.</p>
          </div>
          <div className="page-actions">
            <Link className="btn btn-primary" to="/anak">
              <span className="icon-plus">+</span> Tambah Anak
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const metricLabel = growth.metric === 'BB_U' ? 'Berat badan menurut umur (BB/U)' :
                      growth.metric === 'TB_U' ? 'Tinggi badan menurut umur (TB/U)' :
                      growth.metric === 'PB_U' ? 'Panjang badan menurut umur (PB/U)' :
                      growth.metric === 'BB_TB' ? 'Berat badan menurut tinggi badan (BB/TB)' :
                      growth.metric === 'IMT_U' ? 'Indeks Massa Tubuh menurut umur (IMT/U)' :
                      growth.metric === 'LK_U' ? 'Lingkar kepala menurut umur (LK/U)' : growth.metric;

  return (
    <section>
      <div className="page-head">
        <div>
          <h1>Pertumbuhan Anak (Standar {growth.standard})</h1>
          <p className="muted">Metrik aktif: {metricLabel} · Usia saat ini {calculateAgeMonths(child.dob)} bulan</p>
        </div>
        <div className="page-actions">
          <select value={child.id} onChange={(e) => setSelectedChildId(e.target.value)} aria-label="Pilih anak">
            {children.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
          <Link className="btn btn-primary" to={`/anak/${child.id}`}>
            <span className="icon-plus">+</span> Tambah Pengukuran
          </Link>
        </div>
      </div>
      <ChartGrowth standard={growth.standard} points={points} childName={child.name} />
    </section>
  );
};
