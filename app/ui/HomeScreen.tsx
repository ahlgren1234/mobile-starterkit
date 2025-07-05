import React from 'react';
import { View, Text } from 'react-native';

/**
 * HomeScreen - Huvudskärm för inloggade användare
 * 
 * Denna skärm visas när användaren är inloggad och väljer "Hem"-fliken.
 * För nu är det en enkel välkomstskärm.
 * 
 * TODO: Lägg till faktiskt innehåll som användaren vill se på hemskärmen
 */
export default function HomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
      {/* Huvudrubrik */}
      <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#1f2937', marginBottom: 16 }}>
        Hem
      </Text>
      
      {/* Beskrivande text */}
      <Text style={{ color: '#6b7280', textAlign: 'center' }}>
        Välkommen till din app!
      </Text>
    </View>
  );
} 