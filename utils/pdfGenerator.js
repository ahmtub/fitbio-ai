export function generateFullReportHTML({  userData, metrics, weeklyPlan, diet  }) {

  const goalLabels = {
    muscle: "Kas kazanımı",
    fat: "Yağ yakımı",
    fit: "Formda kalma"
  };

  const { height, weight, age, gender, activityLevel, goal, bodyType } = userData;
  const {
    bmi,
    bmr,
    tdee,
    fatMass,
    waterMass,
    estimatedMuscleMass
  } = metrics;

  const { breakfast, lunch, dinner, totalCalories, macros } = diet?.suggestion || {};

  return `
    <html>
      <body style="font-family: sans-serif; padding: 20px;">
        <h1>🧠 FitBio AI – Kişisel Rapor</h1>

        <h2>👤 Kullanıcı Bilgileri</h2>
        <p>Boy: ${height} cm | Kilo: ${weight} kg | Yaş: ${age} | Cinsiyet: ${gender}</p>
        <p>Aktivite Seviyesi: ${activityLevel} | Hedef: ${goal} | Vücut Tipi: ${bodyType || '-'}</p>

        <h2>📊 Vücut Analizi</h2>
<h3>🎯 Hedef: ${goalLabels[goal]}</h3>
        <ul>
          <li><strong>BMI:</strong> ${bmi}</li>
          <li><strong>BMR:</strong> ${bmr} kcal</li>
          <li><strong>TDEE:</strong> ${tdee} kcal</li>
          <li><strong>Yağ Kütlesi:</strong> ${fatMass || '-'} kg</li>
          <li><strong>Sıvı Kütlesi:</strong> ${waterMass || '-'} kg</li>
          <li><strong>Kas Kütlesi:</strong> ${estimatedMuscleMass || '-'} kg</li>
        </ul>

        <h2>📅 Haftalık Antrenman Planı</h2>
        <ul>
          ${Object.entries(weeklyPlan)
            .map(([day, activity]) => `<li><strong>${day}:</strong> ${activity}</li>`)
            .join('')}
        </ul>

        <h2>🍽️ Kültürel Diyet – ${diet?.region || "Belirtilmedi"}</h2>
        <p><strong>Kahvaltı:</strong> ${breakfast || '-'}</p>
        <p><strong>Öğle:</strong> ${lunch || '-'}</p>
        <p><strong>Akşam:</strong> ${dinner || '-'}</p>
        <p><strong>Toplam Kalori:</strong> ${totalCalories || '-'} kcal</p>

        <h3>Makro Değerler:</h3>
        <ul>
          <li>Protein: ${macros?.protein || '-'}</li>
          <li>Karbonhidrat: ${macros?.carbs || '-'}</li>
          <li>Yağ: ${macros?.fat || '-'}</li>
        </ul>

        <p style="margin-top: 40px; font-size: 12px; text-align: center;">© FitBio AI ${new Date().getFullYear()}</p>
      
  <h2>🍽️ AI Tabanlı Günlük Diyet</h2>
  <p>🥣 <strong>Kahvaltı:</strong> ${diet.breakfast}</p>
  <p>🍛 <strong>Öğle:</strong> ${diet.lunch}</p>
  <p>🍲 <strong>Akşam:</strong> ${diet.dinner}</p>
  <p>🔢 <strong>Kalori:</strong> ${diet.calories} kcal</p>
  <p>🥩 <strong>Protein:</strong> ${diet.protein}g</p>
  <p>🍞 <strong>Karbonhidrat:</strong> ${diet.carbs}g</p>
  <p>🧈 <strong>Yağ:</strong> ${diet.fat}g</p>

</body>
    </html>
  `;
}
