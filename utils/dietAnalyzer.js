
// utils/dietAnalyzer.js

/**
 * Kullanıcının yazdığı yiyecek metinlerinden protein ve karbonhidrat tahmini yapar.
 * @param {object} diet - Kullanıcının girdiği diyet planı (kahvaltı, öğle, akşam, ara)
 * @returns {object} Analiz sonucu: { protein: string, carb: string }
 */
export function analyzeDiet(diet) {
  const proteinKeywords = [
    "yumurta", "tavuk", "balık", "et", "peynir", "yoğurt", "protein", "kırmızı et", "somon", "mercimek", "tofu"
  ];
  const carbKeywords = [
    "pirinç", "ekmek", "makarna", "bulgur", "muz", "yulaf", "patates", "mısır", "çavdar", "karbonhidrat"
  ];

  let proteinScore = 0;
  let carbScore = 0;

  const allMeals = Object.values(diet).join(" ").toLowerCase();

  proteinKeywords.forEach(word => {
    if (allMeals.includes(word)) proteinScore++;
  });

  carbKeywords.forEach(word => {
    if (allMeals.includes(word)) carbScore++;
  });

  let proteinStatus = "Düşük";
  if (proteinScore >= 3) proteinStatus = "Yeterli";
  if (proteinScore >= 5) proteinStatus = "Yüksek";

  let carbStatus = "Düşük";
  if (carbScore >= 3) carbStatus = "Yeterli";
  if (carbScore >= 5) carbStatus = "Yüksek";

  return {
    protein: proteinStatus,
    carbohydrate: carbStatus
  };
}
