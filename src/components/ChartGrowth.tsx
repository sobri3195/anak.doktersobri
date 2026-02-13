import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { growthDataset, interpretWeight } from '../utils/growth';

interface Props {
  standard: 'WHO' | 'CDC';
  points: { ageMonths: number; weightKg: number; date: string }[];
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

export const ChartGrowth = ({ standard, points }: Props) => {
  const ref = growthDataset[`${standard}_BB_U`];
  const sortedPoints = [...points].sort((a, b) => a.ageMonths - b.ageMonths);
  const latestPoint = sortedPoints.length > 0 ? sortedPoints[sortedPoints.length - 1] : undefined;
  const latestRef = latestPoint ? getReferenceAtAge(latestPoint.ageMonths, ref) : undefined;

  if (sortedPoints.length === 0) {
    return (
      <div className="chart-card chart-empty">
        <p className="muted">Belum ada data pengukuran untuk ditampilkan.</p>
        <h3>Tambahkan pengukuran pertama untuk melihat tren pertumbuhan.</h3>
      </div>
    );
  }

  return (
    <div className="chart-card">
      <div className="chart-summary">
        <p className="muted">Rentang umur: 0 - 24 bulan</p>
        {latestPoint && latestRef && <p className="status-badge">Status terakhir ({latestPoint.date.slice(0, 10)}): {interpretWeight(latestPoint.weightKg, latestRef.p3, latestRef.p97)}</p>}
      </div>
      <div style={{ height: 320 }}>
        <ResponsiveContainer>
        <LineChart data={ref}>
          <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
          <XAxis dataKey="ageMonths" label={{ value: 'Umur (bulan)', position: 'insideBottom', offset: -8 }} />
          <YAxis label={{ value: 'Berat (kg)', angle: -90, position: 'insideLeft' }} />
          <Tooltip formatter={(value: number) => [`${value} kg`, '']} labelFormatter={(label) => `Umur ${label} bulan`} />
          <Legend />
          <Line name="WHO P3" dataKey="p3" stroke="#ef4444" dot={false} />
          <Line name="WHO Median" dataKey="p50" stroke="#22c55e" dot={false} />
          <Line name="WHO P97" dataKey="p97" stroke="#f59e0b" dot={false} />
          <Line name="Data anak" data={sortedPoints} dataKey="weightKg" stroke="#2563eb" strokeWidth={3} />
        </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
