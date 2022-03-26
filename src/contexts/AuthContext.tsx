import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as AuthSession from 'expo-auth-session';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  email: string;
  name: string;
  id: string;
  picture?: string;
}

interface AuthContextData {
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  logOut: () => void;
  user: User;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);

  async function signInWithGoogle() {  
    const RESPONSE_TYPE = 'token';
    const SCOPE = encodeURI('profile email');

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

    const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse;
    
    if (type === 'success') {
      const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
      const userInfo = await response.json();
      setUser({
        email: userInfo.email,
        id: userInfo.id,
        name: userInfo.given_name,
        picture: userInfo.picture
      });

      await AsyncStorage.setItem('@gofinances:user', JSON.stringify(userInfo));
    }
  }

  async function signInWithApple() {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
      ]
    });

    if (credential) {
      const userInfo = {
        id: String(credential.user),
        email: credential.email!,
        name: credential.fullName!.givenName!,
        picture: undefined
      };

      setUser(userInfo);
      await AsyncStorage.setItem('@gofinances:user', JSON.stringify(userInfo));
    }
  }

  async function logOut() {
    await AsyncStorage.removeItem('@gofinances:user');
    setUser({} as User);
  }

  useEffect(() => {
    async function getUserInfo() {
      const response = await AsyncStorage.getItem('@gofinances:user');
      const data = response ? JSON.parse(response) : {};
      if (data) setUser(data);
    }

    getUserInfo();
  }, [])
  
  return (
    <AuthContext.Provider value={{
      signInWithGoogle,
      signInWithApple,
      logOut,
      user
    }}>
      { children }
    </AuthContext.Provider>
  )
}