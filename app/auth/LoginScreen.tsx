import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useUserStore } from '../store/useUserStore';

/**
 * LoginScreen - Authentication screen for the app
 * 
 * This screen displays a form for email/password authentication.
 * Users can log in or register.
 */
export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const { login, register, isLoading } = useUserStore();

  /**
   * Handles authentication attempts with email and password
   */
  const handleAuth = async () => {
    // Validate input
    if (!email || !email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    if (!password || password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    // Attempt login or register
    const result = isRegistering 
      ? await register(email, password)
      : await login(email, password);
    
    if (result.success) {
      Alert.alert(
        'Success!', 
        isRegistering 
          ? 'Account created! You are now logged in.'
          : 'Login successful!'
      );
    } else {
      Alert.alert('Error', result.error || 'An error occurred');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
      {/* Main title */}
      <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#1f2937', marginBottom: 32 }}>
        Welcome
      </Text>
      
      {/* Email input */}
      <TextInput
        style={{
          width: '100%',
          borderWidth: 1,
          borderColor: '#d1d5db',
          borderRadius: 8,
          padding: 16,
          fontSize: 16,
          marginBottom: 16,
        }}
        placeholder="Enter your email address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      
      {/* Password input */}
      <TextInput
        style={{
          width: '100%',
          borderWidth: 1,
          borderColor: '#d1d5db',
          borderRadius: 8,
          padding: 16,
          fontSize: 16,
          marginBottom: 24,
        }}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
      />
      
      {/* Main button */}
      <TouchableOpacity 
        style={{ 
          backgroundColor: isLoading ? '#9ca3af' : '#3b82f6', 
          paddingHorizontal: 32, 
          paddingVertical: 16, 
          borderRadius: 8,
          opacity: isLoading ? 0.7 : 1,
          marginBottom: 16,
        }}
        onPress={handleAuth}
        disabled={isLoading}
      >
        <Text style={{ color: 'white', fontWeight: '600', fontSize: 18, textAlign: 'center' }}>
          {isLoading ? 'Processing...' : (isRegistering ? 'Create Account' : 'Sign In')}
        </Text>
      </TouchableOpacity>
      
      {/* Toggle between login/register */}
      <TouchableOpacity 
        onPress={() => setIsRegistering(!isRegistering)}
        style={{ padding: 8 }}
      >
        <Text style={{ color: '#3b82f6', fontSize: 16, textAlign: 'center' }}>
          {isRegistering ? 'Already have an account? Sign in' : 'No account? Create one'}
        </Text>
      </TouchableOpacity>
    </View>
  );
} 