import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const callApi = createApi({
    reducerPath: "callApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
    }),
    endpoints: (builder) => ({
        getCalls: builder.query({
            query: () => "calls/",
        }),

        getCall: builder.query({
            query: (id) => `calls/${id}/`,
        }),

        addCall: builder.mutation({
            query: (body) => ({
                url: "calls/",
                method: "POST",
                body,
            }),
        }),

        updateCall: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `calls/${id}/`,
                method: "PUT",
                body,
            }),
        }),

        deleteCall: builder.mutation({
            query: (id) => ({
                url: `calls/${id}/`,
                method: "DELETE",
            }),
        }),
    }),
});