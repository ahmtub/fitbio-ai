
// utils/generateWorkoutPlanFromExerciseDB.js

const API_KEY = "e50895608cmshe64170e3b7c89e5p137f8bjsn66e8612e0ba9";
const API_HOST = "exercisedb.p.rapidapi.com";

// Günlere uygun ve geçerli bodyPart isimleri
const dayToMuscle = {
  Pazartesi: "chest",
  Salı: "back",
  Çarşamba: "upper arms",     // biceps + triceps
  Perşembe: "shoulders",
  Cuma: "upper legs",
  Cumartesi: "waist",         // abs/core
  Pazar: null                 // dinlenme
};

export async function fetchExercisesByBodyPart(part) {
  try {
    const response = await fetch(`https://${API_HOST}/exercises/bodyPart/${part}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": API_HOST,
        "x-rapidapi-key": API_KEY
      }
    });

    const data = await response.json();

    if (!Array.isArray(data)) {
      console.error("⚠️ API yanıtı dizi formatında değil:", data);
      return [];
    }

    return data.slice(0, 3);
  } catch (err) {
    console.error("API Hatası:", err);
    return [];
  }
}

export async function generateWorkoutPlanFromExerciseDB(userData) {
  const weekDays = Object.keys(dayToMuscle);
  const plan = {};

  for (const day of weekDays) {
    const muscle = dayToMuscle[day];
    if (!muscle) {
      plan[day] = "Dinlenme veya Kardiyo";
      continue;
    }

    const exercises = await fetchExercisesByBodyPart(muscle);
    plan[day] = exercises.length > 0
      ? exercises.map(ex => ex.name).join(" + ")
      : "Dinlenme veya Kardiyo";
  }

  return plan;
}
