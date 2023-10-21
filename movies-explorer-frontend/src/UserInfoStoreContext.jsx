import { createContext, useState } from 'react';
import api from './utils/MainApi';

export const UserInfoStoreContext = createContext();

export const UserInfoStoreProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined);

  const checkToken = async () => {
    try {
      const { name, email } = await api.getUserInfo();
      setCurrentUser((state) => ({
        ...state,
        name,
        email,
        isLoggedIn: true,
      }));
    } catch (e) {
      localStorage.clear();
      setCurrentUser({ isLoggedIn: false });
    }
  };

  const setLoggedOut = () => setCurrentUser({ isLoggedIn: false });

  const setUpdate = async (newUserInfo) => {
    try {
      const { name, email } = await api.setUserInfo(newUserInfo);
      setCurrentUser((prev) => ({
        ...prev,
        name,
        email,
      }));
    } catch (e) {
      console.error('Ошибка изменения данных о пользователе');
    }
  };

  return (
    <UserInfoStoreContext.Provider
      value={{
        currentUser,
        checkToken,
        setLoggedOut,
        setUpdate,
      }}
    >
      {children}
    </UserInfoStoreContext.Provider>
  );
};
