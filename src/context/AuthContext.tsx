'use client'
import { createContext, useContext, useState } from "react";

interface User {
  id: string | number
  firstName: string
  lastName: string
  email: string
  username: string
  image: string
}

type TAuthContext = {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  logout: () => void
  login: (user: User, accessToken: string, refreshToken: string) => void
}

const AuthContext = createContext<TAuthContext | undefined>(undefined)

export const AuthProvider = ({children}: {children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user') || null;
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [accessToken, setAccessToken] = useState<string | null>(() => {
    return localStorage.getItem('accessToken');
  });


  const [refreshToken, setRefreshToken] = useState<string | null>(() => {
    return localStorage.getItem('refreshToken');
  });

  const login = (user: User, accessToken: string, refreshToken: string) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    setUser(user)
    setAccessToken(accessToken)
    setRefreshToken(refreshToken)
  }

  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setUser(null)
    setAccessToken(null)
    setRefreshToken(null)
    console.log('Logout success! User has been logged out.');
  }

  return (
    <AuthContext.Provider
      value={{user, accessToken, refreshToken, login, logout}}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if(!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
