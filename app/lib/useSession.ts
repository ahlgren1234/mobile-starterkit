import { useEffect } from 'react';
import { useUserStore } from '../store/useUserStore';

/**
 * Custom hook för session-hantering
 * 
 * Denna hook använder useEffect för att:
 * 1. Lyssna på Zustand store-ändringar
 * 2. Hantera session-state automatiskt
 * 3. Ge tydlig feedback om session-status
 * 
 * Användning:
 * const { isLoggedIn, isLoading, user } = useSession();
 */
export function useSession() {
  const { isLoggedIn, isLoading, user, loadUser, setLoading } = useUserStore();

  /**
   * useEffect för att hantera session-hantering
   * 
   * 1. Laddar användardata när hook används
   * 2. Automatiskt uppdateras när auth-state ändras
   * 3. Hanterar session-persistence med AsyncStorage
   */
  useEffect(() => {
    console.log('useSession: Initializing session...');
    
    // Sätt loading till true när vi börjar ladda
    setLoading(true);
    
    // Ladda användardata med en kort fördröjning för att låta AsyncStorage laddas
    const timer = setTimeout(() => {
      loadUser();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []); // Kör bara en gång när komponenten mountas

  /**
   * useEffect för att logga session-ändringar
   * Hjälper med debugging och förståelse av auth-flödet
   */
  useEffect(() => {
    console.log('useSession: Session state changed:', {
      isLoggedIn,
      isLoading,
      userEmail: user?.email,
    });
  }, [isLoggedIn, isLoading, user]);

  return {
    isLoggedIn,
    isLoading,
    user,
    loadUser,
  };
} 