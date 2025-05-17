
import { StyleSheet, Text, View } from 'react-native';


const goalLabels = {
  muscle: "Kas kazanımı",
  fat: "Yağ yakımı",
  fit: "Formda kalma"
};


export default function WorkoutSummaryCard({ metrics, workout, userData }) {
  const {
    bmi,
    bmr,
    tdee,
    fatMass,
    waterMass,
    estimatedMuscleMass
  } = metrics || {};

  return (
    <View style={styles.card}>
      <Text style={styles.title}>📊 Vücut Analizi</Text>

      
      {userData?.goal && (
        <Text style={styles.row}>
          🎯 Hedef: <Text style={styles.value}>
            {userData.goal === "muscle" ? "Kas kazanımı" :
             userData.goal === "fat" ? "Yağ yakımı" : "Formda kalma"}
          </Text>
        </Text>
      )}

      <Text style={styles.row}>🧍‍♂️ BMI: <Text style={styles.value}>{bmi}</Text></Text>
      <Text style={styles.row}>🔥 BMR: <Text style={styles.value}>{bmr} kcal</Text></Text>
      <Text style={styles.row}>⚡ TDEE: <Text style={styles.value}>{tdee} kcal</Text></Text>

      {fatMass && (
        <Text style={styles.row}>🧈 Yağ Kütlesi: <Text style={styles.value}>{fatMass} kg</Text></Text>
      )}

      {waterMass && (
        <Text style={styles.row}>💧 Sıvı Kütlesi: <Text style={styles.value}>{waterMass} kg</Text></Text>
      )}

      {estimatedMuscleMass && (
        <Text style={styles.row}>💪 Kas Kütlesi: <Text style={styles.value}>{estimatedMuscleMass} kg</Text></Text>
      )}

      {workout && (
        <>
          <Text style={[styles.title, { marginTop: 20 }]}>📅 Haftalık Antrenman Planı</Text>
          {Object.entries(workout).map(([day, activity]) => (
            <Text key={day} style={styles.row}>📌 {day}: <Text style={styles.value}>{activity}</Text></Text>
          ))}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2e2e3e',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20
  },
  title: {
    color: '#4ade80',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  row: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 8
  },
  value: {
    fontWeight: 'bold',
    color: '#facc15'
  }
});
