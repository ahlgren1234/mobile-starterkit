import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useUserStore } from '../store/useUserStore';

/**
 * SettingsScreen - Inställningsskärm för användaren
 * 
 * Denna skärm visas när användaren väljer "Inställningar"-fliken.
 * Här kan användaren konfigurera app-inställningar, profil, etc.
 */
export default function SettingsScreen() {
  const { user, logout, isLoading } = useUserStore();

  /**
   * Hanterar utloggning
   */
  const handleLogout = () => {
    Alert.alert(
      'Logga ut',
      'Är du säker på att du vill logga ut?',
      [
        { text: 'Avbryt', style: 'cancel' },
        { 
          text: 'Logga ut', 
          style: 'destructive',
          onPress: logout
        }
      ]
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 24 }}>
      {/* Huvudrubrik */}
      <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#1f2937', marginBottom: 32, textAlign: 'center' }}>
        Inställningar
      </Text>
      
      {/* Användarinfo */}
      {user && (
        <View style={{ 
          backgroundColor: '#f3f4f6', 
          padding: 16, 
          borderRadius: 8, 
          marginBottom: 24 
        }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#1f2937', marginBottom: 8 }}>
            Inloggad som:
          </Text>
          <Text style={{ fontSize: 14, color: '#6b7280' }}>
            {user.email}
          </Text>
        </View>
      )}
      
      {/* Logga ut knapp */}
      <TouchableOpacity 
        style={{ 
          backgroundColor: '#ef4444', 
          paddingHorizontal: 32, 
          paddingVertical: 16, 
          borderRadius: 8,
          opacity: isLoading ? 0.7 : 1,
        }}
        onPress={handleLogout}
        disabled={isLoading}
      >
        <Text style={{ color: 'white', fontWeight: '600', fontSize: 18, textAlign: 'center' }}>
          {isLoading ? 'Loggar ut...' : 'Logga ut'}
        </Text>
      </TouchableOpacity>
    </View>
  );
} 