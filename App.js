// App.js

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';

import CheckinScreen from './screens/CheckinScreen';
import GoalScreen from './screens/GoalScreen';
import HomeScreen from './screens/HomeScreen';
import ResultScreen from './screens/ResultScreen';

import { registerForPushNotificationsAsync, scheduleDailyNotification } from './notifications/NotificationService';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    // Bildirim izni iste ve token al
    registerForPushNotificationsAsync();

    // Günlük hatırlatma bildirimleri
    scheduleDailyNotification(9, 0, "💧 Su İç!", "Sabah suyunu içmeyi unutma.");
    scheduleDailyNotification(14, 30, "🏋️ Antrenman Zamanı", "Öğleden sonra enerjini at!");
    scheduleDailyNotification(21, 0, "💊 Takviye Hatırlat!", "Akşam takviyeni almayı unutma.");
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'FitBio AI' }} />
        <Stack.Screen name="Goal" component={GoalScreen} options={{ title: 'Hedefini Belirle' }} />
        <Stack.Screen name="Result" component={ResultScreen} options={{ title: 'Sonuçlar' }} />
        <Stack.Screen name="Checkin" component={CheckinScreen} options={{ title: 'Günlük Check-in' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
