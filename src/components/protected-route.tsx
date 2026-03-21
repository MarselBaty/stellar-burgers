import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  // TODO: Будет заменено на данные из стора в следующем шаге
  const isAuthChecked = true; // Пока заглушка
  const user = null; // Пока заглушка

  const location = useLocation();

  if (!isAuthChecked) {
    // Заглушка, пока проверяется авторизация
    return null;
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
