import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../ui/HomeScreen';
import SettingsScreen from '../ui/SettingsScreen';

/**
 * TypeScript-typer för main tab-navigation
 * Definierar vilka skärmar som finns i huvudflödet
 */
export type MainTabParamList = {
  Home: undefined;
  Settings: undefined;
  // TODO: Lägg till fler huvudskärmar här (t.ex. Profile, Premium)
};

const Tab = createBottomTabNavigator<MainTabParamList>();

/**
 * MainTabs - Tab-navigation för inloggade användare
 * 
 * Denna navigator hanterar alla huvudskärmar som användaren ser när de är inloggade.
 * Använder bottom tabs för enkel navigation mellan olika sektioner.
 */
export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        // TODO: Lägg till ikoner för tabs här
        headerShown: true, // Visar header för tab-skärmar
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ 
          title: 'Hem',
          // TODO: Lägg till tabBarIcon här
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ 
          title: 'Inställningar',
          // TODO: Lägg till tabBarIcon här
        }}
      />
    </Tab.Navigator>
  );
} 