import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

function PrivateRoutes() {
  const { auth } = useAuth();
  console.log({ auth });

  if (auth === undefined) return 'loading...';

  return auth === true ? <Outlet /> : <Navigate to="/auth" />;
}

export default PrivateRoutes;