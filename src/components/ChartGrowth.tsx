import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { growthDataset, interpretWeight } from '../utils/growth';

interface Props {
  standard: 'WHO' | 'CDC';
  points: { ageMonths: number; weightKg: number }[];
}

export const ChartGrowth = ({ standard, points }: Props) => {
  const ref = growthDataset[`${standard}_BB_U`];
  const latestPoint = points.length > 0 ? points[points.length - 1] : undefined;
  const latestRef = ref.length > 0 ? ref[ref.length - 1] : undefined;

  return (
    <div style={{ height: 320 }}>
      <ResponsiveContainer>
        <LineChart data={ref}>
          <XAxis dataKey="ageMonths" />
          <YAxis />
          <Tooltip />
          <Line dataKey="p3" stroke="#ef4444" dot={false} />
          <Line dataKey="p50" stroke="#22c55e" dot={false} />
          <Line dataKey="p97" stroke="#f59e0b" dot={false} />
          <Line data={points} dataKey="weightKg" stroke="#3b82f6" />
        </LineChart>
      </ResponsiveContainer>
      {latestPoint && latestRef && <p>Status terakhir: {interpretWeight(latestPoint.weightKg, latestRef.p3, latestRef.p97)}</p>}
    </div>
  );
};
