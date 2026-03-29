import { FC } from 'react';
import { useSelector } from '../../services/store';
import {
  getFeedOrders,
  getFeedTotal,
  getFeedTotalToday
} from '../../services/slices/feedSlice';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';

const getOrders = (orders: TOrder[], status: string[]): number[] =>
  orders
    .filter((item) => status.includes(item.status))
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders = useSelector(getFeedOrders);
  const total = useSelector(getFeedTotal);
  const totalToday = useSelector(getFeedTotalToday);

  const feed = { total, totalToday };

  const readyOrders = getOrders(orders, ['done']);

  const pendingOrders = getOrders(orders, ['pending', 'created']);

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
