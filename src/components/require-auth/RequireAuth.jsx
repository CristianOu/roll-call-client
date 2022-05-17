import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const RequireAuth = ({ allowedRoles }) => {
  const { state } = useAuth();
  const location = useLocation();

  const role = state?.user?.claims?.role;

  return role && allowedRoles.includes(role) ? (
    <Outlet />
  ) : state?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
