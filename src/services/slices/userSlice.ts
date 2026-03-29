import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  registerUserApi,
  logoutApi,
  updateUserApi,
  TLoginData,
  TRegisterData
} from '../../utils/burger-api';
import { TUser } from '../../utils/types';
import { setCookie, deleteCookie } from '../../utils/cookie';

export const getUser = createAsyncThunk('user/getUser', async () => {
  const res = await getUserApi();
  if (res && res.success) {
    return res.user;
  }
  return Promise.reject(res);
});

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData) => {
    const res = await loginUserApi(data);
    if (res && res.success) {
      setCookie('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      return res.user;
    }
    return Promise.reject(res);
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData) => {
    const res = await registerUserApi(data);
    if (res && res.success) {
      setCookie('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      return res.user;
    }
    return Promise.reject(res);
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: Partial<TRegisterData>) => {
    const res = await updateUserApi(data);
    if (res && res.success) {
      return res.user;
    }
    return Promise.reject(res);
  }
);

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    if (localStorage.getItem('refreshToken')) {
      try {
        await dispatch(getUser()).unwrap();
      } catch (e) {
        // Ошибка при запросе (например, токен невалиден)
        // очищаем сторадж
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      }
    }
  }
);

interface UserState {
  isAuthChecked: boolean;
  user: TUser | null;
  error: string | null;
  loading: boolean;
}

export const initialState: UserState = {
  isAuthChecked: false,
  user: null,
  error: null,
  loading: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // При инициализации проверки снимаем флаг готовности
      .addCase(checkUserAuth.pending, (state) => {
        state.isAuthChecked = false;
      })
      .addCase(checkUserAuth.fulfilled, (state) => {
        state.isAuthChecked = true;
      })
      .addCase(checkUserAuth.rejected, (state) => {
        state.isAuthChecked = true; // мы проверили - юзера нет, всё ок
      })

      // Запрос данных пользователя
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      // Логин
      .addCase(loginUser.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка авторизации';
        state.loading = false;
      })

      // Регистрация
      .addCase(registerUser.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка регистрации';
        state.loading = false;
      })

      // Обновление пользователя
      .addCase(updateUser.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка обновления данных';
        state.loading = false;
      })

      // Логаут
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
  selectors: {
    getIsAuthChecked: (state) => state.isAuthChecked,
    getUserData: (state) => state.user,
    getUserError: (state) => state.error,
    getUserLoading: (state) => state.loading
  }
});

export const getIsAuthChecked = (state: { user: UserState }) =>
  state.user.isAuthChecked;
export const getUserData = (state: { user: UserState }) => state.user.user;
export const getUserError = (state: { user: UserState }) => state.user.error;
export const getUserLoading = (state: { user: UserState }) =>
  state.user.loading;

export default userSlice.reducer;
