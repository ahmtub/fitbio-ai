
// utils/notificationScheduler.js

import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

/**
 * Hatırlatıcı planlayıcı
 * @param {Date} workoutTime - Kullanıcının antrenman saati
 */
export async function scheduleWorkoutReminders(workoutTime) {
  if (!Device.isDevice) return;

  await Notifications.requestPermissionsAsync();

  const reminders = [
    {
      title: "🥗 Antrenman Öncesi Beslenme",
      body: "Antrenmandan 30 dk önce önerilen besinleri tüketmeyi unutma!",
      time: new Date(workoutTime.getTime() - 30 * 60000)
    },
    {
      title: "💧 Su Tüketimi",
      body: "Antrenman sırasında bol su içmeyi unutma!",
      time: new Date(workoutTime.getTime() + 10 * 60000)
    },
    {
      title: "💊 Supplement Zamanı",
      body: "Supplement ve destek ürünlerini almayı unutma!",
      time: new Date(workoutTime.getTime() + 5 * 60000)
    },
    {
      title: "🛏️ Uyku Hatırlatıcısı",
      body: "Antrenmandan 2 saat sonra dinlenmeye geçmeyi unutma.",
      time: new Date(workoutTime.getTime() + 2 * 3600000)
    }
  ];

  for (const reminder of reminders) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: reminder.title,
        body: reminder.body,
        sound: true,
      },
      trigger: reminder.time,
    });
  }
}
