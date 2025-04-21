import { auth, googleProvider, githubProvider } from '@/lib/firebase';
import { signInWithPopup, signOut as firebaseSignOut, User } from 'firebase/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const signInWithProvider = async (provider: 'google' | 'github') => {
  try {
    const authProvider = provider === 'google' ? googleProvider : githubProvider;
    const result = await signInWithPopup(auth, authProvider);
    const idToken = await result.user.getIdToken();
    
    // Verify token with backend - Updated endpoint
    const response = await fetch(`${API_URL}/api/auth/verify-token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        idToken: idToken
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to verify with backend');
    }

    const userData = await response.json();
    console.log('Backend verification successful:', userData);
    
    // Store the JWT tokens
    localStorage.setItem('token', userData.token);
    localStorage.setItem('refresh', userData.refresh);
    
    return { user: result.user, token: userData.token };
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    // Clear JWT tokens from backend - Updated endpoint
    const refresh = localStorage.getItem('refresh');
    if (refresh) {
      await fetch(`${API_URL}/api/auth/logout/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          refresh_token: refresh
        }),
      });
    }
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
};

export async function getCurrentUser(): Promise<User | null> {
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    });
  });
}