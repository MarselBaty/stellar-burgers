import { rootReducer } from './rootReducer';
import { store } from './store';

describe('rootReducer', () => {
  it('должен возвращать начальное состояние при вызове с undefined состоянием и неизвестным экшеном', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(initialState).toBeDefined();
    expect(initialState).toHaveProperty('ingredients');
    expect(initialState).toHaveProperty('user');
    expect(initialState).toHaveProperty('burgerConstructor');
  });
});
