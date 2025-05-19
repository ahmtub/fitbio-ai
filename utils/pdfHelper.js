
// utils/pdfHelper.js

import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

/**
 * PDF plan oluşturur
 * @param {object} options
 * @param {string} options.goal
 * @param {string} options.workoutTime
 * @param {object} options.customDiet
 * @param {object} options.analysisResult
 * @param {object} [options.progress]
 * @param {array} [options.workoutPlan]
 */
export async function generateDailyPlanPDF({ goal, workoutTime, customDiet, analysisResult, progress, workoutPlan }) {
  const workoutSection = workoutPlan && workoutPlan.length > 0
    ? `
    <div class="section">
      <h2>🏋️ Haftalık Antrenman Rehberi:</h2>
      ${workoutPlan.map(group => `
        <h3>🔹 ${group.muscleGroup} (${group.subGroup})</h3>
        <ul>
          ${group.exercises.map(ex => `
            <li><strong>${ex.name}</strong> – ${ex.sets} set × ${ex.reps} tekrar (${ex.equipment})</li>
          `).join('')}
        </ul>
      `).join('')}
    </div>
    `
    : '';

  const htmlContent = `
  <html>
    <head>
      <style>
        body { font-family: Arial; padding: 20px; background-color: #f4f4f4; }
        h1 { color: #333; }
        h2 { color: #444; margin-top: 20px; }
        h3 { color: #555; margin-bottom: 5px; }
        p, li { margin: 5px 0; font-size: 14px; }
        .section { margin-bottom: 20px; }
        ul { padding-left: 20px; }
      </style>
    </head>
    <body>
      <h1>Günlük Plan</h1>
      <div class="section">
        <h2>🎯 Hedef:</h2>
        <p>${goal}</p>
      </div>
      <div class="section">
        <h2>🕕 Antrenman Zamanı:</h2>
        <p>${workoutTime}</p>
      </div>
      <div class="section">
        <h2>🧾 Diyet Planı:</h2>
        <p><strong>Kahvaltı:</strong> ${customDiet.breakfast}</p>
        <p><strong>Öğle:</strong> ${customDiet.lunch}</p>
        <p><strong>Akşam:</strong> ${customDiet.dinner}</p>
        <p><strong>Ara Öğün:</strong> ${customDiet.snacks}</p>
      </div>
      <div class="section">
        <h2>📊 Beslenme Analizi:</h2>
        <p>Protein durumu: ${analysisResult.protein}</p>
        <p>Karbonhidrat durumu: ${analysisResult.carbohydrate}</p>
      </div>
      ${workoutSection}
      ${progress ? `
        <div class="section">
          <h2>📈 Haftalık Gelişim:</h2>
          <p>🏋️ Kilo: ${progress.weight.start} → ${progress.weight.end} kg (${progress.weight.status})</p>
          <p>🔥 Yağ Oranı: ${progress.fat.start}% → ${progress.fat.end}% (${progress.fat.status})</p>
          <p>💪 Kas Oranı: ${progress.muscle.start}% → ${progress.muscle.end}% (${progress.muscle.status})</p>
        </div>
      ` : ''}
    </body>
  </html>
  `;

  const { uri } = await Print.printToFileAsync({ html: htmlContent });
  await Sharing.shareAsync(uri);
}
