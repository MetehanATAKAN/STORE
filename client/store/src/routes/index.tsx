import React, { useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from '../pages/Home/Home';
import SignUp from '../pages/SignUp/SignUp';
import Login from '../pages/Login/Login';
import { useSelector } from 'react-redux';
import Basket from '../components/Basket/Basket';
import Favorites from '../pages/Favorites/Favorites';



const RoutesIndex : React.FC = () => {

  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();
  const location = useLocation();

  
  const { isUser} = useSelector((state: { auth: AuthState }) => state.auth);

  const router = [
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/sign",
      element: <SignUp />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/basket",
      element: <Basket />,
    },
    {
      path: "/favorites",
      element: <Favorites />,
    },
  ];

  useEffect(() => {
    if (!token && (location.pathname !== '/login' && location.pathname !== '/sign')) navigate('/login')
  }, [navigate, token, isUser, location.pathname])

  return (
    <Routes>
      {
        router.map((rout, key) => (
          <Route key={key} path={rout.path} element={rout.element} />
        ))
      }
    </Routes>

  )
}

export default RoutesIndex