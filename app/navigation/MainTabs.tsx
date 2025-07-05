import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
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
      screenOptions={({ route }) => ({
        headerShown: true, // Visar header för tab-skärmar
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3b82f6', // Blå färg för aktiv tab
        tabBarInactiveTintColor: '#6b7280', // Grå färg för inaktiv tab
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopColor: '#e5e7eb',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ 
          title: 'Home',
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ 
          title: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
} 