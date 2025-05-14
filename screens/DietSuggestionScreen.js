import { Picker } from '@react-native-picker/picker';
import * as Print from 'expo-print';
import { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';

import mealCulture from '../utils/mealCulture';

export default function DietSuggestionScreen({ route }) {
  const { height, weight, age, gender, activityLevel, goal } = route.params;
  const [selectedCountry, setSelectedCountry] = useState('Türkiye');

  const calculateTDEE = () => {
    const bmr = gender === 'male'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

    const multiplier = {
      passive: 1.2,
      active: 1.55,
      athletic: 1.9
    }[activityLevel] || 1.2;

    let tdee = bmr * multiplier;
    if (goal === 'muscle') tdee += 300;
    if (goal === 'fatburn') tdee -= 400;
    return tdee;
  };

  const tdee = calculateTDEE();
  const baseMenu = mealCulture[selectedCountry]?.sampleMenu || [];

  // Basit filtreleme örneği
  const personalizedMenu = baseMenu.filter(item => {
    if (goal === 'muscle') {
      return /et|yumurta|bakla|yoğurt|süt|tavuk|balık/i.test(item);
    } else if (goal === 'fatburn') {
      return /salata|sebze|yoğurt|haşlama|yumurta|ızgara/i.test(item);
    }
    return true;
  });

  const recommendationHeader = goal === 'muscle'
    ? '💪 Kas Artırımı için Menü'
    : goal === 'fatburn'
    ? '🔥 Yağ Yakımı için Menü'
    : '🍽️ Genel Diyet Menüsü';

  const goalNote = goal === 'muscle'
    ? 'Bu plan kas yapımı desteklemek için yüksek protein içerir.'
    : goal === 'fatburn'
    ? 'Bu plan yağ yakımını desteklemek için düşük karbonhidratlı ve lifli içeriklere odaklıdır.'
    : '';

  const handlePDFExport = async () => {
    const html = `
      <html>
        <body>
          <h1>FitBio AI - ${selectedCountry} Diyet Planı</h1>
          <p><strong>Boy:</strong> ${height} cm</p>
          <p><strong>Kilo:</strong> ${weight} kg</p>
          <p><strong>Yaş:</strong> ${age}</p>
          <p><strong>Cinsiyet:</strong> ${gender}</p>
          <p><strong>Aktivite Seviyesi:</strong> ${activityLevel}</p>
          <p><strong>Hedef:</strong> ${goal || 'Belirtilmedi'}</p>
          <p><strong>Tahmini Günlük Kalori İhtiyacı (TDEE):</strong> ${Math.round(tdee)} kcal</p>
          <p>${goalNote}</p>
          <ul>
            ${personalizedMenu.map((item) => `<li>${item}</li>`).join('')}
          </ul>
        </body>
      </html>
    `;
    await Print.printAsync({ html });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>🌍 Ülke Seç:</Text>

      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedCountry}
          onValueChange={(itemValue) => setSelectedCountry(itemValue)}
          style={styles.picker}
        >
          {Object.keys(mealCulture).map((country) => (
            <Picker.Item key={country} label={country} value={country} />
          ))}
        </Picker>
      </View>

      <Text style={styles.sub}>{recommendationHeader} ({selectedCountry})</Text>
      {goalNote !== '' && <Text style={styles.note}>📌 {goalNote}</Text>}

      {personalizedMenu.map((item, index) => (
        <Text key={index} style={styles.item}>✅ {item}</Text>
      ))}

      <Button title="📤 PDF Olarak Kaydet" onPress={handlePDFExport} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#1e1e2f',
    flexGrow: 1
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10
  },
  pickerWrapper: {
    backgroundColor: '#fff',
    borderRadius: 6,
    marginBottom: 20
  },
  picker: {
    height: 50,
    width: '100%'
  },
  sub: {
    fontSize: 18,
    color: '#00ffcc',
    marginBottom: 6
  },
  note: {
    fontSize: 14,
    color: '#ffff99',
    marginBottom: 10
  },
  item: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8
  }
});
