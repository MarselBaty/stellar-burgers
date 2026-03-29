import orderBurgerReducer, {
  orderBurger,
  clearOrder
} from './orderBurgerSlice';

describe('orderBurgerSlice', () => {
  const initialState = {
    orderRequest: false,
    orderModalData: null,
    error: null
  };

  it('должен очищать заказ при clearOrder', () => {
    const state = {
      ...initialState,
      orderModalData: { number: 123 } as any,
      orderRequest: true,
      error: 'err'
    };
    const action = clearOrder();
    const newState = orderBurgerReducer(state as any, action);
    expect(newState).toEqual(initialState);
  });

  it('должен выставлять orderRequest в true при orderBurger.pending', () => {
    const action = { type: orderBurger.pending.type };
    const state = orderBurgerReducer(initialState, action);
    expect(state.orderRequest).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен сохранять данные заказа при orderBurger.fulfilled', () => {
    const mockOrder = { number: 123, name: 'Бургер' };
    const action = {
      type: orderBurger.fulfilled.type,
      payload: { order: mockOrder }
    };
    const state = orderBurgerReducer(initialState, action);
    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual(mockOrder);
  });

  it('должен сохранять ошибку при orderBurger.rejected', () => {
    const action = {
      type: orderBurger.rejected.type,
      error: { message: 'Ошибка заказа' }
    };
    const state = orderBurgerReducer(initialState, action);
    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe('Ошибка заказа');
  });
});
