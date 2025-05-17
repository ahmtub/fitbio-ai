import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import MusicPlayer from '../components/MusicPlayer';
import { listMusicFiles } from '../utils/musicManager';

export default function MusicLibraryScreen() {
  const [musicFiles, setMusicFiles] = useState([]);

  useEffect(() => {
    loadMusic();
  }, []);

  const loadMusic = async () => {
    const files = await listMusicFiles();
    setMusicFiles(files);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🎧 Müzik Kütüphanesi</Text>
      {musicFiles.length === 0 && <Text style={styles.empty}>Klasörde müzik bulunamadı.</Text>}
      {musicFiles.map((file, index) => (
        <MusicPlayer key={index} file={file} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e2f',
    padding: 20
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20
  },
  empty: {
    color: '#aaa',
    fontSize: 16
  }
});
