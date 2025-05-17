import { Audio } from 'expo-av';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const MusicPlayer = ({ file }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = async () => {
    if (sound && isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
      return;
    }

    if (sound) {
      await sound.playAsync();
      setIsPlaying(true);
      return;
    }

    const { sound: newSound } = await Audio.Sound.createAsync({ uri: file.uri });
    setSound(newSound);
    setIsPlaying(true);
    await newSound.playAsync();
  };

  return (
    <View style={styles.player}>
      <Text style={styles.text}>{file.name}</Text>
      <Button title={isPlaying ? '⏸️ Duraklat' : '▶️ Oynat'} onPress={handlePlayPause} />
    </View>
  );
};

const styles = StyleSheet.create({
  player: {
    padding: 10,
    backgroundColor: '#2e2e3e',
    marginBottom: 10,
    borderRadius: 10
  },
  text: {
    color: '#fff',
    marginBottom: 5
  }
});

export default MusicPlayer;
