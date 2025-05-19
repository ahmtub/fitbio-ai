
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { calculateBodyMetrics } from '../utils/useBodyMetrics';
import { recommendDiet } from '../utils/dietRecommender';
import { generateWorkoutPlan } from '../utils/workoutPlanner';
import { generateDailyPlanPDF } from '../utils/pdfHelper';

export default function ResultScreen({ route }) {
  const {
    weight, height, age, gender, activityLevel,
    goal, workoutTime, fatMass, muscleMass, level
  } = route.params;

  const [metrics, setMetrics] = useState(null);
  const [diet, setDiet] = useState(null);
  const [workoutPlan, setWorkoutPlan] = useState([]);
  const [customDiet, setCustomDiet] = useState(null);

  useEffect(() => {
    const calc = calculateBodyMetrics({
      weight, height, age, gender, activityLevel,
      fatMass, muscleMass
    });
    setMetrics(calc);

    const recommended = recommendDiet(goal, workoutTime, {
      fatPercent: fatMass,
      muscleMass
    });
    setDiet(recommended);

    const plan = generateWorkoutPlan(goal, muscleMass, workoutTime, level);
    setWorkoutPlan(plan);

    const loadCustomDiet = async () => {
      try {
        const saved = await AsyncStorage.getItem('fitbio_custom_diet');
        if (saved) {
          const parsed = JSON.parse(saved);
          console.log('📝 Kullanıcı Diyeti:', parsed);
          setCustomDiet(parsed);
        } else {
          console.log('📝 Kullanıcı diyeti bulunamadı.');
        }
      } catch (e) {
        console.log('❌ Diyet okuma hatası:', e);
      }
    };

    loadCustomDiet();
  }, []);

  useEffect(() => {
    console.log("🎯 Hedef:", goal);
    console.log("🕕 Antrenman Saati:", workoutTime);
    console.log("📊 Vücut Analizi:", metrics);
    console.log("📦 AI Diyeti:", diet);
    console.log("💊 Takviyeler:", diet?.supplements);
    console.log("🏋️ Antrenman Planı:", workoutPlan);
    console.log("📝 Kendi Diyet Planı:", customDiet);
  }, [metrics, diet, workoutPlan, customDiet]);

  const handleShare = async () => {
    console.log("📤 PDF İçeriği Gönderiliyor:");
    console.log("  🎯 goal:", goal);
    console.log("  🧮 analysisResult:", metrics);
    console.log("  🍽️ diet:", diet);
    console.log("  🏋️ workoutPlan:", workoutPlan);
    console.log("  📝 customDiet:", customDiet);

    await generateDailyPlanPDF({
      goal,
      workoutTime,
      customDiet,
      analysisResult: metrics,
      workoutPlan,
      diet
    });
  };

  if (!metrics || !diet) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4caf50" />
        <Text style={styles.loadingText}>Analiz hazırlanıyor...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🧠 FitBio AI – Analiz & Plan</Text>

      <Text style={styles.sectionTitle}>📊 Vücut Analizi</Text>
      <Text style={styles.item}>🎯 Hedef: {goal}</Text>
      <Text style={styles.item}>🧍‍♂️ BMI: {metrics.bmi}</Text>
      <Text style={styles.item}>🔥 BMR: {metrics.bmr} kcal</Text>
      <Text style={styles.item}>⚡ TDEE: {metrics.tdee} kcal</Text>
      <Text style={styles.item}>🧈 Yağ Kütlesi: {metrics.fatMass} kg</Text>
      <Text style={styles.item}>💪 Kas Kütlesi: {metrics.muscleMass} kg</Text>

      <Text style={styles.sectionTitle}>🏋️ Haftalık Antrenman Planı</Text>
      {workoutPlan.map((day, i) => (
        <View key={i}>
          <Text style={styles.item}>📅 {day.day}:</Text>
          {day.exercises.map((ex, j) => (
            <Text key={j} style={styles.item}>• {ex.name} ({ex.sets}x{ex.reps})</Text>
          ))}
        </View>
      ))}

      <Text style={styles.sectionTitle}>🍽️ AI Tabanlı Günlük Diyet</Text>
      <Text style={styles.item}>🥣 Kahvaltı: {diet.meals.breakfast}</Text>
      <Text style={styles.item}>🍛 Öğle: {diet.meals.lunch}</Text>
      <Text style={styles.item}>🍲 Akşam: {diet.meals.dinner}</Text>
      <Text style={styles.item}>🍏 Ara Öğün: {diet.meals.snacks}</Text>

      {diet.supplements && diet.supplements.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>💊 Takviye Önerileri</Text>
          {diet.supplements.map((supp, i) => (
            <Text key={i} style={styles.item}>• {supp}</Text>
          ))}
        </>
      )}

      {customDiet && (
        <>
          <Text style={styles.sectionTitle}>📝 Kendi Diyet Planın</Text>
          <Text style={styles.item}>🥣 Kahvaltı: {customDiet.breakfast}</Text>
          <Text style={styles.item}>🍛 Öğle: {customDiet.lunch}</Text>
          <Text style={styles.item}>🍲 Akşam: {customDiet.dinner}</Text>
          <Text style={styles.item}>🍏 Ara Öğün: {customDiet.snacks}</Text>
          <Text style={styles.item}>💊 Takviyeler: {customDiet.supplements}</Text>
        </>
      )}

      <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
        <Text style={styles.shareText}>📤 Planı Paylaş / Kaydet</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#1e1e2f",
    flex: 1
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20
  },
  sectionTitle: {
    color: "#ccc",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20
  },
  item: {
    color: "#fff",
    fontSize: 14,
    marginVertical: 3
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1e2f'
  },
  loadingText: {
    color: '#fff',
    marginTop: 10
  },
  shareButton: {
    marginTop: 30,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#4ade80"
  },
  shareText: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "center"
  }
});
