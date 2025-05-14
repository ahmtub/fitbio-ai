// utils/calculator.js

export function calculateBMR({ gender, weight, height, age }) {
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
}

export function calculateTDEE(bmr, activityLevel) {
  const multipliers = {
    passive: 1.2,
    active: 1.55,
    athletic: 1.9
  };
  return bmr * (multipliers[activityLevel] || 1.2);
}
