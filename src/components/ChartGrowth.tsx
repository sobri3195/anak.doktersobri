import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Link } from 'react-router-dom';
import { growthDataset, interpretWeight } from '../utils/growth';

interface Props {
  standard: 'WHO' | 'CDC';
  points: { ageMonths: number; weightKg: number; date: string }[];
  childName?: string;
}

const interpolate = (from: number, to: number, ratio: number) => from + ((to - from) * ratio);

const getReferenceAtAge = (ageMonths: number, ref: { ageMonths: number; p3: number; p50: number; p97: number }[]) => {
  if (ref.length === 0) return undefined;
  const sorted = [...ref].sort((a, b) => a.ageMonths - b.ageMonths);
  if (ageMonths <= sorted[0].ageMonths) return sorted[0];
  if (ageMonths >= sorted[sorted.length - 1].ageMonths) return sorted[sorted.length - 1];

  const nextIndex = sorted.findIndex((item) => item.ageMonths >= ageMonths);
  const start = sorted[nextIndex - 1];
  const end = sorted[nextIndex];
  const ratio = (ageMonths - start.ageMonths) / (end.ageMonths - start.ageMonths);

  return {
    ageMonths,
    p3: interpolate(start.p3, end.p3, ratio),
    p50: interpolate(start.p50, end.p50, ratio),
    p97: interpolate(start.p97, end.p97, ratio),
  };
};

export const ChartGrowth = ({ standard, points, childName }: Props) => {
  const ref = growthDataset[`${standard}_BB_U`];
  const sortedPoints = [...points].sort((a, b) => a.ageMonths - b.ageMonths);
  const latestPoint = sortedPoints.length > 0 ? sortedPoints[sortedPoints.length - 1] : undefined;
  const latestRef = latestPoint ? getReferenceAtAge(latestPoint.ageMonths, ref) : undefined;

  if (sortedPoints.length === 0) {
    return (
      <div className="chart-card chart-empty">
        <div className="empty-state-content">
          <div className="empty-state-icon">📊</div>
          <h3 className="empty-state-title">Belum ada data pengukuran</h3>
          <p className="muted empty-state-description">
            Mulai dengan menambahkan berat/tinggi pertama untuk melihat kurva pertumbuhan dan status kesehatan anak.
          </p>
          <div className="empty-state-actions">
            <Link className="btn btn-primary" to="/anak">
              <span className="icon-plus">+</span> Tambah Pengukuran Pertama
            </Link>
          </div>
          <ul className="empty-state-tips">
            <li>📏 Siapkan timbangan dan pengukur tinggi</li>
            <li>📅 Catat tanggal pengukuran yang akurat</li>
            <li>👶 Ukur dalam kondisi tenang dan rileks</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="chart-card">
      <div className="chart-summary">
        <p className="muted">
          Data tersedia: {sortedPoints.length} titik · Rentang umur: 0 - 24 bulan
        </p>
        {latestPoint && latestRef && (
          <p className="status-badge">
            Status pengukuran terakhir ({latestPoint.date.slice(0, 10)}): {interpretWeight(latestPoint.weightKg, latestRef.p3, latestRef.p97)}
          </p>
        )}
      </div>
      <div style={{ height: 320 }}>
        <ResponsiveContainer>
        <LineChart data={ref}>
          <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
          <XAxis dataKey="ageMonths" label={{ value: 'Umur (bulan)', position: 'insideBottom', offset: -8 }} />
          <YAxis label={{ value: 'Berat (kg)', angle: -90, position: 'insideLeft' }} />
          <Tooltip formatter={(value: number) => [`${value} kg`, '']} labelFormatter={(label) => `Umur ${label} bulan`} />
          <Legend />
          <Line name="WHO P3 (-3 SD)" dataKey="p3" stroke="#ef4444" dot={false} />
          <Line name="WHO Median (0 SD)" dataKey="p50" stroke="#22c55e" dot={false} />
          <Line name="WHO P97 (+3 SD)" dataKey="p97" stroke="#f59e0b" dot={false} />
          <Line name="Data anak" data={sortedPoints} dataKey="weightKg" stroke="#2563eb" strokeWidth={3} />
        </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-footer">
        <p className="muted">
          💡 Tips: Ukur berat badan secara teratur (minimal setiap bulan) untuk memantau tren pertumbuhan {childName ? childName : 'anak'}.
        </p>
      </div>
    </div>
  );
};
