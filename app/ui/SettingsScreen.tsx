import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useUserStore } from '../store/useUserStore';

/**
 * SettingsScreen - Settings screen for the user
 * 
 * This screen is displayed when the user selects the "Settings" tab.
 * Here the user can configure app settings, profile, etc.
 */
export default function SettingsScreen() {
  const { user, logout, isLoading } = useUserStore();

  /**
   * Handles logout
   */
  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: logout
        }
      ]
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 24 }}>
      {/* Main title */}
      <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#1f2937', marginBottom: 32, textAlign: 'center' }}>
        Settings
      </Text>
      
      {/* User info */}
      {user && (
        <View style={{ 
          backgroundColor: '#f3f4f6', 
          padding: 16, 
          borderRadius: 8, 
          marginBottom: 24 
        }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#1f2937', marginBottom: 8 }}>
            Signed in as:
          </Text>
          <Text style={{ fontSize: 14, color: '#6b7280' }}>
            {user.email}
          </Text>
        </View>
      )}
      
      {/* Sign out button */}
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
          {isLoading ? 'Signing out...' : 'Sign Out'}
        </Text>
      </TouchableOpacity>
    </View>
  );
} 