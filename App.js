import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import BodyAnalysisForm from './screens/BodyAnalysisForm';
import CheckinScreen from './screens/CheckinScreen';
import DietSuggestionScreen from './screens/DietSuggestionScreen';
import HomeScreen from './screens/HomeScreen';
import MusicLibraryScreen from './screens/MusicLibraryScreen';
import ResultScreen from './screens/ResultScreen';
import SettingsScreen from './screens/SettingsScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import DailyPlanScreen from './screens/DailyPlanScreen';

import { UserSettingsProvider } from './context/UserSettingsContext';
import { registerForPushNotificationsAsync, setupDailyReminders } from './utils/notifications';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
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
      <SafeAreaView style={{ flex: 1, backgroundColor: '#1e1e2f' }}>
        <StatusBar barStyle="light-content" backgroundColor="#1e1e2f" />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'FitBio AI' }} />
            <Stack.Screen name="BodyAnalysisForm" component={BodyAnalysisForm} options={{ title: 'Vücut Analizi' }} />
            <Stack.Screen name="Result" component={ResultScreen} options={{ title: 'Sonuçlar' }} />
            <Stack.Screen name="DietSuggestion" component={DietSuggestionScreen} options={{ title: 'Kültürel Diyet' }} />
            <Stack.Screen name="Checkin" component={CheckinScreen} options={{ title: 'Check-in' }} />
            <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Ayarlar' }} />
            <Stack.Screen name="MusicLibrary" component={MusicLibraryScreen} options={{ title: 'Spor Müzikleri' }} />
            <Stack.Screen name="UserProfile" component={UserProfileScreen} options={{ title: 'Profilim & PDF Geçmişi' }} />
            <Stack.Screen name="DailyPlanScreen" component={DailyPlanScreen} options={{ title: 'AI Günlük Plan' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </UserSettingsProvider>
  );
}
