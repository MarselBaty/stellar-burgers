import ingredientsReducer, { fetchIngredients, initialState } from './ingredientsSlice';

describe('ingredientsSlice', () => {

  it('должен выставлять loading в true при fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен сохранять данные при fetchIngredients.fulfilled', () => {
    const mockData = [{ _id: '1', name: 'Булка', type: 'bun' }];
    const action = { type: fetchIngredients.fulfilled.type, payload: mockData };
    const state = ingredientsReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual(mockData);
  });

  it('должен сохранять ошибку при fetchIngredients.rejected', () => {
    const action = { type: fetchIngredients.rejected.type, error: { message: 'Ошибка загрузки' } };
    const state = ingredientsReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });
});
