import { UserInfoStoreContext } from '../../UserInfoStoreContext';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, AuthRequired }) {
  const { currentUser } = useContext(UserInfoStoreContext);

  const isAuthorized = currentUser.isLoggedIn;

  if (isAuthorized === AuthRequired) {
    return <>{children}</>;
  }
  return <Navigate to="/" replace={true} />;
}
