
// utils/generateWorkoutPlanFromAPI.js

export async function getExercisesByMuscle(muscleId, equipment = null) {
  let url = `https://wger.de/api/v2/exercise/?muscles=${muscleId}&language=1&limit=10`;
  if (equipment) {
    url += `&equipment=${equipment}`;
  }

  const response = await fetch(url);
  const data = await response.json();

  // name'i olmayanları filtrele
  const filtered = data.results.filter(ex => ex.name && ex.name.trim().length > 0);
  return filtered;
}

export async function generateWorkoutPlanFromAPI(userData) {
  const { goal, equipment } = userData;

  const muscleGoals = {
    muscle: [4, 1, 5, 10, 2], // Göğüs, Biceps, Triceps, Bacak, Omuz
    fat: [6, 10, 12],         // Karın, Bacak, Sırt
    fit: [4, 6, 2]            // Göğüs, Karın, Omuz
  };

  const targetMuscles = muscleGoals[goal] || muscleGoals["fit"];

  const weekDays = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];
  const weeklyPlan = {};

  for (let i = 0; i < 7; i++) {
    const muscleId = targetMuscles[i % targetMuscles.length];
    const exercises = await getExercisesByMuscle(muscleId, equipment);

    const selected = exercises.length > 0
      ? exercises.slice(0, 2).map(ex => ex.name || "İsimsiz Egzersiz").join(" + ")
      : "Dinlenme veya Vücut Ağırlığıyla Antrenman";

    weeklyPlan[weekDays[i]] = selected;
  }

  return weeklyPlan;
}
