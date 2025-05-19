
// utils/recommendWorkoutPlan.js

import { workoutDatabase } from './workoutDatabase';

/**
 * Kullanıcı bilgilerine göre önerilen antrenman planı döner
 * @param {string} goal - Kullanıcının hedefi ("Kas Kütlesi Artırmak", "Yağ Yakımı", "Formda Kalma")
 * @param {string} level - Başlangıç, Orta, İleri
 * @param {string} environment - "ev" veya "salon"
 * @param {string[]} targetMuscles - Kullanıcının o gün çalışmak istediği kas grupları ["Göğüs", "Sırt", "Karın"]
 * @returns {object[]} Antrenman setleri
 */
export function recommendWorkoutPlan(goal, level, environment, targetMuscles = []) {
  const matches = workoutDatabase.filter((entry) =>
    entry.goal === goal &&
    entry.level === level &&
    entry.environment === environment &&
    (targetMuscles.length === 0 || targetMuscles.includes(entry.muscleGroup))
  );

  // Her kas grubu için bir varyasyon seti rastgele seçilir
  const plan = [];

  for (const group of matches) {
    const selected = {
      muscleGroup: group.muscleGroup,
      subGroup: group.subGroup,
      exercises: []
    };

    const count = Math.min(group.variations.length, 3); // her grup için en fazla 3 hareket öner
    const shuffled = [...group.variations].sort(() => 0.5 - Math.random());

    selected.exercises = shuffled.slice(0, count);
    plan.push(selected);
  }

  return plan;
}
