import React from 'react';

export interface UserContextValue {
  isAuthenticated: boolean;
  setIsAuthenticated: (x: boolean) => void;
  setUsername: (username: string) => void;
  username: string;
}

const defaultValue: UserContextValue = {
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  setUsername: () => {},
  username: '',
};

const UserContext: React.Context<UserContextValue> = React.createContext(
  defaultValue
);

export default UserContext;
