import { useRef, useState } from 'react';
import { Button, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [activityLevel, setActivityLevel] = useState('');

  // Refs for next input focus
  const weightRef = useRef(null);
  const ageRef = useRef(null);
  const genderRef = useRef(null);
  const activityRef = useRef(null);

  const handleSubmit = () => {
    if (!height || !weight || !age || !gender || !activityLevel) {
      alert("Lütfen tüm alanları doldurun");
      return;
    }

    const bmr = gender === 'male'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

    const multiplier = {
      passive: 1.2,
      active: 1.55,
      athletic: 1.9
    }[activityLevel] || 1.2;

    const tdee = bmr * multiplier;

    navigation.navigate('Goal', { bmr, tdee });
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>👤 FitBio AI | Bilgilerini Gir</Text>

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
          returnKeyType="next"
          ref={weightRef}
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
          returnKeyType="next"
          ref={ageRef}
          onSubmitEditing={() => genderRef.current.focus()}
          blurOnSubmit={false}
          value={age}
          onChangeText={setAge}
        />

        <TextInput
          style={styles.input}
          placeholder="Cinsiyet (male / female)"
          placeholderTextColor="#aaa"
          returnKeyType="next"
          ref={genderRef}
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
          returnKeyType="done"
          value={activityLevel}
          onChangeText={setActivityLevel}
        />

        <View style={styles.button}>
          <Button title="Devam Et ➡️" onPress={handleSubmit} color="#4caf50" />
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
    marginTop: 10,
    borderRadius: 8,
    overflow: 'hidden'
  }
});
