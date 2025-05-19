
// utils/dietRecommender.js

import { dietDatabase } from './dietDatabase';

/**
 * Diyet önerici.
 * @param {string} goal - Kullanıcının hedefi ('muscle', 'fat', 'fit')
 * @param {string} workoutTime - Antrenman zamanı ('sabah', 'öğle', 'akşam')
 * @param {object} analysis - Vücut analizi: { fatPercent: number, muscleMass: number }
 * @returns {object} En uygun diyet objesi
 */
export function recommendDiet(goal, workoutTime, analysis) {
  // ✅ Türkçe hedef dönüşümü
  if (goal === "Kas Kütlesi Artırmak") goal = "muscle";
  else if (goal === "Yağ Yakımı") goal = "fat";
  else if (goal === "Formda Kalma") goal = "fit";

  const goalTagMap = {
    muscle: "kas-kazanımı",
    fat: "yağ-yakımı",
    fit: "form-koruma"
  };

  const workoutTagMap = {
    sabah: "sabah-antrenmanı",
    öğle: "her-antrenman",
    akşam: "akşam-antrenmanı"
  };

  const goalTag = goalTagMap[goal];
  const timeTag = workoutTagMap[workoutTime];

  if (!goalTag || !timeTag) return null;

  // Filtreleme: hem hedef hem saat etiketine uyanları al
  const filtered = dietDatabase.filter(diet =>
    diet.tags.includes(goalTag) && diet.tags.includes(timeTag)
  );

  // Eğer birden fazla varsa, kas/yağ oranına göre en uygunu seç
  if (filtered.length > 1 && analysis) {
    const sorted = filtered.sort((a, b) => {
      const matchA = (a.tags.includes("yüksek-protein") ? analysis.muscleMass : 0) +
                     (a.tags.includes("düşük-karbonhidrat") ? analysis.fatPercent : 0);
      const matchB = (b.tags.includes("yüksek-protein") ? analysis.muscleMass : 0) +
                     (b.tags.includes("düşük-karbonhidrat") ? analysis.fatPercent : 0);
      return matchB - matchA;
    });
    return sorted[0];
  }

  return filtered[0] || null;
}
