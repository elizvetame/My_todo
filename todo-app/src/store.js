import { configureStore } from '@reduxjs/toolkit'
import { loadAuth } from './features/auth/auth-persister'
import authReducer from './features/auth/auth-slice'
import { authStoreMiddleware } from './features/auth/auth-slice-middleware';
import { todoApiSlice } from './features/todos/todos-slice';

const store = configureStore({
  preloadedState: {
    auth: loadAuth()
  },
  reducer: {
    auth: authReducer,
    [todoApiSlice.reducerPath]: todoApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    authStoreMiddleware.middleware,
    todoApiSlice.middleware
  ]
})
export default store;