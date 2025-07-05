import React from 'react';
import { View, Text } from 'react-native';

/**
 * HomeScreen - Main screen for logged-in users
 * 
 * This screen is displayed when the user is logged in and selects the "Home" tab.
 * For now, it's a simple welcome screen.
 * 
 * TODO: Add actual content that users want to see on the home screen
 */
export default function HomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
      {/* Main title */}
      <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#1f2937', marginBottom: 16 }}>
        Home
      </Text>
      
      {/* Descriptive text */}
      <Text style={{ color: '#6b7280', textAlign: 'center' }}>
        Welcome to your app!
      </Text>
    </View>
  );
} 