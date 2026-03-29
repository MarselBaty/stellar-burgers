import userReducer, {
  checkUserAuth,
  getUser,
  loginUser,
  registerUser,
  updateUser,
  logoutUser
} from './userSlice';

describe('userSlice', () => {
  const initialState = {
    isAuthChecked: false,
    user: null,
    error: null,
    loading: false
  };

  it('checkUserAuth.pending', () => {
    const state = userReducer(initialState, {
      type: checkUserAuth.pending.type
    });
    expect(state.isAuthChecked).toBe(false);
  });
  it('checkUserAuth.fulfilled', () => {
    const state = userReducer(initialState, {
      type: checkUserAuth.fulfilled.type
    });
    expect(state.isAuthChecked).toBe(true);
  });
  it('checkUserAuth.rejected', () => {
    const state = userReducer(initialState, {
      type: checkUserAuth.rejected.type
    });
    expect(state.isAuthChecked).toBe(true);
  });

  it('getUser.fulfilled', () => {
    const mockUser = { email: 'test@test.com', name: 'User' };
    const state = userReducer(initialState, {
      type: getUser.fulfilled.type,
      payload: mockUser
    });
    expect(state.user).toEqual(mockUser);
  });

  it('loginUser', () => {
    let state = userReducer(initialState, { type: loginUser.pending.type });
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();

    const mockUser = { email: 'test@test.com', name: 'User' };
    state = userReducer(state, {
      type: loginUser.fulfilled.type,
      payload: mockUser
    });
    expect(state.loading).toBe(false);
    expect(state.user).toEqual(mockUser);

    state = userReducer(initialState, {
      type: loginUser.rejected.type,
      error: { message: 'err' }
    });
    expect(state.loading).toBe(false);
    expect(state.error).toBe('err');
  });

  it('registerUser', () => {
    let state = userReducer(initialState, { type: registerUser.pending.type });
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();

    const mockUser = { email: 'test@test.com', name: 'Test' };
    state = userReducer(state, {
      type: registerUser.fulfilled.type,
      payload: mockUser
    });
    expect(state.loading).toBe(false);
    expect(state.user).toEqual(mockUser);

    state = userReducer(initialState, {
      type: registerUser.rejected.type,
      error: { message: 'err' }
    });
    expect(state.loading).toBe(false);
    expect(state.error).toBe('err');
  });

  it('updateUser', () => {
    let state = userReducer(initialState, { type: updateUser.pending.type });
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();

    const mockUser = { email: 'test@test.com', name: 'Test' };
    state = userReducer(state, {
      type: updateUser.fulfilled.type,
      payload: mockUser
    });
    expect(state.loading).toBe(false);
    expect(state.user).toEqual(mockUser);

    state = userReducer(initialState, {
      type: updateUser.rejected.type,
      error: { message: 'err' }
    });
    expect(state.loading).toBe(false);
    expect(state.error).toBe('err');
  });

  it('logoutUser.fulfilled', () => {
    const state = userReducer(
      { ...initialState, user: { email: '', name: '' } },
      { type: logoutUser.fulfilled.type }
    );
    expect(state.user).toBeNull();
  });
});
