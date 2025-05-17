import AsyncStorage from '@react-native-async-storage/async-storage';

// Ana key
const STORAGE_KEY = 'fitbio_checkins';

// 📥 Check-in kaydet (tarih bazlı)
export async function saveCheckin(newData) {
  try {
    const dateKey = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const existing = await AsyncStorage.getItem(STORAGE_KEY);
    const parsed = existing ? JSON.parse(existing) : {};

    parsed[dateKey] = {
      ...newData,
      timestamp: new Date().toISOString()
    };

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
  } catch (error) {
    console.error('Check-in kaydetme hatası:', error);
  }
}

// 📤 Tüm check-in kayıtlarını getir
export async function getAllCheckins() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (error) {
    console.error('Check-in verileri alınamadı:', error);
    return {};
  }
}

// 🧹 Tüm kayıtları sil (opsiyonel kullanım için)
export async function clearCheckins() {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Check-in temizleme hatası:', error);
  }
}
