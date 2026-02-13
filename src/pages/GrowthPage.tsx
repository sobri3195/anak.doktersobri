import { ChartGrowth } from '../components/ChartGrowth';
import { useAppStore } from '../store/useAppStore';
import { calculateAgeMonths } from '../utils/calculators';

export const GrowthPage = () => {
  const { children, measurements, growth } = useAppStore();
  const child = children[0];
  const points = child ? measurements.filter((m) => m.childId === child.id).map((m) => ({ ageMonths: calculateAgeMonths(child.dob), weightKg: m.weightKg })) : [];

  return <section><h1>Grafik Pertumbuhan ({growth.standard})</h1><p>Mode metrik aktif: {growth.metric}</p><ChartGrowth standard={growth.standard} points={points} /></section>;
};
