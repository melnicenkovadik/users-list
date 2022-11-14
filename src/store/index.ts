import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { usersReducer } from './users/user.slice';
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist';


const persistConfig = {
  key: 'root',
  storage,
}

const persistedUsersReducer = persistReducer(persistConfig, usersReducer)

export const store = configureStore({
  reducer: {
    users: persistedUsersReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export const persistor = persistStore(store)

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
