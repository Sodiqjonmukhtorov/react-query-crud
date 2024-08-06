import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3600'
    }),
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: () => '/todos',
            providesTags: ["Tasks"],
            transformResponse: Response => Response.sort((a,b) => b.id - a.id)
        }),
        createTask: builder.mutation({
            query: (newTask) => ({
                url: '/todos',
                method: 'POST',
                body: newTask,
            }),
            invalidatesTags: ["Tasks"],
        }),
        updateTask: builder.mutation({
            query: (updatedTask) => ({
                url: `/todos/${updatedTask.id}`,
                method: 'PATCH',
                body: updatedTask,
            }),
            invalidatesTags: ["Tasks"],
        }),
        deleteTask: builder.mutation({
            query: (idTask) => ({
                url: `/todos/${idTask}`,
                method: 'DELETE'
            }),
            invalidatesTags: ["Tasks"],
        })
    })
})

export const { 
    useGetTasksQuery, 
    useCreateTaskMutation, 
    useDeleteTaskMutation,
    useUpdateTaskMutation,
} = apiSlice