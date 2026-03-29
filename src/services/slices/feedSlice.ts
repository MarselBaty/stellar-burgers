import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

export const fetchFeed = createAsyncThunk('feed/fetchFeed', async () => {
  const res = await getFeedsApi();
  return res;
});

interface FeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null;
}

export const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки ленты заказов';
      });
  },
  selectors: {
    getFeedOrders: (state) => state.orders,
    getFeedTotal: (state) => state.total,
    getFeedTotalToday: (state) => state.totalToday,
    getFeedLoading: (state) => state.loading,
    getFeedError: (state) => state.error
  }
});

export const getFeedOrders = (state: { feed: FeedState }) => state.feed.orders;
export const getFeedTotal = (state: { feed: FeedState }) => state.feed.total;
export const getFeedTotalToday = (state: { feed: FeedState }) =>
  state.feed.totalToday;
export const getFeedLoading = (state: { feed: FeedState }) =>
  state.feed.loading;
export const getFeedError = (state: { feed: FeedState }) => state.feed.error;

export default feedSlice.reducer;
