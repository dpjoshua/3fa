import React from 'react';

const AuthContext = React.createContext({});

export const AuthProvider = AuthContext.Provider;

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
