import { useState } from 'react';
import { Alert, Button, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function CheckinScreen() {
  const [mood, setMood] = useState('');
  const [sleep, setSleep] = useState('');
  const [workedOut, setWorkedOut] = useState('');

  const handleCheckIn = () => {
    if (!mood || !sleep || !workedOut) {
      Alert.alert("Eksik Bilgi", "Lütfen tüm alanları doldurun.");
      return;
    }

    let msg = `📋 Günlük Durum:\n\n😌 Ruh Hali: ${mood}\n🛌 Uyku: ${sleep} saat\n🏋️‍♂️ Spor: ${workedOut}`;

    if (parseFloat(sleep) < 6) {
      msg += `\n\n⚠️ Bugün az uyumuşsun. Hafif tempo önerilir.`;
    }

    if (mood.toLowerCase().includes('yorgun') || mood.toLowerCase().includes('kötü')) {
      msg += `\n💡 Modun düşük. Bol su ve dinlenme önerilir.`;
    }

    Alert.alert("🧠 Check-in Raporu", msg);
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
