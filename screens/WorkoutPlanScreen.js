
// screens/WorkoutPlanScreen.js

import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { recommendWorkoutPlan } from '../utils/recommendWorkoutPlan';

export default function WorkoutPlanScreen({ route }) {
  const { goal, level, environment, targetMuscles } = route.params;

  const [plan, setPlan] = useState([]);

  useEffect(() => {
    const result = recommendWorkoutPlan(goal, level, environment, targetMuscles);
    setPlan(result);
  }, [goal, level, environment, targetMuscles]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>💪 FitBio AI - Antrenman Planı</Text>
      <Text style={styles.subTitle}>🎯 Hedef: {goal} | 🏋️ Seviye: {level} | 📍 Ortam: {environment}</Text>

      {plan.map((block, i) => (
        <View key={i} style={styles.block}>
          <Text style={styles.groupTitle}>
            📌 {block.muscleGroup} ({block.subGroup})
          </Text>
          {block.exercises.map((ex, j) => (
            <View key={j} style={styles.exercise}>
              <Text style={styles.exerciseName}>• {ex.name}</Text>
              <Text style={styles.details}>🔁 {ex.sets} set × {ex.reps} tekrar</Text>
              <Text style={styles.details}>🎯 Ekipman: {ex.equipment}</Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e1e2f',
    padding: 16,
    flex: 1
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10
  },
  subTitle: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 16
  },
  block: {
    backgroundColor: '#2a2a3d',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16
  },
  groupTitle: {
    color: '#00e676',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8
  },
  exercise: {
    marginBottom: 10
  },
  exerciseName: {
    color: '#fff',
    fontSize: 14
  },
  details: {
    color: '#aaa',
    fontSize: 12
  }
});
