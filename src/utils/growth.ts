export interface GrowthPoint { ageMonths: number; p3: number; p50: number; p97: number }

export const growthDataset: Record<string, GrowthPoint[]> = {
  WHO_BB_U: [
    { ageMonths: 0, p3: 2.5, p50: 3.3, p97: 4.4 },
    { ageMonths: 6, p3: 6.0, p50: 7.9, p97: 10.0 },
    { ageMonths: 12, p3: 7.2, p50: 9.6, p97: 12.0 },
    { ageMonths: 24, p3: 9.0, p50: 12.2, p97: 15.5 },
  ],
  CDC_BB_U: [
    { ageMonths: 0, p3: 2.4, p50: 3.4, p97: 4.5 },
    { ageMonths: 6, p3: 6.3, p50: 8.1, p97: 10.2 },
    { ageMonths: 12, p3: 7.5, p50: 9.8, p97: 12.3 },
    { ageMonths: 24, p3: 9.4, p50: 12.5, p97: 16.0 },
  ],
};

export const interpretWeight = (weight: number, p3: number, p97: number) => {
  if (weight < p3) return 'Underweight';
  if (weight > p97) return 'Overweight';
  return 'Normal';
};
