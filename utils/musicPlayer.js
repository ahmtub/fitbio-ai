
import { Audio } from 'expo-av';

let sound;
let currentIndex = 0;
let musicList = [];
let onTrackEndCallback = null;

export function setPlaylist(list, onTrackEnd) {
  musicList = list;
  currentIndex = 0;
  onTrackEndCallback = onTrackEnd;
}

export async function playMusic(uri, index = null) {
  try {
    if (sound) {
      await sound.unloadAsync();
      sound = null;
    }

    if (index !== null) currentIndex = index;

    sound = new Audio.Sound();
    await sound.loadAsync({ uri: musicList[currentIndex]?.uri || uri });

    sound.setOnPlaybackStatusUpdate(async (status) => {
      if (status.didJustFinish && !status.isLooping) {
        await playNext();
        if (onTrackEndCallback) onTrackEndCallback(currentIndex);
      }
    });

    await sound.playAsync();
  } catch (error) {
    console.error('Müzik oynatma hatası:', error);
  }
}

export async function stopMusic() {
  try {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      sound = null;
    }
  } catch (error) {
    console.error('Müziği durdurma hatası:', error);
  }
}

export async function playNext() {
  if (musicList.length === 0) return;
  currentIndex = (currentIndex + 1) % musicList.length;
  await playMusic(musicList[currentIndex].uri);
}

export async function playPrevious() {
  if (musicList.length === 0) return;
  currentIndex = (currentIndex - 1 + musicList.length) % musicList.length;
  await playMusic(musicList[currentIndex].uri);
}


export async function setVolume(level) {
  try {
    if (sound) {
      await sound.setVolumeAsync(level); // 0.0 - 1.0 arasında değer
    }
  } catch (error) {
    console.error('Ses seviyesi ayarlanamadı:', error);
  }
}
