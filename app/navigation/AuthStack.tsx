import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../auth/LoginScreen';

/**
 * TypeScript-typer för auth-navigation
 * Definierar vilka skärmar som finns i auth-flödet
 */
export type AuthStackParamList = {
  Login: undefined;
  // TODO: Lägg till fler auth-skärmar här (t.ex. Register, ForgotPassword)
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

/**
 * AuthStack - Stack-navigation för inloggningsflödet
 * 
 * Denna navigator hanterar alla skärmar som visas när användaren inte är inloggad.
 * För nu innehåller den bara LoginScreen, men kan utökas med registrering, etc.
 */
export default function AuthStack() {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false // Döljer header för en renare look
      }}
    >
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{ title: 'Logga in' }}
      />
    </Stack.Navigator>
  );
} 