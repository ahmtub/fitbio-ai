// Mock veri ile çalışan diyet öneri fonksiyonu

export async function fetchDietSuggestion({ age, weight, gender, region }) {
  // Şu anlık sabit örnekler
  const fakeApiResponse = {
    karadeniz: {
      region: "Karadeniz",
      suggestion: {
        breakfast: "Mısır ekmeği, minci, haşlanmış yumurta, çay",
        lunch: "Hamsi tava, kara lahana çorbası, yoğurt",
        dinner: "Fırında sebzeli balık, yeşil salata",
        totalCalories: 2200,
        macros: {
          protein: "120g",
          carbs: "200g",
          fat: "90g"
        }
      }
    },
    ege: {
      region: "Ege",
      suggestion: {
        breakfast: "Zeytin, peynir, domates, tam buğday ekmeği, haşlanmış yumurta",
        lunch: "Zeytinyağlı sebze yemeği + yoğurt + bulgur",
        dinner: "Izgara tavuk + salata",
        totalCalories: 2000,
        macros: {
          protein: "110g",
          carbs: "180g",
          fat: "70g"
        }
      }
    }
  };

  const regionKey = region?.toLowerCase() || "ege";
  return fakeApiResponse[regionKey] || fakeApiResponse["ege"];
}
