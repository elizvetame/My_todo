import {fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export function getApiBaseQuery() {
    return fetchBaseQuery({
        baseUrl: '/api',
        prepareHeaders(headers, { getState }) {
          const { auth: { userToken } } = getState()
          headers.set('Authorization', `Bearer ${userToken}`);
          return headers;
        },
    });
}