
// screens/DietSuggestionScreen.js

import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { recommendDiet } from '../utils/dietRecommender';

export default function DietSuggestionScreen({ route }) {
  const { goal, workoutTime, fatPercent, muscleMass } = route.params;
  const [diet, setDiet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const result = recommendDiet(goal, workoutTime, {
      fatPercent,
      muscleMass
    });
    setDiet(result);
    setLoading(false);
  }, [goal, workoutTime, fatPercent, muscleMass]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4caf50" />
        <Text style={styles.loadingText}>AI tabanlı diyet planı hazırlanıyor...</Text>
      </View>
    );
  }

  if (!diet) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Uygun bir diyet planı bulunamadı.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🍽️ AI Diyet Planı</Text>
      <Text style={styles.label}>🥣 Kahvaltı:</Text>
      <Text style={styles.value}>{diet.meals.breakfast}</Text>
      <Text style={styles.label}>🍛 Öğle:</Text>
      <Text style={styles.value}>{diet.meals.lunch}</Text>
      <Text style={styles.label}>🍲 Akşam:</Text>
      <Text style={styles.value}>{diet.meals.dinner}</Text>
      <Text style={styles.label}>🍏 Ara Öğün:</Text>
      <Text style={styles.value}>{diet.meals.snacks}</Text>

      {diet.supplements && diet.supplements.length > 0 && (
        <>
          <Text style={styles.label}>💊 Takviyeler:</Text>
          {diet.supplements.map((supp, index) => (
            <Text style={styles.value} key={index}>• {supp}</Text>
          ))}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e2f',
    padding: 20
  },
  title: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20
  },
  label: {
    color: '#ccc',
    fontSize: 16,
    marginTop: 10
  },
  value: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 10
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
  errorText: {
    color: 'red',
    fontSize: 16
  }
});
