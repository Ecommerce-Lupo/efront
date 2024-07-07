import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useUserToken } from './tokenHooks';

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/orders`,
    prepareHeaders: (headers, { getState = useUserToken }) => {
      // TODO get token from local storage
      // const token = process.env.NEXT_PUBLIC_TOKEN;
      const user = getState();
      if (user) {
        headers.set('Authorization', `Bearer ${user.auth?.user.access}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => '/get_orders/',
    }),

    getOrderDetail: builder.query({
      query: (id) => ({
        url: '/get_order_by_id/',
        params: {
          id,
        },
      }),
    }),

    createOrder: builder.mutation({
      query: (data) => ({
        url: '/create_order_new/',
        method: 'POST',
        body: data,
      }),
    }),

    updateOrder: builder.mutation({
      query: (data) => ({
        url: '/edit_order_status/',
        method: 'PATCH',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderDetailQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
} = ordersApi;
