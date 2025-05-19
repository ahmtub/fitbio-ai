
// utils/progressTracker.js

/**
 * Haftalık gelişim hesaplayıcı.
 * @param {Array<object>} history - Kullanıcının son 7 güne ait verileri (en eski → en yeni)
 * @returns {object} Değişim oranları ve yorumlar
 *
 * Veri formatı:
 * {
 *   date: '2025-05-12',
 *   weight: 80,
 *   fatPercent: 20,
 *   musclePercent: 38
 * }
 */
export function calculateWeeklyProgress(history) {
  if (history.length < 2) return null;

  const first = history[0];
  const last = history[history.length - 1];

  const change = (newVal, oldVal) => (newVal - oldVal).toFixed(1);

  const weightChange = change(last.weight, first.weight);
  const fatChange = change(last.fatPercent, first.fatPercent);
  const muscleChange = change(last.musclePercent, first.musclePercent);

  return {
    weight: {
      start: first.weight,
      end: last.weight,
      diff: weightChange,
      status: weightChange < 0 ? "Kilo kaybı" : "Kilo alımı"
    },
    fat: {
      start: first.fatPercent,
      end: last.fatPercent,
      diff: fatChange,
      status: fatChange < 0 ? "Yağ azaldı" : "Yağ arttı"
    },
    muscle: {
      start: first.musclePercent,
      end: last.musclePercent,
      diff: muscleChange,
      status: muscleChange > 0 ? "Kas arttı" : "Kas azaldı"
    }
  };
}
