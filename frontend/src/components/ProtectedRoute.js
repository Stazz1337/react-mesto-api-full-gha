import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ isLoggedIn, element }) => {
  return isLoggedIn ? element : <Navigate to="/signin" replace />;
};

export default ProtectedRouteElement;
