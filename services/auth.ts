import api from './api';
import { auth } from '@/lib/firebase';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  GithubAuthProvider,
  User
} from 'firebase/auth';

export interface UserInfo {
  id: number;
  email: string;
  name: string;
  avatar: string;
  provider: string;
  date_joined: string;
  last_login: string;
}

export const signInWithProvider = async (providerName: 'google' | 'github') => {
  try {
    let user: User;
    let idToken: string;

    if (auth.currentUser) {
      user = auth.currentUser;
      idToken = await user.getIdToken(true); // Force refresh the token
    } else {
      const provider = providerName === 'google' 
        ? new GoogleAuthProvider() 
        : new GithubAuthProvider();
        
      const result = await signInWithPopup(auth, provider);
      user = result.user;
      idToken = await user.getIdToken();
    }

    // Verify token with backend
    const response = await api.post('/api/auth/verify-token/', { idToken });
    const { token, refresh } = response.data;

    // Store both tokens
    localStorage.setItem('token', token);
    localStorage.setItem('refresh_token', refresh);

    // Update axios default headers
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    return { user, token };
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
};

export const getCurrentUserInfo = async (): Promise<UserInfo> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await api.get('/api/me/');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user info:', error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      await api.post('/api/auth/logout/', { refresh_token: refreshToken });
    }
    await auth.signOut();
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    delete api.defaults.headers.common['Authorization'];
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};