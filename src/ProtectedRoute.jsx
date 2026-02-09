import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user) {
    // If no user found in storage, send back to login
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // If role doesn't match, send to their own dashboard
    return <Navigate to={`/${user.role}-dashboard`} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;