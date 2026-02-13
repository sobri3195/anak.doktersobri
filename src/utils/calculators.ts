export const calculateAgeDays = (dob: string) => Math.floor((Date.now() - new Date(dob).getTime()) / (1000 * 60 * 60 * 24));
export const calculateAgeMonths = (dob: string) => Math.floor(calculateAgeDays(dob) / 30.4375);
export const correctedAgeMonths = (dob: string, gestationalWeeks?: number) => {
  const chrono = calculateAgeMonths(dob);
  if (!gestationalWeeks || gestationalWeeks >= 37 || chrono > 24) return chrono;
  return Math.max(0, chrono - Math.floor((40 - gestationalWeeks) / 4));
};

export const bmi = (kg: number, cm: number) => kg / ((cm / 100) ** 2);
export const bsaMosteller = (kg: number, cm: number) => Math.sqrt((kg * cm) / 3600);
export const maintenanceFluid1005020 = (kg: number) => {
  if (kg <= 10) return kg * 100;
  if (kg <= 20) return 1000 + (kg - 10) * 50;
  return 1500 + (kg - 20) * 20;
};

export const infusionRateMlHour = (volumeMl: number, hours: number) => volumeMl / hours;
export const dropsPerMinute = (volumeMl: number, minutes: number, dropFactor: number) => (volumeMl * dropFactor) / minutes;
