import React from 'react';
import { StatusBar } from 'expo-status-bar';
import RootNavigator from './app/navigation/RootNavigator';

/**
 * App - Huvudkomponent för hela appen
 * 
 * Denna komponent är entry point för appen och sätter upp:
 * - Navigation (RootNavigator) som hanterar auth-state
 * - Status bar
 * - Supabase auth-state lyssnare (via useUserStore)
 * 
 * TODO: Lägg till fler global providers här (t.ex. RevenueCat, PostHog, etc.)
 */
export default function App() {

  return (
    <>
      {/* Status bar konfiguration */}
      <StatusBar style="auto" />
      
      {/* Huvudnavigation som hanterar auth/main-flöden */}
      <RootNavigator />
    </>
  );
}
