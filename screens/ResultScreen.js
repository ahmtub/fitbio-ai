import * as Print from 'expo-print';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ResultScreen({ route, navigation }) {
  const { bmr, tdee, goal } = route.params;

  let recommendation = '';

  if (goal === 'muscle') {
    recommendation = `
💪 Hedef: Kas Kütlesi Artırmak

🍽️ Günlük Kalori: ${Math.round(tdee + 300)} kcal
🍗 Diyet: Yüksek protein, orta karbonhidrat
🏋️‍♂️ Antrenman: Split (Push/Pull/Legs)
💊 Takviye: Follistatin 344, Kreatin, ZMA
📆 Program: Haftada 5 gün
    `;
  } else if (goal === 'fatburn') {
    recommendation = `
🔥 Hedef: Yağ Yakmak

🍽️ Günlük Kalori: ${Math.round(tdee - 400)} kcal
🥗 Diyet: Düşük karbonhidrat, yüksek protein
🏃‍♂️ Kardiyo: HIIT + yürüyüş
💊 Takviye: MK-677, CLA, L-Karnitin
📆 Program: Haftada 4-6 gün
    `;
  } else {
    recommendation = `Hedef belirtilmedi.`;
  }

  const handlePrintPDF = async () => {
    const html = `
      <html>
        <body style="font-family: sans-serif;">
          <h1>🧠 FitBio AI Raporu</h1>
          <p><strong>BMR:</strong> ${Math.round(bmr)} kcal</p>
          <p><strong>TDEE:</strong> ${Math.round(tdee)} kcal</p>
          <pre style="font-size: 14px; white-space: pre-wrap;">${recommendation}</pre>
        </body>
      </html>
    `;
    await Print.printAsync({ html });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>🧠 FitBio AI – Sonuçlar</Text>
      <Text style={styles.result}>📌 BMR: {Math.round(bmr)} kcal</Text>
      <Text style={styles.result}>🔥 TDEE: {Math.round(tdee)} kcal</Text>

      <Text style={styles.recommendation}>{recommendation}</Text>

      <View style={styles.button}>
        <Button title="📅 Bugünkü Check-in" color="#2196f3" onPress={() => navigation.navigate('Checkin')} />
      </View>

      <View style={styles.button}>
        <Button title="📤 PDF Olarak Dışa Aktar" color="#4caf50" onPress={handlePrintPDF} />
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center'
  },
  result: {
    fontSize: 18,
    marginBottom: 10,
    color: '#fff'
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
