
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export async function generateDailyPlanPDF({ goal, workoutTime, customDiet, analysisResult, workoutPlan, diet }) {
  const htmlContent = `
  <html>
    <head>
      <meta charset="UTF-8" />
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; background: #fff; color: #111; }
        h1 { text-align: center; color: #4caf50; }
        .section { margin-bottom: 20px; }
        .section h2 { color: #333; margin-bottom: 8px; }
        .item { margin: 4px 0; }
      </style>
    </head>
    <body>
      <h1>FitBio AI – Günlük Plan Özeti</h1>

      <div class="section">
        <h2>📊 Vücut Analizi</h2>
        <p class="item">🎯 Hedef: ${goal || 'Belirtilmedi'}</p>
        <p class="item">🕕 Antrenman Saati: ${workoutTime || 'Belirtilmedi'}</p>
        <p class="item">🧍‍♂️ BMI: ${analysisResult?.bmi || 'Yok'}</p>
        <p class="item">🔥 BMR: ${analysisResult?.bmr || 'Yok'} kcal</p>
        <p class="item">⚡ TDEE: ${analysisResult?.tdee || 'Yok'} kcal</p>
        <p class="item">🧈 Yağ Kütlesi: ${analysisResult?.fatMass || 'Yok'} kg</p>
        <p class="item">💪 Kas Kütlesi: ${analysisResult?.muscleMass || 'Yok'} kg</p>
      </div>

      <div class="section">
        <h2>🏋️ Haftalık Antrenman Planı</h2>
        ${workoutPlan?.length > 0 ? workoutPlan.map(day => `
          <div class="item">📅 <strong>${day.day}</strong></div>
          ${day.exercises.map(ex => `
            <div class="item">• ${ex.name} (${ex.sets}x${ex.reps})</div>
          `).join('')}
        `).join('') : '<p class="item">Antrenman planı bulunamadı.</p>'}
      </div>

      <div class="section">
        <h2>🍽️ AI Tabanlı Günlük Diyet</h2>
        <p class="item">🥣 Kahvaltı: ${diet?.meals?.breakfast || 'Yok'}</p>
        <p class="item">🍛 Öğle: ${diet?.meals?.lunch || 'Yok'}</p>
        <p class="item">🍲 Akşam: ${diet?.meals?.dinner || 'Yok'}</p>
        <p class="item">🍏 Ara Öğün: ${diet?.meals?.snacks || 'Yok'}</p>
      </div>

      ${diet?.supplements?.length ? `
        <div class="section">
          <h2>💊 Takviye Önerileri</h2>
          ${diet.supplements.map(s => `<div class="item">• ${s}</div>`).join('')}
        </div>
      ` : ''}

      ${customDiet ? `
        <div class="section">
          <h2>📝 Kendi Diyet Planın</h2>
          <p class="item">🥣 Kahvaltı: ${customDiet.breakfast}</p>
          <p class="item">🍛 Öğle: ${customDiet.lunch}</p>
          <p class="item">🍲 Akşam: ${customDiet.dinner}</p>
          <p class="item">🍏 Ara Öğün: ${customDiet.snacks}</p>
          <p class="item">💊 Takviyeler: ${customDiet.supplements}</p>
        </div>
      ` : ''}
    </body>
  </html>
  `;

  const { uri } = await Print.printToFileAsync({ html: htmlContent });
  await Sharing.shareAsync(uri);
}
