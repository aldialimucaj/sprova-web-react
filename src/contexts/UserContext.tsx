import { getUser } from '@/api/auth.api';
import { User } from '@/models/User';
import React, { useState } from 'react';

const UserContext = React.createContext({});

const UserProvider: React.FunctionComponent = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(getUser());

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user: currentUser,
        onLogin: handleLogin,
        onLogout: handleLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
