import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredientsSlice';
import userReducer from './slices/userSlice';
import burgerConstructorReducer from './slices/burgerConstructorSlice';
import orderBurgerReducer from './slices/orderBurgerSlice';
import profileOrdersReducer from './slices/profileOrdersSlice';
import feedReducer from './slices/feedSlice';
import orderInfoReducer from './slices/orderInfoSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  user: userReducer,
  burgerConstructor: burgerConstructorReducer,
  orderBurger: orderBurgerReducer,
  profileOrders: profileOrdersReducer,
  feed: feedReducer,
  orderInfo: orderInfoReducer
});
