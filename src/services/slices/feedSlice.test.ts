import feedReducer, { fetchFeed } from './feedSlice';

describe('feedSlice', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    loading: false,
    error: null
  };

  it('должен выставлять loading в true при fetchFeed.pending', () => {
    const action = { type: fetchFeed.pending.type };
    const state = feedReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен сохранять данные при fetchFeed.fulfilled', () => {
    const mockPayload = {
      orders: [
        {
          _id: '1',
          status: 'done',
          name: 'Бургер',
          number: 123,
          createdAt: '',
          updatedAt: '',
          ingredients: []
        }
      ],
      total: 100,
      totalToday: 10
    };
    const action = { type: fetchFeed.fulfilled.type, payload: mockPayload };
    const state = feedReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(mockPayload.orders);
    expect(state.total).toBe(100);
    expect(state.totalToday).toBe(10);
  });

  it('должен сохранять ошибку при fetchFeed.rejected', () => {
    const action = {
      type: fetchFeed.rejected.type,
      error: { message: 'Ошибка загрузки ленты' }
    };
    const state = feedReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки ленты');
  });
});
