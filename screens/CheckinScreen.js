import { useState } from 'react';
import {
  Alert,
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import { saveCheckin } from '../utils/checkinStorage'; // 🔗 Yeni modül

export default function CheckinScreen() {
  const [mood, setMood] = useState('');
  const [sleep, setSleep] = useState('');
  const [workedOut, setWorkedOut] = useState('');
  const [notes, setNotes] = useState('');

  const handleCheckIn = async () => {
    if (!mood || !sleep || !workedOut) {
      Alert.alert("Eksik Bilgi", "Lütfen tüm alanları doldurun.");
      return;
    }

    const checkinData = {
      mood,
      sleep: parseFloat(sleep),
      workedOut: workedOut.toLowerCase(),
      notes
    };

    await saveCheckin(checkinData); // 💾 Kaydetme

    let msg = `📋 Günlük Durum:\n\n😌 Ruh Hali: ${checkinData.mood}\n🛌 Uyku: ${checkinData.sleep} saat\n🏋️‍♂️ Spor: ${checkinData.workedOut === 'evet' ? 'Yapıldı' : 'Yapılmadı'}`;

    if (checkinData.sleep < 6) {
      msg += `\n⚠️ Az uyumuşsun, tempoyu hafif tutman önerilir.`;
    }

    if (checkinData.mood.toLowerCase().includes('yorgun') || checkinData.mood.toLowerCase().includes('kötü')) {
      msg += `\n💡 Modun düşük. Bol su ve dinlenme önerilir.`;
    }

    if (checkinData.notes) {
      msg += `\n\n📝 Not: ${checkinData.notes}`;
    }

    Alert.alert("🧠 Check-in Kaydedildi", msg);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>📝 Günlük Check-in</Text>

        <Text style={styles.label}>😌 Ruh Halin:</Text>
        <TextInput
          style={styles.input}
          placeholder="Mutlu, stresli, yorgun..."
          placeholderTextColor="#aaa"
          value={mood}
          onChangeText={setMood}
        />

        <Text style={styles.label}>🛌 Kaç saat uyudun?</Text>
        <TextInput
          style={styles.input}
          placeholder="Örn: 6.5"
          keyboardType="numeric"
          placeholderTextColor="#aaa"
          value={sleep}
          onChangeText={setSleep}
        />

        <Text style={styles.label}>🏋️‍♂️ Bugün spor yaptın mı?</Text>
        <TextInput
          style={styles.input}
          placeholder="Evet / Hayır"
          placeholderTextColor="#aaa"
          value={workedOut}
          onChangeText={setWorkedOut}
        />

        <Text style={styles.label}>📝 Notlar (opsiyonel):</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Bugün kendinle ilgili ne not almak istersin?"
          placeholderTextColor="#aaa"
          multiline
          value={notes}
          onChangeText={setNotes}
        />

        <View style={styles.button}>
          <Button title="✅ Check-in Yap" onPress={handleCheckIn} color="#4caf50" />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#1e1e2f'
  },
  container: {
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#fff'
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#ccc'
  },
  input: {
    borderWidth: 1,
    borderColor: '#444',
    padding: 14,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#2e2e3e',
    fontSize: 16,
    color: '#fff'
  },
  button: {
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden'
  }
});
