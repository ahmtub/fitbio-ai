
// screens/DailyPlanScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { analyzeDiet } from '../utils/dietAnalyzer';
import { generateDailyPlanPDF } from '../utils/pdfHelper';
import { calculateBodyMetrics } from '../utils/useBodyMetrics';
import { recommendDiet } from '../utils/dietRecommender';
import { recommendWorkoutPlan } from '../utils/recommendWorkoutPlan';

export default function DailyPlanScreen() {
  const [goal, setGoal] = useState("Kas Kütlesi Artırmak");
  const [workoutTime, setWorkoutTime] = useState("akşam");
  const [customDiet, setCustomDiet] = useState({
    breakfast: "",
    lunch: "",
    dinner: "",
    snacks: ""
  });
  const [analysisResult, setAnalysisResult] = useState({
    protein: "Hesaplanıyor...",
    carbohydrate: "Hesaplanıyor..."
  });
  const [metrics, setMetrics] = useState(null);
  const [selectedDiet, setSelectedDiet] = useState(null);
  const [workoutPlan, setWorkoutPlan] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const m = calculateBodyMetrics({
      weight: 115,
      height: 198,
      age: 36,
      gender: "male",
      activityLevel: "moderate",
      fatMass: 33.9,
      muscleMass: 25.0
    });
    const d = recommendDiet(goal, workoutTime, {
      fatPercent: 33.9,
      muscleMass: 25.0
    });
    const w = recommendWorkoutPlan(goal, "Orta", "salon", ["Göğüs", "Omuz", "Karın"]);
    setMetrics(m);
    setSelectedDiet(d);
    setWorkoutPlan(w);
    setLoading(false);

    console.log("Metrics:", m);
    console.log("Selected Diet:", d);
    console.log("Workout Plan:", w);
  }, []);

  useEffect(() => {
    const result = analyzeDiet(customDiet);
    setAnalysisResult(result);
    console.log("Diyet analizi:", result);
  }, [customDiet]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#00e676" />
        <Text style={{ color: '#fff' }}>Analiz hazırlanıyor...</Text>
      </View>
    );
  }

  const handleExportPDF = async () => {
    await generateDailyPlanPDF({
      goal,
      workoutTime,
      customDiet,
      analysisResult,
      progress: null,
      workoutPlan
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>🎯 Hedefin: {goal}</Text>
      <Text style={styles.sectionTitle}>🕕 Antrenman Zamanı: {workoutTime}</Text>

      {metrics && (
        <View style={styles.metricsBox}>
          <Text style={styles.planText}>🧍‍♂️ BMI: {metrics.bmi}</Text>
          <Text style={styles.planText}>🔥 BMR: {metrics.bmr} kcal</Text>
          <Text style={styles.planText}>⚡ TDEE: {metrics.tdee} kcal</Text>
          <Text style={styles.planText}>🥩 Protein: {metrics.macros.protein} g</Text>
          <Text style={styles.planText}>🍞 Karbonhidrat: {metrics.macros.carbs} g</Text>
          <Text style={styles.planText}>🧈 Yağ: {metrics.macros.fat} g</Text>
        </View>
      )}

      {selectedDiet && (
        <>
          <Text style={styles.sectionHeader}>🍽️ AI Diyet Önerisi</Text>
          <Text style={styles.planText}>🥣 Kahvaltı: {selectedDiet.meals.breakfast}</Text>
          <Text style={styles.planText}>🍛 Öğle: {selectedDiet.meals.lunch}</Text>
          <Text style={styles.planText}>🍲 Akşam: {selectedDiet.meals.dinner}</Text>
          <Text style={styles.planText}>🍏 Ara Öğün: {selectedDiet.meals.snacks}</Text>
        </>
      )}

      <Text style={styles.sectionHeader}>🧾 Kendi Diyet Planın:</Text>
      <TextInput style={styles.input} placeholder="🍳 Kahvaltı" placeholderTextColor="#aaa" onChangeText={(text) => setCustomDiet({ ...customDiet, breakfast: text })} />
      <TextInput style={styles.input} placeholder="🍗 Öğle" placeholderTextColor="#aaa" onChangeText={(text) => setCustomDiet({ ...customDiet, lunch: text })} />
      <TextInput style={styles.input} placeholder="🥗 Akşam" placeholderTextColor="#aaa" onChangeText={(text) => setCustomDiet({ ...customDiet, dinner: text })} />
      <TextInput style={styles.input} placeholder="🍏 Ara Öğün" placeholderTextColor="#aaa" onChangeText={(text) => setCustomDiet({ ...customDiet, snacks: text })} />

      <Text style={styles.sectionHeader}>📊 Diyet Analizi:</Text>
      <Text style={styles.planText}>• Protein: {analysisResult.protein}</Text>
      <Text style={styles.planText}>• Karbonhidrat: {analysisResult.carbohydrate}</Text>

      <View style={styles.buttonWrapper}>
        <Button title="📄 PDF Kaydet & Paylaş" onPress={handleExportPDF} color="#4caf50" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#1e1e2f" },
  sectionTitle: { color: "#fff", fontSize: 20, fontWeight: "bold", marginVertical: 10 },
  sectionHeader: { color: "#ccc", fontSize: 16, fontWeight: "bold", marginTop: 20 },
  planText: { color: "#eee", fontSize: 14, marginVertical: 2 },
  input: { backgroundColor: "#2a2a3d", color: "#fff", borderRadius: 10, padding: 10, marginVertical: 5 },
  buttonWrapper: { marginTop: 30, marginBottom: 60 },
  metricsBox: { marginBottom: 15, marginTop: 5 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1e1e2f' }
});
