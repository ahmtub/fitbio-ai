
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CustomDietScreen({ navigation }) {
  const [breakfast, setBreakfast] = useState('');
  const [lunch, setLunch] = useState('');
  const [dinner, setDinner] = useState('');
  const [snacks, setSnacks] = useState('');
  const [supplements, setSupplements] = useState('');

  useEffect(() => {
    const loadSaved = async () => {
      const saved = await AsyncStorage.getItem('fitbio_custom_diet');
      if (saved) {
        const parsed = JSON.parse(saved);
        setBreakfast(parsed.breakfast || '');
        setLunch(parsed.lunch || '');
        setDinner(parsed.dinner || '');
        setSnacks(parsed.snacks || '');
        setSupplements(parsed.supplements || '');
      }
    };
    loadSaved();
  }, []);

  const handleSave = async () => {
    const diet = {
      breakfast, lunch, dinner, snacks, supplements
    };

    try {
      await AsyncStorage.setItem('fitbio_custom_diet', JSON.stringify(diet));
      Alert.alert('✅ Kayıt Başarılı', 'Kendi diyet planın kaydedildi.');
      navigation.goBack();
    } catch (e) {
      Alert.alert('❌ Hata', 'Diyet kaydedilemedi.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🍽️ Kendi Diyet Programın</Text>

      <TextInput
        style={styles.input}
        placeholder="🥣 Kahvaltı"
        placeholderTextColor="#aaa"
        value={breakfast}
        onChangeText={setBreakfast}
      />
      <TextInput
        style={styles.input}
        placeholder="🍛 Öğle Yemeği"
        placeholderTextColor="#aaa"
        value={lunch}
        onChangeText={setLunch}
      />
      <TextInput
        style={styles.input}
        placeholder="🍲 Akşam Yemeği"
        placeholderTextColor="#aaa"
        value={dinner}
        onChangeText={setDinner}
      />
      <TextInput
        style={styles.input}
        placeholder="🍏 Ara Öğün"
        placeholderTextColor="#aaa"
        value={snacks}
        onChangeText={setSnacks}
      />
      <TextInput
        style={styles.input}
        placeholder="💊 Takviyeler (isteğe bağlı)"
        placeholderTextColor="#aaa"
        value={supplements}
        onChangeText={setSupplements}
      />

      <Button
        mode="contained"
        onPress={handleSave}
        buttonColor="#4ade80"
        textColor="#fff"
        style={{ marginTop: 20 }}
      >
        💾 Kaydet ve Geri Dön
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#1e1e2f',
    flexGrow: 1
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
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
  }
});
