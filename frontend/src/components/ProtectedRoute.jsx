import useStore from "../store";
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
  const { token, setToken } = useStore();


  if(!token) {
    return <Navigate to={"/login"} />
  }

  return  <Outlet />
};

export default ProtectedRoute;
