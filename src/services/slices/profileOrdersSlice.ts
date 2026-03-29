import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

export const getProfileOrders = createAsyncThunk(
  'profileOrders/getProfileOrders',
  async () => {
    const res = await getOrdersApi();
    return res;
  }
);

interface ProfileOrdersState {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
}

export const initialState: ProfileOrdersState = {
  orders: [],
  loading: false,
  error: null
};

export const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfileOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfileOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getProfileOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки истории заказов';
      });
  },
  selectors: {
    getProfileOrdersData: (state) => state.orders,
    getProfileOrdersLoading: (state) => state.loading
  }
});

export const getProfileOrdersData = (state: {
  profileOrders: ProfileOrdersState;
}) => state.profileOrders.orders;
export const getProfileOrdersLoading = (state: {
  profileOrders: ProfileOrdersState;
}) => state.profileOrders.loading;

export default profileOrdersSlice.reducer;
