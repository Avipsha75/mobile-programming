import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '../context/AuthContext';

export default function Layout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar style="auto" />
        <Stack>
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="search" options={{ title: 'Search' }} />
          <Stack.Screen name="pharmacy" options={{ title: 'Pharmacy' }} />
          <Stack.Screen name="favorites" options={{ title: 'Favorites' }} />
          <Stack.Screen name="profile" options={{ title: 'Profile' }} />
          <Stack.Screen name="medicine/[id]" options={{ title: 'Medicine Details' }} />
        </Stack>
      </AuthProvider>
    </SafeAreaProvider>
  );
}