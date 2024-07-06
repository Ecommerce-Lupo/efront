import { configureStore } from '@reduxjs/toolkit';

import shopCartReducer from '../features/shopCartSlice';
import userReducer from '../features/userSlice';

import { ordersApi } from '../../pages/api/ordersApi';
import { productApi } from '../../pages/api/productsApi';
import { authApi } from '../../pages/api/authApi';
import { userApi } from '../../pages/api/usersApi';
import { metricApi } from '../../pages/api/metricsApi';

export const store = configureStore({
  reducer: {
    auth: userReducer,
    shopCart: shopCartReducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [metricApi.reducerPath]: metricApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      ordersApi.middleware,
      productApi.middleware,
      authApi.middleware,
      userApi.middleware,
      metricApi.middleware,
    ]),
});
