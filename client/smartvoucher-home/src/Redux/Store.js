import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import AuthSlice from "./data/AuthSlice";
import UserSlice from "./data/UserSlice";
import CartSlice from "./data/CartSlice";

const reducers = combineReducers({
  auth: AuthSlice,
  user: UserSlice,
  cart: CartSlice,
});


const persistConfig = {
  key: "root",
  storage,
};

const appReducer = (state, action) => {
  if (action.type === 'RESET') {
    return reducers(undefined, action)
  }

  return reducers(state, action)
}

const persistedReducer = persistReducer(persistConfig, appReducer);

export const Store = configureStore({
  reducer: persistedReducer
});

export default Store;
