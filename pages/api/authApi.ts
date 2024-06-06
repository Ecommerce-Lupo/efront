import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/v1/user/',
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
      query(body) {
        return {
          url: 'edit/',
          method: 'PATCH',
          body,
        };
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useEditUserMutation } = authApi;
