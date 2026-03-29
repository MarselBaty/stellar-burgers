import profileOrdersReducer, {
  getProfileOrders
} from './profileOrdersSlice';

describe('profileOrdersSlice', () => {
  const initialState = {
    orders: [],
    loading: false,
    error: null
  };

  it('должен выставлять loading в true при getProfileOrders.pending', () => {
    const action = { type: getProfileOrders.pending.type };
    const state = profileOrdersReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен сохранять данные при getProfileOrders.fulfilled', () => {
    const mockOrders = [{ number: 123, name: 'Бургер' }];
    const action = {
      type: getProfileOrders.fulfilled.type,
      payload: mockOrders
    };
    // @ts-ignore
    const state = profileOrdersReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(mockOrders);
  });

  it('должен сохранять ошибку при getProfileOrders.rejected', () => {
    const action = {
      type: getProfileOrders.rejected.type,
      error: { message: 'Ошибка истории заказов' }
    };
    const state = profileOrdersReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка истории заказов');
  });
});
