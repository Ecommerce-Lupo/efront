import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useUserToken } from './tokenHooks';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/user`,
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
    getUsers: builder.query({
      query: () => ({
        url: '/all/',
        method: 'GET',
      }),
    }),

    updateUser: builder.mutation({
      query: (user) => ({
        url: `/staff/?id=${user.id}`,
        method: 'PUT',
        body: user,
      }),
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/`,
        method: 'DELETE',
        body: { id },
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
