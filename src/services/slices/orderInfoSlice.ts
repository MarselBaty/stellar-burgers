import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

export const getOrderInfo = createAsyncThunk(
  'orderInfo/getOrderInfo',
  async (number: number) => {
    const res = await getOrderByNumberApi(number);
    if (res && res.success) {
      return res.orders[0];
    }
    return Promise.reject(res);
  }
);

interface OrderInfoState {
  orderData: TOrder | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderInfoState = {
  orderData: null,
  loading: false,
  error: null
};

export const orderInfoSlice = createSlice({
  name: 'orderInfo',
  initialState,
  reducers: {
    clearOrderInfo: (state) => {
      state.orderData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.orderData = action.payload;
      })
      .addCase(getOrderInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки заказа';
      });
  },
  selectors: {
    getOrderData: (state) => state.orderData,
    getOrderInfoLoading: (state) => state.loading
  }
});

export const { clearOrderInfo } = orderInfoSlice.actions;
export const getOrderData = (state: { orderInfo: OrderInfoState }) =>
  state.orderInfo.orderData;
export const getOrderInfoLoading = (state: { orderInfo: OrderInfoState }) =>
  state.orderInfo.loading;

export default orderInfoSlice.reducer;
