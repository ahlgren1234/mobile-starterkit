import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, ActivityIndicator } from 'react-native';
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';
import { useSession } from '../lib/useSession';

/**
 * TypeScript-typer för root-navigation
 * Definierar de två huvudlägena: Auth (ej inloggad) och Main (inloggad)
 */
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * LoadingScreen - Visas medan appen laddar användardata
 */
function LoadingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <ActivityIndicator size="large" color="#3b82f6" />
      <Text style={{ marginTop: 16, color: '#6b7280' }}>Loading...</Text>
    </View>
  );
}

/**
 * RootNavigator - Huvudnavigation för hela appen
 * 
 * Denna navigator bestämmer vilken del av appen som ska visas:
 * - LoadingScreen: Medan användardata laddas
 * - AuthStack: När användaren inte är inloggad (LoginScreen)
 * - MainTabs: När användaren är inloggad (HomeScreen, SettingsScreen)
 * 
 * Använder useSession hook för att:
 * 1. Lyssna på session-ändringar via useEffect
 * 2. Zustand store som central källa för auth-state
 * 3. Automatisk session-hantering
 */
export default function RootNavigator() {
  const { isLoggedIn, isLoading } = useSession();

  // Visa loading screen medan användardata laddas
  if (isLoading) {
    console.log('RootNavigator: Showing loading screen');
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ 
          headerShown: false // Döljer header på root-nivå
        }}
      >
        {isLoggedIn ? (
          // Användaren är inloggad - visa huvudapp
          <Stack.Screen 
            name="Main" 
            component={MainTabs}
            options={{ title: 'Main App' }}
          />
        ) : (
          // Användaren är inte inloggad - visa auth-flöde
          <Stack.Screen 
            name="Auth" 
            component={AuthStack}
            options={{ title: 'Authentication' }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
} 