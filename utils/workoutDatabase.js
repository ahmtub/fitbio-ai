
// utils/workoutDatabase.js

export const workoutDatabase = [
  // ---------------- GÖĞÜS ----------------
  {
    goal: "Kas Kütlesi Artırmak",
    level: "Orta",
    muscleGroup: "Göğüs",
    subGroup: "Üst Göğüs",
    environment: "salon",
    variations: [
      {
        name: "Incline Barbell Bench Press",
        image: "incline_barbell_bench_press.png",
        sets: 4,
        reps: "8-10",
        equipment: "barbell"
      },
      {
        name: "Incline Dumbbell Press",
        image: "incline_dumbbell_press.png",
        sets: 3,
        reps: "10-12",
        equipment: "dumbbell"
      }
    ]
  },
  {
    goal: "Kas Kütlesi Artırmak",
    level: "Orta",
    muscleGroup: "Göğüs",
    subGroup: "Alt Göğüs",
    environment: "ev",
    variations: [
      {
        name: "Decline Push-Up",
        image: "decline_pushup.png",
        sets: 3,
        reps: "12-15",
        equipment: "none"
      }
    ]
  },

  // ---------------- SIRT ----------------
  {
    goal: "Kas Kütlesi Artırmak",
    level: "İleri",
    muscleGroup: "Sırt",
    subGroup: "Kanat",
    environment: "salon",
    variations: [
      {
        name: "Wide Grip Lat Pulldown",
        image: "wide_lat_pulldown.png",
        sets: 4,
        reps: "10-12",
        equipment: "machine"
      },
      {
        name: "Pull-Up",
        image: "pull_up.png",
        sets: 4,
        reps: "Max",
        equipment: "bar"
      }
    ]
  },
  {
    goal: "Kas Kütlesi Artırmak",
    level: "Orta",
    muscleGroup: "Sırt",
    subGroup: "Bel",
    environment: "ev",
    variations: [
      {
        name: "Superman",
        image: "superman.png",
        sets: 3,
        reps: "15-20",
        equipment: "none"
      }
    ]
  },

  // ---------------- KARIN ----------------
  {
    goal: "Yağ Yakımı",
    level: "Başlangıç",
    muscleGroup: "Karın",
    subGroup: "Üst Karın",
    environment: "ev",
    variations: [
      {
        name: "Crunch",
        image: "crunch.png",
        sets: 3,
        reps: "20",
        equipment: "none"
      }
    ]
  },
  {
    goal: "Yağ Yakımı",
    level: "Başlangıç",
    muscleGroup: "Karın",
    subGroup: "Alt Karın",
    environment: "ev",
    variations: [
      {
        name: "Leg Raise",
        image: "leg_raise.png",
        sets: 3,
        reps: "15-20",
        equipment: "none"
      }
    ]
  },
  {
    goal: "Yağ Yakımı",
    level: "Orta",
    muscleGroup: "Karın",
    subGroup: "Oblique",
    environment: "ev",
    variations: [
      {
        name: "Russian Twist",
        image: "russian_twist.png",
        sets: 3,
        reps: "20 (her taraf)",
        equipment: "none"
      }
    ]
  },

  // ---------------- OMUZ ----------------
  {
    goal: "Kas Kütlesi Artırmak",
    level: "Orta",
    muscleGroup: "Omuz",
    subGroup: "Ön Omuz",
    environment: "salon",
    variations: [
      {
        name: "Front Raise",
        image: "front_raise.png",
        sets: 3,
        reps: "12-15",
        equipment: "dumbbell"
      }
    ]
  },
  {
    goal: "Kas Kütlesi Artırmak",
    level: "Orta",
    muscleGroup: "Omuz",
    subGroup: "Arka Omuz",
    environment: "salon",
    variations: [
      {
        name: "Rear Delt Fly",
        image: "rear_delt_fly.png",
        sets: 3,
        reps: "12-15",
        equipment: "dumbbell"
      }
    ]
  },
  {
    goal: "Formda Kalma",
    level: "Başlangıç",
    muscleGroup: "Omuz",
    subGroup: "Genel",
    environment: "ev",
    variations: [
      {
        name: "Plank to Downward Dog",
        image: "plank_dog.png",
        sets: 3,
        reps: "30 saniye",
        equipment: "none"
      }
    ]
  },

  // ---------------- KOL ----------------
  {
    goal: "Kas Kütlesi Artırmak",
    level: "Orta",
    muscleGroup: "Kol",
    subGroup: "Biceps",
    environment: "salon",
    variations: [
      {
        name: "Concentration Curl",
        image: "concentration_curl.png",
        sets: 3,
        reps: "10-12",
        equipment: "dumbbell"
      },
      {
        name: "Zottman Curl",
        image: "zottman_curl.png",
        sets: 3,
        reps: "10-12",
        equipment: "dumbbell"
      }
    ]
  },
  {
    goal: "Kas Kütlesi Artırmak",
    level: "Başlangıç",
    muscleGroup: "Kol",
    subGroup: "Triceps",
    environment: "ev",
    variations: [
      {
        name: "Close-Grip Push-Up",
        image: "close_grip_pushup.png",
        sets: 3,
        reps: "15-20",
        equipment: "none"
      },
      {
        name: "Resistance Band Triceps Pushdown",
        image: "band_triceps_pushdown.png",
        sets: 3,
        reps: "15",
        equipment: "resistance_band"
      }
    ]
  },

  // ---------------- BACAK ----------------
  {
    goal: "Kas Kütlesi Artırmak",
    level: "Orta",
    muscleGroup: "Bacak",
    subGroup: "Quadriceps",
    environment: "salon",
    variations: [
      {
        name: "Bulgarian Split Squat",
        image: "bulgarian_split_squat.png",
        sets: 3,
        reps: "8-12 (her bacak)",
        equipment: "dumbbell"
      },
      {
        name: "Dumbbell Step-Up",
        image: "dumbbell_step_up.png",
        sets: 3,
        reps: "10-12",
        equipment: "dumbbell"
      }
    ]
  },
  {
    goal: "Formda Kalma",
    level: "Başlangıç",
    muscleGroup: "Bacak",
    subGroup: "Glute / Hamstring",
    environment: "ev",
    variations: [
      {
        name: "Glute Bridge",
        image: "glute_bridge.png",
        sets: 3,
        reps: "20",
        equipment: "none"
      },
      {
        name: "Single-Leg Deadlift",
        image: "single_leg_deadlift.png",
        sets: 3,
        reps: "10-12",
        equipment: "none"
      }
    ]
  }
];
