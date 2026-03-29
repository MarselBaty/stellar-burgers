import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../utils/burger-api';
import { clearConstructor } from './burgerConstructorSlice';
import { TOrder } from '../../utils/types';

export const orderBurger = createAsyncThunk(
  'order/orderBurger',
  async (ingredientIds: string[], { dispatch }) => {
    const res = await orderBurgerApi(ingredientIds);
    if (res && res.success) {
      dispatch(clearConstructor());
      return res;
    }
    return Promise.reject(res);
  }
);

interface OrderBurgerState {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
}

const initialState: OrderBurgerState = {
  orderRequest: false,
  orderModalData: null,
  error: null
};

export const orderBurgerSlice = createSlice({
  name: 'orderBurger',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.orderModalData = null;
      state.orderRequest = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order as unknown as TOrder;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || 'Ошибка оформления заказа';
      });
  },
  selectors: {
    getOrderRequest: (state) => state.orderRequest,
    getOrderModalData: (state) => state.orderModalData
  }
});

export const clearOrder = orderBurgerSlice.actions.clearOrder;
export const getOrderRequest = (state: { orderBurger: OrderBurgerState }) =>
  state.orderBurger.orderRequest;
export const getOrderModalData = (state: { orderBurger: OrderBurgerState }) =>
  state.orderBurger.orderModalData;

export default orderBurgerSlice.reducer;
