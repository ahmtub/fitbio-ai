import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { generateAIDietPlan } from '../utils/aiDietPlanner';

export default function DietSuggestionScreen({ route }) {
  const { userData } = route.params;
  const [diet, setDiet] = useState(null);

  useEffect(() => {
    const fetchDiet = async () => {
      const result = await generateAIDietPlan(userData);
      setDiet(result);
    };
    fetchDiet();
  }, []);

  if (!diet) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#4ade80" />
        <Text style={{ color: '#fff', marginTop: 10 }}>Diyet önerisi hazırlanıyor...</Text>
      </View>
    );
  }

  const { meals, totalCalories, macros } = diet;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🍽️ AI Tabanlı Günlük Diyet Önerisi</Text>

      <Text style={styles.meal}>🥣 Kahvaltı: {meals.breakfast}</Text>
      <Text style={styles.meal}>🍛 Öğle: {meals.lunch}</Text>
      <Text style={styles.meal}>🍲 Akşam: {meals.dinner}</Text>

      <View style={styles.card}>
        <Text style={styles.macroTitle}>Makro Değerler:</Text>
        <Text style={styles.macro}>Toplam Kalori: {totalCalories} kcal</Text>
        <Text style={styles.macro}>Protein: {macros.protein}</Text>
        <Text style={styles.macro}>Karbonhidrat: {macros.carbs}</Text>
        <Text style={styles.macro}>Yağ: {macros.fat}</Text>
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
  loading: {
    flex: 1,
    backgroundColor: '#1e1e2f',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: '#4ade80',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20
  },
  meal: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 15
  },
  card: {
    backgroundColor: '#2e2e3e',
    padding: 15,
    borderRadius: 10,
    marginTop: 20
  },
  macroTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10
  },
  macro: {
    color: '#ccc',
    fontSize: 15,
    marginBottom: 5
  }
});
