import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useUserStore } from '../store/useUserStore';

/**
 * LoginScreen - Inloggningsskärm för appen
 * 
 * Denna skärm visar ett formulär för e-post/lösenord inloggning.
 * Användaren kan logga in eller registrera sig.
 */
export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const { login, register, isLoading } = useUserStore();

  /**
   * Hanterar inloggningsförsök med e-post och lösenord
   */
  const handleAuth = async () => {
    // Validera input
    if (!email || !email.includes('@')) {
      Alert.alert('Fel', 'Ange en giltig e-postadress');
      return;
    }

    if (!password || password.length < 6) {
      Alert.alert('Fel', 'Lösenordet måste vara minst 6 tecken');
      return;
    }

    // Försök logga in eller registrera
    const result = isRegistering 
      ? await register(email, password)
      : await login(email, password);
    
    if (result.success) {
      Alert.alert(
        'Framgång!', 
        isRegistering 
          ? 'Konto skapat! Du är nu inloggad.'
          : 'Inloggning lyckades!'
      );
    } else {
      Alert.alert('Fel', result.error || 'Ett fel uppstod');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
      {/* Huvudrubrik */}
      <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#1f2937', marginBottom: 32 }}>
        Välkommen
      </Text>
      
      {/* E-post input */}
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
        placeholder="Ange din e-postadress"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      
      {/* Lösenord input */}
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
        placeholder="Ange ditt lösenord"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
      />
      
      {/* Huvudknapp */}
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
          {isLoading ? 'Bearbetar...' : (isRegistering ? 'Skapa konto' : 'Logga in')}
        </Text>
      </TouchableOpacity>
      
      {/* Växla mellan login/register */}
      <TouchableOpacity 
        onPress={() => setIsRegistering(!isRegistering)}
        style={{ padding: 8 }}
      >
        <Text style={{ color: '#3b82f6', fontSize: 16, textAlign: 'center' }}>
          {isRegistering ? 'Har du redan ett konto? Logga in' : 'Inget konto? Skapa ett'}
        </Text>
      </TouchableOpacity>
    </View>
  );
} 