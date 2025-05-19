
// screens/WeeklyReportScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Button } from 'react-native';
import { calculateWeeklyProgress } from '../utils/progressTracker';

export default function WeeklyReportScreen() {
  const [history, setHistory] = useState([
    { date: '2025-05-12', weight: 80, fatPercent: 20, musclePercent: 38 },
    { date: '2025-05-19', weight: 78.4, fatPercent: 18, musclePercent: 40 }
  ]);

  const [progress, setProgress] = useState(null);

  const handleCalculate = () => {
    const result = calculateWeeklyProgress(history);
    setProgress(result);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>📈 Haftalık Gelişim Raporu</Text>

      <Text style={styles.label}>Gün 1: Başlangıç Verileri</Text>
      <Text style={styles.inputLabel}>Kilo (kg):</Text>
      <TextInput style={styles.input} value="80" editable={false} />
      <Text style={styles.inputLabel}>Yağ Oranı (%):</Text>
      <TextInput style={styles.input} value="20" editable={false} />
      <Text style={styles.inputLabel}>Kas Oranı (%):</Text>
      <TextInput style={styles.input} value="38" editable={false} />

      <Text style={styles.label}>Gün 7: Son Veriler</Text>
      <Text style={styles.inputLabel}>Kilo (kg):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="78.4"
        onChangeText={(text) => {
          const updated = [...history];
          updated[1].weight = parseFloat(text) || 0;
          setHistory(updated);
        }}
      />
      <Text style={styles.inputLabel}>Yağ Oranı (%):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="18"
        onChangeText={(text) => {
          const updated = [...history];
          updated[1].fatPercent = parseFloat(text) || 0;
          setHistory(updated);
        }}
      />
      <Text style={styles.inputLabel}>Kas Oranı (%):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="40"
        onChangeText={(text) => {
          const updated = [...history];
          updated[1].musclePercent = parseFloat(text) || 0;
          setHistory(updated);
        }}
      />

      <View style={{ marginTop: 20 }}>
        <Button title="🔍 Gelişimi Hesapla" onPress={handleCalculate} color="#03a9f4" />
      </View>

      {progress && (
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>🏋️ Kilo: {progress.weight.start} → {progress.weight.end} ({progress.weight.status})</Text>
          <Text style={styles.resultText}>🔥 Yağ Oranı: {progress.fat.start}% → {progress.fat.end}% ({progress.fat.status})</Text>
          <Text style={styles.resultText}>💪 Kas Oranı: {progress.muscle.start}% → {progress.muscle.end}% ({progress.muscle.status})</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#1e1e2f",
    flex: 1
  },
  header: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20
  },
  label: {
    color: "#ccc",
    fontSize: 16,
    marginTop: 10
  },
  inputLabel: {
    color: "#999",
    marginTop: 5
  },
  input: {
    backgroundColor: "#2a2a3d",
    color: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10
  },
  resultBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#2e2e3e",
    borderRadius: 10
  },
  resultText: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 6
  }
});
