
// utils/supplementRecommender.js

/**
 * Antrenman süresi ve eforuna göre önerilen supplement listesi döner.
 * @param {number} duration - Antrenman süresi (dakika)
 * @param {string} intensity - 'düşük', 'orta', 'yüksek'
 * @param {string} goal - 'Kas Kütlesi Artırmak', 'Yağ Yakmak', 'Formda Kalmak'
 * @returns {Array<string>} Supplement öneri listesi
 */
export function getSupplementRecommendations(duration, intensity, goal) {
  const baseSupplements = [];

  if (goal === "Kas Kütlesi Artırmak") {
    baseSupplements.push("Whey Protein", "Creatine");
  } else if (goal === "Yağ Yakmak") {
    baseSupplements.push("L-Carnitine", "CLA");
  } else if (goal === "Formda Kalmak") {
    baseSupplements.push("Multivitamin");
  }

  if (duration >= 45) {
    baseSupplements.push("BCAA");
  }

  if (intensity === "yüksek") {
    baseSupplements.push("Elektrolit", "Kafein Tableti");
  } else if (intensity === "orta") {
    baseSupplements.push("Elektrolit");
  }

  return baseSupplements;
}
