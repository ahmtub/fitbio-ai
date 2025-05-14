import { useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-paper';

export default function HomeScreen({ navigation, route }) {
  const { height: passedHeight, weight: passedWeight, age: passedAge, gender: passedGender, activityLevel: passedActivity } = route.params || {};

  const [height, setHeight] = useState(passedHeight || '');
  const [weight, setWeight] = useState(passedWeight || '');
  const [age, setAge] = useState(passedAge || '');
  const [gender, setGender] = useState(passedGender || '');
  const [activityLevel, setActivityLevel] = useState(passedActivity || '');

  // Refs for next input focus
  const weightRef = useRef(null);
  const ageRef = useRef(null);
  const genderRef = useRef(null);
  const activityRef = useRef(null);

  const handleGoal = (goal) => {
    if (!height || !weight || !age || !gender || !activityLevel) {
      alert("Lütfen tüm alanları doldurun");
      return;
    }

    const numericWeight = parseFloat(weight);
    const numericHeight = parseFloat(height);
    const numericAge = parseFloat(age);

    const bmr = gender === 'male'
      ? 10 * numericWeight + 6.25 * numericHeight - 5 * numericAge + 5
      : 10 * numericWeight + 6.25 * numericHeight - 5 * numericAge - 161;

    const multiplier = {
      passive: 1.2,
      active: 1.55,
      athletic: 1.9
    }[activityLevel] || 1.2;

    let tdee = bmr * multiplier;

    if (goal === 'muscle') {
      tdee += 300;
    } else if (goal === 'fatburn') {
      tdee -= 400;
    }

    navigation.navigate('Result', { bmr, tdee, goal });
  };

  const handleDietSuggestion = () => {
    if (!height || !weight || !age || !gender || !activityLevel) {
      alert("Kültürel diyet için tüm bilgileri doldurun");
      return;
    }

    navigation.navigate('DietSuggestion', {
      height: parseFloat(height),
      weight: parseFloat(weight),
      age: parseFloat(age),
      gender,
      activityLevel
    });
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
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
          <Button mode="contained" onPress={() => handleGoal('muscle')} buttonColor="#4caf50" textColor="#fff">
            💪 Kas Kütlesi Artır
          </Button>
        </View>

        <View style={[styles.button, { marginTop: 10 }]}> 
          <Button mode="contained" onPress={() => handleGoal('fatburn')} buttonColor="#f44336" textColor="#fff">
            🔥 Yağ Yak
          </Button>
        </View>

        <View style={[styles.button, { marginTop: 15 }]}> 
          <Button
            mode="contained"
            onPress={handleDietSuggestion}
            buttonColor="#00bcd4"
            textColor="#fff"
          >
            🍽️ Kültürel Diyet Önerisi
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
    marginTop: 10,
    borderRadius: 8,
    overflow: 'hidden'
  }
});
