import { useState } from 'react';
import { Button, ScrollView, Text, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const BodyAnalysisForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    height: '',
    weight: '',
    age: '',
    gender: '',
    muscleMass: '',
    fatPercentage: '',
    waterPercentage: '',
    bodyType: '',
    goal: '',
    activityLevel: ''
  });

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    const formattedForm = {
      ...form,
      height: parseFloat(form.height),
      weight: parseFloat(form.weight),
      age: parseInt(form.age),
      muscleMass: parseFloat(form.muscleMass),
      fatPercentage: parseFloat(form.fatPercentage),
      waterPercentage: parseFloat(form.waterPercentage),
    };
    onSubmit(formattedForm); // calculateBodyMetrics'e gönderilecek
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text>Boy (cm)</Text>
      <TextInput keyboardType="numeric" value={form.height} onChangeText={v => handleChange('height', v)} style={styles.input} />

      <Text>Kilo (kg)</Text>
      <TextInput keyboardType="numeric" value={form.weight} onChangeText={v => handleChange('weight', v)} style={styles.input} />

      <Text>Yaş</Text>
      <TextInput keyboardType="numeric" value={form.age} onChangeText={v => handleChange('age', v)} style={styles.input} />

      <Text>Cinsiyet</Text>
      <RNPickerSelect
        onValueChange={v => handleChange('gender', v)}
        items={[
          { label: 'Erkek', value: 'male' },
          { label: 'Kadın', value: 'female' },
        ]}
        style={pickerStyle}
      />

      <Text>Kas Kütlesi (kg)</Text>
      <TextInput keyboardType="numeric" value={form.muscleMass} onChangeText={v => handleChange('muscleMass', v)} style={styles.input} />

      <Text>Yağ Oranı (%)</Text>
      <TextInput keyboardType="numeric" value={form.fatPercentage} onChangeText={v => handleChange('fatPercentage', v)} style={styles.input} />

      <Text>Sıvı Oranı (%)</Text>
      <TextInput keyboardType="numeric" value={form.waterPercentage} onChangeText={v => handleChange('waterPercentage', v)} style={styles.input} />

      <Text>Vücut Tipi</Text>
      <RNPickerSelect
        onValueChange={v => handleChange('bodyType', v)}
        items={[
          { label: 'Ektomorf', value: 'ektomorf' },
          { label: 'Mezomorf', value: 'mezomorf' },
          { label: 'Endomorf', value: 'endomorf' },
        ]}
        style={pickerStyle}
      />

      <Text>Hedef</Text>
      <RNPickerSelect
        onValueChange={v => handleChange('goal', v)}
        items={[
          { label: 'Kas kazanmak', value: 'muscle' },
          { label: 'Yağ yakmak', value: 'fat' },
          { label: 'Formda kalmak', value: 'fit' },
        ]}
        style={pickerStyle}
      />

      <Text>Günlük Hareketlilik</Text>
      <RNPickerSelect
        onValueChange={v => handleChange('activityLevel', v)}
        items={[
          { label: 'Sedanter', value: 'sedanter' },
          { label: 'Hafif aktif', value: 'light' },
          { label: 'Aktif', value: 'active' },
          { label: 'Çok aktif', value: 'very_active' },
        ]}
        style={pickerStyle}
      />

      <Button title="Analizi Başlat" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = {
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  }
};

const pickerStyle = {
  inputIOS: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
  },
  inputAndroid: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
  }
};

export default BodyAnalysisForm;
