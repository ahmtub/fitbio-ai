// utils/mealCulture.js

const mealCulture = {
  "Türkiye": {
    protein: ["tavuk göğsü", "yoğurt", "mercimek", "yumurta"],
    carbs: ["bulgur", "tam buğday ekmeği", "pirinç", "kuru fasulye"],
    vegetables: ["ıspanak", "kabak", "brokoli"],
    sampleMenu: [
      "Kahvaltı: 2 haşlanmış yumurta + domates + salatalık + 1 dilim tam buğday ekmeği",
      "Öğle: 100g tavuk göğsü + 4 kaşık bulgur + yoğurt",
      "Akşam: Mercimek çorbası + zeytinyağlı sebze + 1 dilim ekmek"
    ]
  },
  "Japonya": {
    protein: ["balık", "tofu", "yumurta"],
    carbs: ["pirinç", "soba eriştesi"],
    vegetables: ["deniz yosunu", "lahana", "turp"],
    sampleMenu: [
      "Kahvaltı: Pirinç lapası + haşlanmış yumurta + miso çorbası",
      "Öğle: Izgara balık + pilav + salata",
      "Akşam: Tofu + sebzeli soba eriştesi"
    ]
  },
  "Almanya": {
    protein: ["yumurta", "yoğurt", "tavuk", "fasulye"],
    carbs: ["çavdar ekmeği", "patates", "makarna"],
    vegetables: ["lahana", "havuç", "bezelye"],
    sampleMenu: [
      "Kahvaltı: Çavdar ekmeği + haşlanmış yumurta + salatalık",
      "Öğle: Tavuk haşlama + haşlanmış patates + yoğurt",
      "Akşam: Makarna + yeşil salata + fasulye"
    ]
  }
};

export default mealCulture;
