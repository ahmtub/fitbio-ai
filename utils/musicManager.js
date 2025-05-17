
import * as FileSystem from 'expo-file-system';

export const musicDir = FileSystem.documentDirectory + 'FitBioMusic/';

export async function createMusicFolder() {
  const folderInfo = await FileSystem.getInfoAsync(musicDir);
  if (!folderInfo.exists) {
    console.log("🎵 Müzik klasörü oluşturuluyor:", musicDir);
    await FileSystem.makeDirectoryAsync(musicDir, { intermediates: true });
  } else {
    console.log("✅ Müzik klasörü zaten var:", musicDir);
  }
}

export async function listMusicFiles() {
  try {
    await createMusicFolder(); // klasör kontrolü ekleniyor
    const files = await FileSystem.readDirectoryAsync(musicDir);
    console.log("🎧 Klasördeki müzik dosyaları:", files);
    return files.map(file => ({
      name: file,
      uri: musicDir + file
    }));
  } catch (error) {
    console.error("❌ Müzik listelenemedi:", error);
    return [];
  }
}


import * as DocumentPicker from 'expo-document-picker';

export async function addMusicFile() {
  console.log("📥 Dosya seçiliyor...");

  const result = await DocumentPicker.getDocumentAsync({
    type: 'audio/mpeg'
  });

  console.log("📁 Seçim sonucu:", result);

  if (result.type === 'success') {
    const destPath = musicDir + result.name;
    await FileSystem.copyAsync({
      from: result.uri,
      to: destPath
    });
    console.log("✅ Dosya başarıyla eklendi:", destPath);
    return { name: result.name, uri: destPath };
  }

  console.log("❌ Dosya seçimi iptal edildi veya başarısız.");
  return null;
}
