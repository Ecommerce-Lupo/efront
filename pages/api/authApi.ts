import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/user`,
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query(body) {
        return {
          url: 'sign_up/',
          method: 'POST',
          body,
        };
      },
    }),
    login: builder.mutation({
      query(body) {
        return {
          url: 'login/',
          method: 'POST',
          body,
        };
      },
    }),
    editUser: builder.mutation({
      query: ({ body, key }) => ({
        url: 'edit_profile/',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${key}`,
        },
        body,
      }),
    }),
    deleteUser: builder.mutation({
      query() {
        return {
          url: 'delete/',
          method: 'DELETE',
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useEditUserMutation,
  useDeleteUserMutation,
} = authApi;
