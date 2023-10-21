import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ children, isAllowed, path }) => {
  return isAllowed ? children : <Navigate to={path} replace />;
};

export default ProtectedRouteElement;
