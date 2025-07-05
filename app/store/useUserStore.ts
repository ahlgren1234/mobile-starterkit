import { create } from 'zustand';
import { supabase, AuthUser } from '../lib/supabase';

/**
 * Användarstate interface för Zustand store
 * 
 * Denna store hanterar:
 * - Användardata (user)
 * - Inloggningsstatus (isLoggedIn)
 * - Laddningstillstånd (isLoading)
 * - Auth-funktioner (login, logout, loadUser)
 */
interface UserState {
  // State
  user: AuthUser | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  
  // Actions
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  loadUser: () => Promise<void>;
  setLoading: (loading: boolean) => void;
}

/**
 * Zustand store för användarstate
 * 
 * Denna store används genom hela appen för att:
 * - Hålla koll på inloggningsstatus
 * - Hantera användardata
 * - Kontrollera navigation (auth vs main)
 */
export const useUserStore = create<UserState>((set, get) => ({
  // Initial state
  user: null,
  isLoggedIn: false,
  isLoading: false,

  /**
   * Loggar in användare med e-post och lösenord
   * 
   * @param email - Användarens e-postadress
   * @param password - Användarens lösenord
   * @returns Promise med success/error status
   */
  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true });
      
      console.log('Attempting login with email:', email);
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error);
        return { success: false, error: error.message };
      }

      console.log('Login successful');
      return { success: true };
    } catch (error) {
      console.error('Login exception:', error);
      return { success: false, error: 'Ett oväntat fel uppstod' };
    } finally {
      set({ isLoading: false });
    }
  },

  /**
   * Registrerar ny användare med e-post och lösenord
   * 
   * @param email - Användarens e-postadress
   * @param password - Användarens lösenord
   * @returns Promise med success/error status
   */
  register: async (email: string, password: string) => {
    try {
      set({ isLoading: true });
      
      console.log('Attempting registration with email:', email);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error('Registration error:', error);
        return { success: false, error: error.message };
      }

      // Kontrollera om användaren behöver verifiera e-post
      if (data.user && !data.user.email_confirmed_at) {
        console.log('User needs email verification');
        return { 
          success: false, 
          error: 'Kontrollera din e-post och klicka på verifieringslänken för att aktivera ditt konto.' 
        };
      }

      console.log('Registration successful');
      return { success: true };
    } catch (error) {
      console.error('Registration exception:', error);
      return { success: false, error: 'Ett oväntat fel uppstod' };
    } finally {
      set({ isLoading: false });
    }
  },

  /**
   * Loggar ut användaren
   */
  logout: async () => {
    try {
      set({ isLoading: true });
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Logout error:', error);
      }

      // Rensa state oavsett om det blev fel
      set({ user: null, isLoggedIn: false });
    } catch (error) {
      console.error('Logout exception:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  /**
   * Laddar användardata från Supabase
   * Anropas vid app-start och efter auth-state ändringar
   */
  loadUser: async () => {
    try {
      console.log('Loading user data from Supabase...');
      
      // Hämta nuvarande session
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Load user error:', error);
        set({ user: null, isLoggedIn: false, isLoading: false });
        return;
      }

      console.log('Session loaded:', {
        hasSession: !!session,
        hasUser: !!session?.user,
        userEmail: session?.user?.email,
      });

      if (session?.user) {
        // Användare är inloggad
        const user: AuthUser = {
          id: session.user.id,
          email: session.user.email || '',
          created_at: session.user.created_at,
          updated_at: session.user.updated_at || session.user.created_at,
        };
        
        console.log('Setting user as logged in:', user.email);
        set({ user, isLoggedIn: true, isLoading: false });
      } else {
        // Ingen användare inloggad
        console.log('No user session found');
        set({ user: null, isLoggedIn: false, isLoading: false });
      }
    } catch (error) {
      console.error('Load user exception:', error);
      set({ user: null, isLoggedIn: false, isLoading: false });
    }
  },

  /**
   * Sätter laddningstillstånd
   * 
   * @param loading - Om appen laddar eller inte
   */
  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },
}));

/**
 * Lyssnar på auth-state ändringar från Supabase
 * Uppdaterar store automatiskt när användaren loggar in/ut
 * 
 * Denna lyssnare sätts upp en gång när store skapas
 * och lyssnar på alla auth-state ändringar
 */
supabase.auth.onAuthStateChange(async (event, session) => {
  console.log('=== AUTH STATE CHANGE ===');
  console.log('Event:', event);
  console.log('Session user:', session?.user?.email);
  console.log('Session exists:', !!session);
  
  if (event === 'SIGNED_IN' && session?.user) {
    console.log('User signed in successfully');
    // Användare loggade in
    const user: AuthUser = {
      id: session.user.id,
      email: session.user.email || '',
      created_at: session.user.created_at,
      updated_at: session.user.updated_at || session.user.created_at,
    };
    
    console.log('Setting user state:', user);
    useUserStore.setState({ user, isLoggedIn: true, isLoading: false });
  } else if (event === 'SIGNED_OUT') {
    console.log('User signed out');
    // Användare loggade ut
    useUserStore.setState({ user: null, isLoggedIn: false, isLoading: false });
  } else if (event === 'TOKEN_REFRESHED' && session?.user) {
    console.log('Token refreshed');
    // Token uppdaterad - uppdatera användardata
    const user: AuthUser = {
      id: session.user.id,
      email: session.user.email || '',
      created_at: session.user.created_at,
      updated_at: session.user.updated_at || session.user.created_at,
    };
    useUserStore.setState({ user, isLoggedIn: true, isLoading: false });
  } else if (event === 'INITIAL_SESSION') {
    if (session?.user) {
      console.log('Initial session found - user is already logged in');
      // Användare har redan en session (app startade)
      const user: AuthUser = {
        id: session.user.id,
        email: session.user.email || '',
        created_at: session.user.created_at,
        updated_at: session.user.updated_at || session.user.created_at,
      };
      useUserStore.setState({ user, isLoggedIn: true, isLoading: false });
    } else {
      console.log('No initial session found - user needs to log in');
      useUserStore.setState({ user: null, isLoggedIn: false, isLoading: false });
    }
  } else {
    console.log('Other auth event:', event);
  }
}); 