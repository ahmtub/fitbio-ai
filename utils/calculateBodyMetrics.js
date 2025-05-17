// src/utils/calculateBodyMetrics.js

// ✅ BMI Hesaplama
export function calculateBMI(weight, height) {
  const h = height / 100;
  return parseFloat((weight / (h * h)).toFixed(2));
}

// ✅ BMR Hesaplama (Mifflin-St Jeor)
export function calculateBMR(weight, height, age, gender) {
  if (gender === 'male') return parseFloat((10 * weight + 6.25 * height - 5 * age + 5).toFixed(2));
  if (gender === 'female') return parseFloat((10 * weight + 6.25 * height - 5 * age - 161).toFixed(2));
  return null;
}

// ✅ TDEE Hesaplama
export function calculateTDEE(bmr, activityLevel) {
  const factor = {
    sedanter: 1.2,
    light: 1.375,
    active: 1.55,
    very_active: 1.725
  }[activityLevel] || 1.375;

  return parseFloat((bmr * factor).toFixed(2));
}

// ✅ Yağ Kütlesi
export function calculateFatMass(weight, fatPercentage) {
  return fatPercentage ? parseFloat(((fatPercentage / 100) * weight).toFixed(2)) : null;
}

// ✅ Sıvı Kütlesi
export function calculateWaterMass(weight, waterPercentage) {
  return waterPercentage ? parseFloat(((waterPercentage / 100) * weight).toFixed(2)) : null;
}

// ✅ Kas Kütlesi (Tahmini)
export function estimateMuscleMass(weight, fatMass, waterMass) {
  if (fatMass !== null && waterMass !== null) {
    return parseFloat((weight - fatMass - waterMass).toFixed(2));
  }
  return null;
}

// ✅ Hepsi Bir Arada – Ana Fonksiyon
export function calculateBodyMetrics(data) {
  const {
    height,
    weight,
    age,
    gender,
    fatPercentage,
    waterPercentage,
    activityLevel
  } = data;

  const bmi = calculateBMI(weight, height);
  const bmr = calculateBMR(weight, height, age, gender);
  const tdee = calculateTDEE(bmr, activityLevel);
  const fatMass = calculateFatMass(weight, fatPercentage);
  const waterMass = calculateWaterMass(weight, waterPercentage);
  const muscleMass = estimateMuscleMass(weight, fatMass, waterMass);
  const leanMass = fatMass ? parseFloat((weight - fatMass).toFixed(2)) : null;

  return {
    bmi,
    bmr,
    tdee,
    fatMass,
    leanMass,
    waterMass,
    estimatedMuscleMass: muscleMass
  };
}
