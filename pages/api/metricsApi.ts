import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const metricApi = createApi({
  reducerPath: 'metricApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/metrics`,
    prepareHeaders: (headers) => {
      // TODO get token from local storage
      const token = process.env.NEXT_PUBLIC_TOKEN;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMetrics: builder.query({
      query: () => '/get_metrics/',
    }),
  }),
});

export const { useGetMetricsQuery } = metricApi;
