import './App.css';
import { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '../../pages/Main';
import UserProfile from '../../pages/UserProfile/UserProfile';
import Login from '../../pages/Login/Login';
import Registration from '../../pages/Registration/Registration';
import AuthorizedUser from '../../pages/AuthorizedUser';
import NotFound from '../../pages/NotFound/NotFound';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { useNotificationStore } from '../../hooks/useStore';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Notification from '../Notification/Notification';

import { UserInfoStoreContext } from '../../UserInfoStoreContext';

const App = () => {
  const { currentUser, checkToken } = useContext(UserInfoStoreContext);
  const setInvisible = useNotificationStore((state) => state.setInvisible);
  const notificationObject = useNotificationStore(
    (state) => state.notificationObject
  );

  useEffect(() => {
    const fetch = async () => {
      await checkToken();
    };
    if (currentUser === undefined) {
      fetch();
    }
  }, [checkToken, currentUser]);

  useEffect(() => {
    setTimeout(setInvisible, 4000);
  }, [notificationObject, setInvisible]);

  return (
    <>
      {!(currentUser === undefined) && (
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/signup"
            element={
              <ProtectedRoute AuthRequired={false}>
                <Registration />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <ProtectedRoute AuthRequired={false}>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute AuthRequired={true}>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute AuthRequired={true}>
                <AuthorizedUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute AuthRequired={true}>
                <AuthorizedUser />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
      <BurgerMenu />
      <Notification />
    </>
  );
};

export default App;
