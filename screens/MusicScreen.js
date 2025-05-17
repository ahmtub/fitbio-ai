
import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { addMusicFile, listMusicFiles } from '../utils/musicManager';
import { playMusic, stopMusic, playNext, playPrevious, setPlaylist, setVolume } from '../utils/musicPlayer';
import Slider from '@react-native-community/slider';
import * as Linking from 'expo-linking';

export default function MusicScreen() {
  const [musicList, setMusicList] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    (async () => {
      const list = await listMusicFiles();
      setMusicList(list);
      setPlaylist(list, (newIndex) => setCurrentTrack(list[newIndex]));
    })();
  }, []);

  const handleAddMusic = async () => {
    console.log('🎵 Müzik Ekle butonuna tıklandı');
    const file = await addMusicFile();
    if (file) {
      const updatedList = await listMusicFiles();
      setMusicList(updatedList);
      setPlaylist(updatedList, (newIndex) => setCurrentTrack(updatedList[newIndex]));
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>🎧 Müzik Kütüphanesi</Text>

      <View style={{ marginVertical: 20 }}>
        <Button title="🎵 Müzik Ekle" onPress={handleAddMusic} color="#4ade80" />
      </View>

      {musicList.length === 0 ? (
        <Text>Klasörde müzik bulunamadı.</Text>
      ) : (
        musicList.map((music, index) => (
          <View key={index} style={{ marginBottom: 15 }}>
            <Text>{music.name}</Text>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <Button title="▶️ Oynat" onPress={() => {
                setCurrentTrack(music);
                playMusic(music.uri, index);
              }} color="#38bdf8" />
              <View style={{ width: 10 }} />
              <Button title="⏹️ Durdur" onPress={stopMusic} color="#ef4444" />
            </View>
          </View>
        ))
      )}

      {currentTrack && (
        <View style={{ marginTop: 30 }}>
          <Text style={{ fontWeight: 'bold' }}>🎶 Şu an çalan: {currentTrack.name}</Text>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Button title="⏮️ Önceki" onPress={playPrevious} color="#facc15" />
            <View style={{ width: 10 }} />
            <Button title="⏭️ Sonraki" onPress={playNext} color="#4f46e5" />
          </View>
        </View>
      )}

      <View style={{ marginTop: 20 }}>
        <Text>🔊 Ses Seviyesi</Text>
        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={0}
          maximumValue={1}
          step={0.05}
          minimumTrackTintColor="#4ade80"
          maximumTrackTintColor="#ccc"
          onValueChange={value => setVolume(value)}
        />
      </View>

      <View style={{ marginTop: 30 }}>
        <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>🌐 Online Müzik Platformları</Text>
        <Button title="🎵 Spotify ile Aç" onPress={() => Linking.openURL('https://open.spotify.com/')} color="#1DB954" />
        <View style={{ height: 10 }} />
        <Button title="📺 YouTube Music ile Aç" onPress={() => Linking.openURL('https://music.youtube.com/')} color="#FF0000" />
      </View>
    </ScrollView>
  );
}
