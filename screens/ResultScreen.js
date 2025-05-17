import { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import WorkoutSummaryCard from '../components/WorkoutSummaryCard';
import useBodyMetrics from '../hooks/useBodyMetrics';
import { generateAIDietPlan } from '../utils/aiDietPlanner'; // 🔥 AI diyeti
import { generateWorkoutPlanFromExerciseDB } from '../utils/generateWorkoutPlanFromExerciseDB';
import { generateFullReportHTML } from '../utils/pdfGenerator';
import { saveAndSharePDF } from '../utils/pdfHelper';

export default function ResultScreen({ route, navigation }) {
  const userData = route?.params?.userData;


  const [workout, setWorkout] = useState(null);

  const handlePdfExport = async () => {
    if (userData && metrics && workout && diet) {
      const html = generateFullReportHTML({
        userData,
        metrics,
        weeklyPlan: workout,
        diet
      });

      await saveAndSharePDF(html, "FitBioAI_Rapor");
    } else {
      alert("PDF oluşturmak için tüm veriler hazır değil!");
    }
  };


  

  

  useEffect(() => {
    const fetchPlans = async () => {
      const dietResult = await generateAIDietPlan(userData);
      if (dietResult) setDiet(dietResult);

      const workoutResult = await generateWorkoutPlanFromExerciseDB(userData);
      if (workoutResult) setWorkout(workoutResult);
    };

    if (userData) fetchPlans();
  }, [userData]);

  const [diet, setDiet] = useState(null);

  useEffect(() => {
    const fetchDiet = async () => {
      const result = await generateAIDietPlan(userData); // 📡 AI diyeti çek
      if (result) setDiet(result);
    };

    if (userData) fetchDiet();
  }, [userData]);

  if (!userData) {
    return (
      <View style={styles.fallback}>
        <Text style={styles.errorText}>⚠️ Kullanıcı verisi bulunamadı. Lütfen ana menüden tekrar başlayın.</Text>
        <Button title="Ana Sayfa" color="#4ade80" onPress={() => navigation.navigate('Home')} />
      </View>
    );
  }

  const metrics = useBodyMetrics(userData);
  
  const { tdee = 0, bmr = 0, goal } = metrics || {};
  let recommendation = '';

  if (goal === 'muscle') {
    recommendation = `
💪 Hedef: Kas Kütlesi Artırmak

🍽️ Günlük Kalori: ${Math.round(tdee + 300)} kcal
🍗 Diyet: Yüksek protein, orta karbonhidrat
🏋️‍♂️ Antrenman: Split (Push/Pull/Legs)
💊 Takviye: Kreatin, ZMA
📆 Program: Haftada 5 gün
    `;
  } else if (goal === 'fatburn' || goal === 'fat') {
    recommendation = `
🔥 Hedef: Yağ Yakmak

🍽️ Günlük Kalori: ${Math.round(tdee - 400)} kcal
🥗 Diyet: Düşük karbonhidrat, yüksek protein
🏃‍♂️ Kardiyo: HIIT + yürüyüş
💊 Takviye: CLA, L-Karnitin
📆 Program: Haftada 4-6 gün
    `;
  } else {
    recommendation = `Hedef belirtilmedi.`;
  }

  const handleExportFullReport = async () => {
    const html = generateFullReportHTML({
      userData,
      metrics,
      weeklyPlan,
      diet
    });

    await saveAndSharePDF(html, 'FitBioAI_KisiselRapor');
  };

  if (!metrics) return <Text style={{ color: '#fff', padding: 20 }}>Veriler işleniyor...</Text>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>🧠 FitBio AI – Analiz & Plan</Text>

      <WorkoutSummaryCard metrics={metrics}  userData={userData} />

      <View style={styles.planContainer}>
        <Text style={styles.planTitle}>📅 Haftalık Antrenman Planı</Text>
        {workout && Object.entries(workout).map(([day, activity]) => (
          <View key={day} style={styles.dayItem}>
            <Text style={styles.day}>{day}:</Text>
            <Text style={styles.activity}>{activity}</Text>
          </View>
        ))}
      </View>{diet && (
        <View style={styles.planContainer}>
          <Text style={styles.planTitle}>🍽️ AI Tabanlı Günlük Diyet</Text>
          <Text style={styles.activity}>🥣 Kahvaltı: {diet.meals.breakfast}</Text>
          <Text style={styles.activity}>🍛 Öğle: {diet.meals.lunch}</Text>
          <Text style={styles.activity}>🍲 Akşam: {diet.meals.dinner}</Text>
          <Text style={styles.activity}>🔢 Kalori: {diet.totalCalories} kcal</Text>
          <Text style={styles.activity}>🥩 Protein: {diet.macros.protein}</Text>
          <Text style={styles.activity}>🍞 Karbonhidrat: {diet.macros.carbs}</Text>
          <Text style={styles.activity}>🧈 Yağ: {diet.macros.fat}</Text>
        </View>
      )}

      <View style={styles.button}>
        <Button title="📅 Bugünkü Check-in" color="#2196f3" onPress={() => navigation.navigate('Checkin')} />
      </View>

      <View style={styles.button}>
              </View>
    
      <View style={{ marginTop: 20 }}>
              </View>
    
      <View style={{ marginTop: 10, marginBottom: 20 }}>
        <Button title="📄 PDF olarak görüntüle & dışa aktar" onPress={handlePdfExport} color="#4ade80" />
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e1e2f',
    flex: 1,
    padding: 20
  },
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1e2f',
    padding: 30
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center'
  },
  planContainer: {
    marginTop: 20,
    backgroundColor: '#2e2e3e',
    padding: 16,
    borderRadius: 12
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10
  },
  dayItem: {
    marginBottom: 8
  },
  day: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4ade80'
  },
  activity: {
    fontSize: 16,
    color: '#ccc'
  },
  recommendation: {
    fontSize: 16,
    marginTop: 20,
    backgroundColor: '#2e2e3e',
    padding: 15,
    borderRadius: 8,
    lineHeight: 24,
    color: '#ccc'
  },
  button: {
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden'
  }
});
