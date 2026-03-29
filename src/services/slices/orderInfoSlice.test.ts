import orderInfoReducer, {
  getOrderInfo,
  clearOrderInfo
} from './orderInfoSlice';

describe('orderInfoSlice', () => {
  const initialState = {
    orderData: null,
    loading: false,
    error: null
  };

  it('должен очищать данные заказа при clearOrderInfo', () => {
    const state = { ...initialState, orderData: { number: 123 } as any, error: 'err' };
    const action = clearOrderInfo();
    const newState = orderInfoReducer(state as any, action);
    expect(newState.orderData).toBeNull();
  });

  it('должен выставлять loading в true при getOrderInfo.pending', () => {
    const action = { type: getOrderInfo.pending.type };
    const state = orderInfoReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен сохранять данные заказа при getOrderInfo.fulfilled', () => {
    const mockOrder = { number: 123, name: 'Бургер' };
    const action = {
      type: getOrderInfo.fulfilled.type,
      payload: mockOrder
    };
    const state = orderInfoReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.orderData).toEqual(mockOrder);
  });

  it('должен сохранять ошибку при getOrderInfo.rejected', () => {
    const action = {
      type: getOrderInfo.rejected.type,
      error: { message: 'Ошибка загрузки' }
    };
    const state = orderInfoReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });
});
