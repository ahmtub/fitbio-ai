// components/InputForm.js

import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function InputForm({ onSubmit }) {
  const [form, setForm] = useState({
    height: '',
    weight: '',
    age: '',
    gender: '',
    activity: ''
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Boy (cm):</Text>
      <TextInput style={styles.input} keyboardType="numeric"
        onChangeText={val => setForm({ ...form, height: val })} />

      <Text style={styles.label}>Kilo (kg):</Text>
      <TextInput style={styles.input} keyboardType="numeric"
        onChangeText={val => setForm({ ...form, weight: val })} />

      <Text style={styles.label}>Yaş:</Text>
      <TextInput style={styles.input} keyboardType="numeric"
        onChangeText={val => setForm({ ...form, age: val })} />

      <Text style={styles.label}>Cinsiyet (male/female):</Text>
      <TextInput style={styles.input}
        onChangeText={val => setForm({ ...form, gender: val.toLowerCase() })} />

      <Text style={styles.label}>Aktivite (passive/active/athletic):</Text>
      <TextInput style={styles.input}
        onChangeText={val => setForm({ ...form, activity: val.toLowerCase() })} />

      <Button title="Hesapla" onPress={() => onSubmit(form)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 20 },
  label: { fontSize: 16, marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 12,
    borderRadius: 6
  }
});
