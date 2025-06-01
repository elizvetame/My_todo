import { createApi } from '@reduxjs/toolkit/query/react';
import { getApiBaseQuery } from '../utils';

export const todoApiSlice = createApi({
  reducerPath: 'apiTodos',
  baseQuery: getApiBaseQuery(),
  endpoints(builder) {
    return {
      fetchTodos: builder.query({
        query() {
          return `/todos`;
        }
        ,
        providesTags: (result) => result
          ? [
              ...result.map(({ id }) => ({ type: 'Todo', id })),
              { type: 'Todo', id: 'LIST' },
            ]
          : [{ type: 'Todo', id: 'LIST' }],
      }
    ),  
      addTodo: builder.mutation({
        query: ({title, description, completed, dueDate}) => ({
          url: '/todos',
          method: 'POST',
          body: {
            title,
            description,
            completed,
            dueDate
          },
        }),
        invalidatesTags: [{ type: 'Todo', id: 'LIST' }],
      }),
      complete: builder.mutation({
        query: (id) => ({
          url: `/todos/${id}/complete`,
          method: 'PATCH',
          body: {},
        }),
        invalidatesTags: (x) => [{ type: 'Todo', id: x.id }],
      }),
      notComplete: builder.mutation({
        query: (id) => ({
          url: `/todos/${id}/not-complete`,
          method: 'PATCH',
          body: {},
        }),
        invalidatesTags: (x) => [{ type: 'Todo', id: x.id }],
      })
    };
  },
});

export const { useFetchTodosQuery, useAddTodoMutation, useCompleteMutation, useNotCompleteMutation } = todoApiSlice;