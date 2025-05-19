
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { calculateBodyMetrics } from '../utils/useBodyMetrics';
import { recommendDiet } from '../utils/dietRecommender';
import { generateWorkoutPlan } from '../utils/workoutPlanner';

export default function ResultScreen({ route }) {
  const {
    weight, height, age, gender, activityLevel,
    goal, workoutTime, fatMass, muscleMass, level
  } = route.params;

  const [metrics, setMetrics] = useState(null);
  const [diet, setDiet] = useState(null);
  const [workoutPlan, setWorkoutPlan] = useState([]);

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
  }, []);

  const handleShare = async () => {
    const content = generatePlanText();
    const path = FileSystem.documentDirectory + 'plan_summary.txt';
    await FileSystem.writeAsStringAsync(path, content);

    try {
      await Sharing.shareAsync(path);
    } catch (error) {
      Alert.alert('Paylaşım Hatası', 'Plan paylaşılırken bir sorun oluştu.');
    }
  };

  const generatePlanText = () => {
    let text = "📋 FitBio AI - Antrenman Planı Özeti\n\n";
    workoutPlan.forEach(day => {
      text += `📅 ${day.day}:\n`;
      day.exercises.forEach(ex => {
        text += `- ${ex.name} (${ex.sets}x${ex.reps})\n`;
      });
      text += '\n';
    });
    return text;
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

      <Text style={styles.sectionTitle}>💊 Takviye Önerileri</Text>
      {diet.supplements.map((supp, i) => (
        <Text key={i} style={styles.item}>• {supp}</Text>
      ))}

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
