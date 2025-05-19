
// utils/useBodyMetrics.js

/**
 * Kullanıcının vücut verilerine göre BMI, BMR, TDEE ve makro hesaplaması
 * @param {number} weight - kg
 * @param {number} height - cm
 * @param {number} age - yaş
 * @param {"male"|"female"} gender
 * @param {"low"|"moderate"|"high"} activityLevel
 * @param {number} fatMass - kg
 * @param {number} muscleMass - kg
 * @returns {{
 *   bmi: number,
 *   bmr: number,
 *   tdee: number,
 *   macros: { protein: number, carbs: number, fat: number }
 * }}
 */
export function calculateBodyMetrics({ weight, height, age, gender, activityLevel, fatMass, muscleMass }) {
  const bmi = weight / ((height / 100) ** 2);

  let bmr;
  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  let multiplier = 1.2;
  if (activityLevel === "moderate") multiplier = 1.55;
  else if (activityLevel === "high") multiplier = 1.75;

  const tdee = bmr * multiplier;

  // Makrolar: klasik oran → %20 protein, %30 yağ, %50 karbonhidrat
  const totalCalories = tdee;
  const protein = (totalCalories * 0.20) / 4; // 4 kcal per gram
  const fat = (totalCalories * 0.30) / 9; // 9 kcal per gram
  const carbs = (totalCalories * 0.50) / 4; // 4 kcal per gram

  return {
    bmi: parseFloat(bmi.toFixed(1)),
    bmr: parseFloat(bmr.toFixed(0)),
    tdee: parseFloat(tdee.toFixed(0)),
    macros: {
      protein: parseFloat(protein.toFixed(1)),
      carbs: parseFloat(carbs.toFixed(1)),
      fat: parseFloat(fat.toFixed(1))
    },
    fatMass,
    muscleMass
  };
}
