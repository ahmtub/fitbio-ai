import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { Button } from 'react-native-paper';

export default function BodyAnalysisForm({ navigation }) {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [fatPercentage, setFatPercentage] = useState('');
  const [muscleMass, setMuscleMass] = useState('');
  const [waterPercentage, setWaterPercentage] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [goal, setGoal] = useState('');

  const weightRef = useRef(null);
  const ageRef = useRef(null);
  const genderRef = useRef(null);
  const activityRef = useRef(null);

  // 🚀 İlk açılışta verileri yükle
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const saved = await AsyncStorage.getItem('fitbio_analysis_data');
        if (saved) {
          const parsed = JSON.parse(saved);
          setHeight(parsed.height || '');
          setWeight(parsed.weight || '');
          setAge(parsed.age || '');
          setGender(parsed.gender || '');
          setActivityLevel(parsed.activityLevel || '');
          setFatPercentage(parsed.fatPercentage || '');
          setMuscleMass(parsed.muscleMass || '');
          setWaterPercentage(parsed.waterPercentage || '');
          setBodyType(parsed.bodyType || '');
          setGoal(parsed.goal || '');
        }
      } catch (e) {
        console.log('Veri yüklenemedi:', e);
      }
    };
    loadSavedData();
  }, []);

  const handleGoalSubmit = async () => {
    if (!height || !weight || !age || !gender || !activityLevel || !goal) {
      alert('Lütfen tüm zorunlu alanları doldurun');
      return;
    }

    const userData = {
      height: parseFloat(height),
      weight: parseFloat(weight),
      age: parseFloat(age),
      gender,
      activityLevel,
      goal,
      fatPercentage: parseFloat(fatPercentage),
      muscleMass: parseFloat(muscleMass),
      waterPercentage: parseFloat(waterPercentage),
      bodyType
    };

    try {
      await AsyncStorage.setItem('fitbio_analysis_data', JSON.stringify(userData));
    } catch (e) {
      console.log('Veri kaydetme hatası:', e);
    }

    navigation.navigate('Result', { userData });
  };

  const handleClear = async () => {
    await AsyncStorage.removeItem('fitbio_analysis_data');
    setHeight('');
    setWeight('');
    setAge('');
    setGender('');
    setActivityLevel('');
    setFatPercentage('');
    setMuscleMass('');
    setWaterPercentage('');
    setBodyType('');
    setGoal('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.wrapper}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>🧬 FitBio AI | Gelişmiş Vücut Analizi</Text>

        <TextInput
          style={styles.input}
          placeholder="Boy (cm)"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          returnKeyType="next"
          onSubmitEditing={() => weightRef.current.focus()}
          blurOnSubmit={false}
          value={height}
          onChangeText={setHeight}
        />

        <TextInput
          style={styles.input}
          placeholder="Kilo (kg)"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          ref={weightRef}
          returnKeyType="next"
          onSubmitEditing={() => ageRef.current.focus()}
          blurOnSubmit={false}
          value={weight}
          onChangeText={setWeight}
        />

        <TextInput
          style={styles.input}
          placeholder="Yaş"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          ref={ageRef}
          returnKeyType="next"
          onSubmitEditing={() => genderRef.current.focus()}
          blurOnSubmit={false}
          value={age}
          onChangeText={setAge}
        />

        <TextInput
          style={styles.input}
          placeholder="Cinsiyet (male / female)"
          placeholderTextColor="#aaa"
          ref={genderRef}
          returnKeyType="next"
          onSubmitEditing={() => activityRef.current.focus()}
          blurOnSubmit={false}
          value={gender}
          onChangeText={setGender}
        />

        <TextInput
          style={styles.input}
          placeholder="Aktivite düzeyi (passive / active / athletic)"
          placeholderTextColor="#aaa"
          ref={activityRef}
          value={activityLevel}
          onChangeText={setActivityLevel}
        />

        <TextInput
          style={styles.input}
          placeholder="Yağ Oranı (%)"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={fatPercentage}
          onChangeText={setFatPercentage}
        />

        <TextInput
          style={styles.input}
          placeholder="Kas Kütlesi (kg) – Opsiyonel"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={muscleMass}
          onChangeText={setMuscleMass}
        />

        <TextInput
          style={styles.input}
          placeholder="Sıvı Oranı (%) – Opsiyonel"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={waterPercentage}
          onChangeText={setWaterPercentage}
        />

        <TextInput
          style={styles.input}
          placeholder="Vücut Tipi (ektomorf / mezomorf / endomorf)"
          placeholderTextColor="#aaa"
          value={bodyType}
          onChangeText={setBodyType}
        />

        <TextInput
          style={styles.input}
          placeholder="Hedef (muscle / fatburn / maintain)"
          placeholderTextColor="#aaa"
          value={goal}
          onChangeText={setGoal}
        />

        <View style={styles.button}>
          <Button
            mode="contained"
            onPress={handleGoalSubmit}
            buttonColor="#4ade80"
            textColor="#fff"
          >
            ✅ Analizi Başlat ve Sonuca Git
          </Button>
        </View>

        <View style={{ marginTop: 15 }}>
          <Button
            mode="outlined"
            textColor="#f44336"
            onPress={handleClear}
          >
            🧹 Verileri Temizle
          </Button>
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
    borderRadius: 8,
    overflow: 'hidden'
  }
});
