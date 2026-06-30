import { Navigate } from "react-router-dom";
import { usehostalstore } from "../store/hostal";

const ProtectedRoute = ({ children, role }) => {
  const { token, currentUser } = usehostalstore();

  if (!token || !currentUser) {
    return <Navigate to={role === "admin" ? "/signinadmin" : "/signin"} replace />;
  }

  if (role && currentUser.role !== role) {
    return <Navigate to={currentUser.role === "admin" ? "/admin" : "/home"} replace />;
  }

  return children;
};

export default ProtectedRoute;
