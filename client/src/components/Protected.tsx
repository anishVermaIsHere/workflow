import { Navigate, Outlet, useLocation, matchPath } from "react-router-dom";
import useAuthStore from "../store/auth.store";

const Protected = () => {
  const location=useLocation();
  const  { user } =useAuthStore(state=>state);
  const publicRoutes=['/', '/register'];
  const protectedRoutes=['/user/:path/*'];
  const isProtectedRoute = protectedRoutes.some(route => matchPath(route, location.pathname));
  const isPublicRoute = publicRoutes.some(route => matchPath(route, location.pathname));
  
  if((user.accessToken && isProtectedRoute) || (!user.accessToken && isPublicRoute)){
    return <Outlet/>;
  }
  if(!user.accessToken && isProtectedRoute){
    return <Navigate to="/" state={{ from:location }} replace />;
  }
  if(user.accessToken && isPublicRoute){
    return <Navigate to="/user/workflow" state={{ from:location }} replace />;
  }
};

export default Protected;
