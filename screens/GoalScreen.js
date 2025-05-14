import { Button, StyleSheet, Text, View } from 'react-native';

export default function GoalScreen({ navigation, route }) {
  const { bmr, tdee } = route.params;

  const handleGoalSelect = (goal) => {
    navigation.navigate('Result', { bmr, tdee, goal });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎯 Hedefini Seç</Text>
      <Text style={styles.subtitle}>Ne yapmak istiyorsun?</Text>

      <View style={styles.button}>
        <Button title="💪 Kas Kütlesi Artır" color="#4caf50" onPress={() => handleGoalSelect('muscle')} />
      </View>

      <View style={styles.button}>
        <Button title="🔥 Yağ Yak" color="#f44336" onPress={() => handleGoalSelect('fatburn')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e1e2f',
    flex: 1,
    padding: 20,
    justifyContent: 'center'
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff'
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: 'center',
    color: '#ccc'
  },
  button: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden'
  }
});
