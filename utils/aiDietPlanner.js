// utils/aiDietPlanner.js

const API_KEY = '81ca0014adcb4ba3ba457c5e1d7687de';

export async function generateAIDietPlan(userData) {
  const { goal } = userData;

  // Kalori hedefini belirle
  const targetCalories = goal === 'muscle' ? 2700 : goal === 'fatburn' ? 1800 : 2200;

  try {
    const response = await fetch(
      `https://api.spoonacular.com/mealplanner/generate?timeFrame=day&targetCalories=${targetCalories}&apiKey=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`API yanıtı başarısız oldu: ${response.status}`);
    }

    const data = await response.json();

    if (!data || !Array.isArray(data.meals) || !data.nutrients) {
      throw new Error('API dönüşü eksik veya hatalı');
    }

    return {
      totalCalories: data.nutrients.calories,
      macros: {
        protein: `${data.nutrients.protein}g`,
        carbs: `${data.nutrients.carbohydrates}g`,
        fat: `${data.nutrients.fat}g`
      },
      meals: {
        breakfast: data.meals[0]?.title || 'Belirsiz',
        lunch: data.meals[1]?.title || 'Belirsiz',
        dinner: data.meals[2]?.title || 'Belirsiz'
      }
    };
  } catch (err) {
    console.error('🛑 Spoonacular API hatası:', err.message);
    return {
      totalCalories: '-',
      macros: { protein: '-', carbs: '-', fat: '-' },
      meals: { breakfast: 'Veri alınamadı', lunch: 'Veri alınamadı', dinner: 'Veri alınamadı' }
    };
  }
}
