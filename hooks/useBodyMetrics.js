export default function useBodyMetrics(userData) {
  if (!userData) return null;

  const {
    height,
    weight,
    age,
    gender,
    activityLevel,
    fatPercentage,
    muscleMass,
    waterPercentage
  } = userData;

  const heightMeters = height / 100;
  const bmi = (weight / (heightMeters * heightMeters)).toFixed(1);

  const numericWeight = parseFloat(weight);
  const numericHeight = parseFloat(height);
  const numericAge = parseFloat(age);

  const bmr =
    gender === 'male'
      ? 10 * numericWeight + 6.25 * numericHeight - 5 * numericAge + 5
      : 10 * numericWeight + 6.25 * numericHeight - 5 * numericAge - 161;

  const multiplier = {
    passive: 1.2,
    active: 1.55,
    athletic: 1.9
  }[activityLevel] || 1.2;

  const tdee = Math.round(bmr * multiplier);

  // Yağ kütlesi (% varsa)
  const fatMass = fatPercentage
    ? ((numericWeight * parseFloat(fatPercentage)) / 100).toFixed(1)
    : null;

  // Sıvı kütlesi
  const waterMass = waterPercentage
    ? ((numericWeight * parseFloat(waterPercentage)) / 100).toFixed(1)
    : null;

  // Kas kütlesi (elle girildiyse onu al, yoksa tahmini hesapla)
  let estimatedMuscleMass = muscleMass
    ? parseFloat(muscleMass).toFixed(1)
    : null;

  if (!estimatedMuscleMass && fatMass && waterMass) {
    estimatedMuscleMass = (numericWeight - fatMass - waterMass).toFixed(1);
  }

  return {
    bmi,
    bmr: Math.round(bmr),
    tdee,
    fatMass,
    waterMass,
    estimatedMuscleMass,
    goal: userData.goal
  };
}
