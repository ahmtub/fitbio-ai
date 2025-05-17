import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.bg}
      resizeMode="contain"
    >
      <View style={styles.overlay}>
        <View style={styles.buttonArea}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('BodyAnalysisForm')}
          >
            <Text style={styles.buttonText}>🧠 Vücut Analizi ve Plan</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('MusicLibrary')}
          >
            <Text style={styles.buttonText}>🎧 Müzik Kütüphanesi</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={styles.buttonText}>⚙️ Ayarlar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  overlay: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // opsiyonel: logo net gözüksün diye yarı opak katman
  },
  buttonArea: {
    width: '90%',
    alignItems: 'center',
    gap: 10,
  },
  button: {
    width: '100%',
    backgroundColor: '#1e293b',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
});
