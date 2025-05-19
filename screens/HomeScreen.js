
import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.buttonArea}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BodyAnalysisForm')}>
            <Text style={styles.buttonText}>🧠 Analiz</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CustomDiet')}>
            <Text style={styles.buttonText}>📝 Diyet Ekle</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MusicLibrary')}>
            <Text style={styles.buttonText}>🎧 Müzikler</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Settings')}>
            <Text style={styles.buttonText}>⚙️ Ayarlar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100, // sayfayı biraz yukarı kaydır
  },
  buttonArea: {
    width: '85%',
    alignItems: 'center',
    gap: 12,
  },
  button: {
    width: '100%',
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffffff33',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
  },
});
