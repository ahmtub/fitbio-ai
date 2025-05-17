import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';
import { Button, Platform, StyleSheet, Switch, Text, View } from 'react-native';

import { useUserSettings } from '../context/UserSettingsContext';
import { cancelAllReminders, scheduleDailyNotification, setupDailyReminders } from '../utils/notifications';

export default function SettingsScreen() {
  const {
    notificationsEnabled,
    setNotificationsEnabled,
    trainingTime,
    setTrainingTime,
    goal
  } = useUserSettings();

  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    if (notificationsEnabled) {
      setupDailyRemindersWithTime(trainingTime);
    } else {
      cancelAllReminders();
    }
  }, [notificationsEnabled, trainingTime]);

  const setupDailyRemindersWithTime = async (time) => {
    const hour = time.getHours();
    const minute = time.getMinutes();

    await cancelAllReminders();

    // Hedefe göre yeniden hatırlatmalar kur
    await setupDailyReminders(goal || 'muscle');

    // Dinamik zamanlı spor öncesi ve sonrası
    await scheduleDailyNotification(
      hour - 1 < 0 ? 23 : hour - 1,
      minute,
      '🍌 Spor Öncesi',
      '1 muz + whey protein al!'
    );
    await scheduleDailyNotification(
      hour + 2 > 23 ? 0 : hour + 2,
      minute,
      '🥚 Spor Sonrası',
      '3 yumurta + tam buğday ekmeği!'
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚙️ Ayarlar</Text>

      <View style={styles.row}>
        <Text style={styles.label}>🔔 Bildirimleri Aç/Kapat</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#4ade80' }}
          thumbColor={notificationsEnabled ? '#22c55e' : '#f4f3f4'}
          onValueChange={setNotificationsEnabled}
          value={notificationsEnabled}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>🕔 Antrenman Saati:</Text>
        <Button
          title={trainingTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          onPress={() => setShowPicker(true)}
        />
      </View>

      {showPicker && (
        <DateTimePicker
          value={trainingTime}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            setShowPicker(Platform.OS === 'ios');
            if (selectedDate) setTrainingTime(selectedDate);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e1e2f',
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25
  },
  label: {
    color: '#fff',
    fontSize: 16
  }
});
