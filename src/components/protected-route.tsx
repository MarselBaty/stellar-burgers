import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../services/store';
import { getIsAuthChecked, getUserData } from '../services/slices/userSlice';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(getIsAuthChecked);
  const user = useSelector(getUserData);

  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    // Если роут только для авторизованных, а юзера нет
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    // Если роут только для НЕавторизованных (логин, регистрация), а юзер есть
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  return children;
};
