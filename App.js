import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';

import BodyAnalysisForm from './screens/BodyAnalysisForm';
import CheckinScreen from './screens/CheckinScreen';
import DietSuggestionScreen from './screens/DietSuggestionScreen';
import HomeScreen from './screens/HomeScreen';
import MusicLibraryScreen from './screens/MusicLibraryScreen';
import ResultScreen from './screens/ResultScreen';
import SettingsScreen from './screens/SettingsScreen';
import UserProfileScreen from './screens/UserProfileScreen';

import { UserSettingsProvider } from './context/UserSettingsContext';
import { registerForPushNotificationsAsync, setupDailyReminders } from './utils/notifications';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    // 📲 Bildirim izni al ve varsayılan hatırlatıcıları kur
    const initializeNotifications = async () => {
      const granted = await registerForPushNotificationsAsync();
      if (granted) {
        await setupDailyReminders();
      }
    };

    initializeNotifications();
  }, []);

  return (
    <UserSettingsProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">

          {/* 🔓 Ana Menü */}
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'FitBio AI' }} />

          {/* 🧬 Kullanıcı Analiz Formu */}
          <Stack.Screen
            name="BodyAnalysisForm"
            component={BodyAnalysisForm}
            options={{ title: 'Vücut Analizi' }}
          />

          {/* 📊 Sonuçlar ve Plan */}
          <Stack.Screen name="Result" component={ResultScreen} options={{ title: 'Sonuçlar' }} />

          {/* 🍽️ Kültürel Diyet Önerisi */}
          <Stack.Screen
            name="DietSuggestion"
            component={DietSuggestionScreen}
            options={{ title: 'Kültürel Diyet' }}
          />

          {/* 🗓️ Günlük Check-in */}
          <Stack.Screen
            name="Checkin"
            component={CheckinScreen}
            options={{ title: 'Check-in' }}
          />

          {/* ⚙️ Ayarlar */}
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ title: 'Ayarlar' }}
          />

          {/* 🎵 Müzik Kütüphanesi */}
          <Stack.Screen
            name="MusicLibrary"
            component={MusicLibraryScreen}
            options={{ title: 'Spor Müzikleri' }}
          />

          {/* 🧾 PDF Geçmişi ve Pro Linki */}
          <Stack.Screen
            name="UserProfile"
            component={UserProfileScreen}
            options={{ title: 'Profilim & PDF Geçmişi' }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </UserSettingsProvider>
  );
}
