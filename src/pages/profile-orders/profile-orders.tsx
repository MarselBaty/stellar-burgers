import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getProfileOrders,
  getProfileOrdersData
} from '../../services/slices/profileOrdersSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(getProfileOrdersData);

  useEffect(() => {
    dispatch(getProfileOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
