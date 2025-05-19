
// utils/workoutPlanner.js

export function generateWorkoutPlan(goal, muscleMass, workoutTime, level) {
  // ✅ Seviye normalizasyonu
  level = level?.toLocaleLowerCase('tr-TR');
  if (level.includes("baş")) level = "beginner";
  if (level.includes("orta") || level.includes("inter")) level = "intermediate";
  if (level.includes("ileri") || level.includes("adv")) level = "advanced";

  if (goal === "Kas Kütlesi Artırmak") goal = "muscle";
  else if (goal === "Yağ Yakımı") goal = "fat";
  else if (goal === "Formda Kalma") goal = "fit";

  const beginnerPlan = [
    { day: "Pazartesi", exercises: [
      { name: "Full Body Workout", sets: 3, reps: 12 },
      { name: "Plank", sets: 3, reps: 30 }
    ]},
    { day: "Çarşamba", exercises: [
      { name: "Bodyweight Squat", sets: 3, reps: 15 },
      { name: "Push-Up", sets: 3, reps: 10 }
    ]},
    { day: "Cuma", exercises: [
      { name: "Dumbbell Shoulder Press", sets: 3, reps: 12 },
      { name: "Crunches", sets: 3, reps: 20 }
    ]}
  ];

  const intermediatePlan = [
    { day: "Pazartesi", exercises: [
      { name: "Barbell Bench Press", sets: 4, reps: 10 },
      { name: "Incline Dumbbell Press", sets: 3, reps: 12 }
    ]},
    { day: "Salı", exercises: [
      { name: "Lat Pulldown", sets: 4, reps: 10 },
      { name: "Seated Row", sets: 3, reps: 12 }
    ]},
    { day: "Perşembe", exercises: [
      { name: "Squat", sets: 4, reps: 10 },
      { name: "Lunges", sets: 3, reps: 12 }
    ]},
    { day: "Cuma", exercises: [
      { name: "Shoulder Press", sets: 3, reps: 10 },
      { name: "Lateral Raise", sets: 3, reps: 12 }
    ]}
  ];

  const advancedPlan = [
    { day: "Pazartesi", exercises: [
      { name: "Chest Dip", sets: 4, reps: 12 },
      { name: "Decline Bench Press", sets: 4, reps: 10 }
    ]},
    { day: "Salı", exercises: [
      { name: "Deadlift", sets: 4, reps: 8 },
      { name: "Bent Over Row", sets: 4, reps: 10 }
    ]},
    { day: "Çarşamba", exercises: [
      { name: "Barbell Curl", sets: 4, reps: 12 },
      { name: "Triceps Extension", sets: 4, reps: 12 }
    ]},
    { day: "Perşembe", exercises: [
      { name: "Front Squat", sets: 4, reps: 10 },
      { name: "Leg Press", sets: 4, reps: 12 }
    ]},
    { day: "Cuma", exercises: [
      { name: "Military Press", sets: 4, reps: 10 },
      { name: "Rear Delt Fly", sets: 4, reps: 12 }
    ]}
  ];

  if (level === "beginner") return beginnerPlan;
  if (level === "intermediate") return intermediatePlan;
  if (level === "advanced") return advancedPlan;

  
  if (goal === "fit") {
    if (level === "beginner") return beginnerPlan;
    if (level === "intermediate") return intermediatePlan;
    if (level === "advanced") return advancedPlan;
  }

  if (goal === "muscle") {
    if (level === "beginner") return intermediatePlan;
    if (level === "intermediate") return advancedPlan;
    if (level === "advanced") return advancedPlan;
  }

  if (goal === "fat") {
    return [
      { day: "Her Gün", exercises: [
        { name: "HIIT Cardio", sets: 5, reps: 30 },
        { name: "Jump Rope", sets: 3, reps: 60 }
      ]}
    ];
  }

  return [];
}
