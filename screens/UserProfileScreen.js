import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { getAllCheckins } from '../utils/checkinStorage';

export default function UserProfileScreen() {
  const [checkinData, setCheckinData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCheckins();
      const formatted = Object.entries(data).map(([date, entry]) => ({
        date,
        sleep: entry.sleep,
        workout: entry.workedOut,
        mood: entry.mood
      }));
      setCheckinData(formatted);
    };

    fetchData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>📋 Check-in Geçmişi</Text>

      {checkinData.length === 0 ? (
        <Text style={styles.noData}>Henüz check-in yapılmadı.</Text>
      ) : (
        checkinData.map((entry, index) => (
          <View key={index} style={styles.entryCard}>
            <Text style={styles.date}>📅 {entry.date}</Text>
            <Text style={styles.text}>😌 Ruh Hali: {entry.mood}</Text>
            <Text style={styles.text}>🛌 Uyku: {entry.sleep} saat</Text>
            <Text style={styles.text}>🏋️‍♂️ Spor: {entry.workout}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e1e2f',
    padding: 20,
    paddingBottom: 80
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center'
  },
  noData: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginTop: 50
  },
  entryCard: {
    backgroundColor: '#2e2e3e',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4ade80',
    marginBottom: 8
  },
  text: {
    color: '#ccc',
    fontSize: 15,
    marginBottom: 4
  }
});
