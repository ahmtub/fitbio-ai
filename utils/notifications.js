import * as Notifications from 'expo-notifications';

// 🔔 Bildirim gösterim ayarları
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false
  }),
});

// 🔐 Bildirim izni al (ilk çalıştırmada çağrılmalı)
export async function registerForPushNotificationsAsync() {
  const { status } = await Notifications.getPermissionsAsync();
  let finalStatus = status;

  if (status !== 'granted') {
    const { status: askStatus } = await Notifications.requestPermissionsAsync();
    finalStatus = askStatus;
  }

  return finalStatus === 'granted';
}

// 📅 Günlük bildirim zamanlayıcısı (belirli saat ve dakikada tekrar)
export async function scheduleDailyNotification(hour, minute, title, body) {
  await Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger: {
      hour,
      minute,
      repeats: true
    }
  });
}

// 🔁 Tüm planlı bildirimleri iptal et
export async function cancelAllReminders() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

// 📌 Hedefe ve rutine göre otomatik hatırlatıcı planlayıcı
export async function setupDailyReminders(goal = 'muscle') {
  const granted = await registerForPushNotificationsAsync();
  if (!granted) return;

  // 🥤 Su iç hatırlatmaları
  await scheduleDailyNotification(10, 0, '💧 Su İç!', 'Günlük hidrasyon için su içmeyi unutma!');
  await scheduleDailyNotification(14, 0, '💧 Su İç!', 'Yorgunluğu azaltmak için bir bardak daha!');

  // 🍌 Spor öncesi (varsayılan 17:00)
  await scheduleDailyNotification(16, 30, '🍌 Spor Öncesi Beslenme', '1 muz + whey protein almayı unutma!');

  // 🥚 Spor sonrası
  await scheduleDailyNotification(19, 30, '🥚 Spor Sonrası Beslenme', '3 yumurta + tam buğday ekmeği önerilir.');

  // 😴 Uyku
  await scheduleDailyNotification(23, 0, '😴 Uyku Zamanı', 'Kas onarımı için 7-8 saat uyku önemli!');
}
